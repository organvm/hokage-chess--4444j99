import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const guardScript = path.join(repoRoot, "scripts/check-cross-client-bleed.sh");
const blockedTerm = ["mad", "die"].join("");

const tempRepos: string[] = [];

function run(
  command: string,
  args: string[],
  cwd: string,
  env: NodeJS.ProcessEnv = {},
) {
  return execFileSync(command, args, {
    cwd,
    env: { ...process.env, ...env },
    encoding: "utf8",
    stdio: "pipe",
  });
}

function createRepo() {
  const dir = mkdtempSync(path.join(tmpdir(), "cross-client-guard-"));
  tempRepos.push(dir);

  run("git", ["init"], dir);
  run("git", ["config", "user.email", "test@example.com"], dir);
  run("git", ["config", "user.name", "Guard Test"], dir);

  mkdirSync(path.join(dir, "config"), { recursive: true });
  writeFileSync(
    path.join(dir, "config/cross-client-keywords.txt"),
    `# test config\n${blockedTerm}\n`,
  );

  return dir;
}

function writeAndStage(repo: string, relativePath: string, content: string) {
  const fullPath = path.join(repo, relativePath);
  mkdirSync(path.dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, content);
  run("git", ["add", relativePath], repo);
}

function runGuard(repo: string, env: NodeJS.ProcessEnv = {}) {
  return run("bash", [guardScript], repo, env);
}

function expectGuardFailure(repo: string, env: NodeJS.ProcessEnv = {}) {
  try {
    runGuard(repo, env);
  } catch (error) {
    const failure = error as {
      message: string;
      stdout?: Buffer | string;
      stderr?: Buffer | string;
    };

    return `${failure.stdout ?? ""}${failure.stderr ?? ""}${failure.message}`;
  }

  throw new Error("Expected cross-client bleed guard to fail");
}

afterEach(() => {
  for (const repo of tempRepos.splice(0)) {
    rmSync(repo, { recursive: true, force: true });
  }
});

describe("cross-client bleed guard", () => {
  it("rejects blocked configured keywords in staged additions", () => {
    const repo = createRepo();
    writeAndStage(repo, "notes.md", `wrong-scope ${blockedTerm} content\n`);

    expect(expectGuardFailure(repo)).toContain("notes.md");
  });

  it("ignores matching content that has not been staged", () => {
    const repo = createRepo();
    writeFileSync(path.join(repo, "notes.md"), `unstaged ${blockedTerm}\n`);

    expect(runGuard(repo)).toBe("");
  });

  it("allows explicit orchestration archive paths", () => {
    const repo = createRepo();
    writeAndStage(
      repo,
      "docs/archive/orchestration/coordination.md",
      `coordination ${blockedTerm}\n`,
    );

    expect(runGuard(repo)).toBe("");
  });

  it("allows explicit cross-stream coordination frontmatter", () => {
    const repo = createRepo();
    writeAndStage(
      repo,
      "docs/coordination.md",
      `---\naudiences: [cross_stream_coordination]\n---\n${blockedTerm}\n`,
    );

    expect(runGuard(repo)).toBe("");
  });

  it("supports overriding the keyword config path", () => {
    const repo = createRepo();
    const customTerm = ["other", "client"].join("-");
    const customConfig = path.join(repo, "custom-keywords.txt");
    writeFileSync(customConfig, `${customTerm}\n`);
    writeAndStage(repo, "notes.md", `wrong-scope ${customTerm} content\n`);

    expect(
      expectGuardFailure(repo, { CROSS_CLIENT_KEYWORDS_FILE: customConfig }),
    ).toContain("notes.md");
  });
});
