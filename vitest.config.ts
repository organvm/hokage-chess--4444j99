import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

/**
 * Two projects, one runner. Existing pure-function suites stay on `node`;
 * the new component snapshot suite runs in `jsdom` (Testing Library
 * requires a DOM). Vitest 4 dropped `defineWorkspace` and
 * `environmentMatchGlobs` — `projects:` is the surviving primitive.
 *
 * The `@/*` alias mirrors `tsconfig.json#compilerOptions.paths`. Vite does
 * not consume tsconfig paths automatically, so it has to be declared here
 * (and re-declared per project; project resolve config does not inherit
 * from the root in Vitest 4).
 */
const aliasConfig = {
  alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
};

export default defineConfig({
  resolve: aliasConfig,
  test: {
    projects: [
      {
        resolve: aliasConfig,
        test: {
          name: "unit",
          environment: "node",
          include: ["tests/**/*.test.ts"],
        },
      },
      {
        resolve: aliasConfig,
        test: {
          name: "components",
          environment: "jsdom",
          include: ["tests/components/**/*.test.tsx"],
        },
      },
    ],
  },
});
