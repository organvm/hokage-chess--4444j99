/**
 * Content Strategy Engine — universal title/thumbnail/idea scoring.
 *
 * Pure heuristic, brand-agnostic. Domain vocabulary is parameterized via
 * ContentLexicon — pass a domain-specific lexicon to specialize, or rely on
 * the universal defaults that catch cross-domain emphasis + numeric stakes
 * + named-conflict patterns.
 *
 * Designed so a single creator running multiple domains (e.g. chess +
 * fitness + life-coaching) can score titles for each without forking the
 * engine. The engine knows nothing about any specific domain.
 */

export const SHORT_FORMAT = "short" as const;

/**
 * Video format. The scheduler treats `SHORT_FORMAT` as the only meaningful
 * literal — every other value is bucketed as long-form. Creators may use
 * any string ("game", "lesson", "interview", "vlog", "live", "tutorial",
 * "session", etc.) to taxonomize their library.
 */
export type VideoFormat = string;

export interface VideoIdea {
  id: string;
  title: string;
  format: VideoFormat;
  has_rival: boolean;
  has_twist: boolean;
  is_unique: boolean;
  will_engage: boolean;
  created_at: Date;
}

export interface ThumbnailScore {
  face_visible: boolean;
  emotion_clear: boolean;
  text_readable: boolean;
  high_contrast: boolean;
  score: number;
  max_score: number;
}

export interface UploadChecklist {
  thumbnail_pass: boolean;
  title_pass: boolean;
  hook_pass: boolean;
  description_pass: boolean;
  chapters_added: boolean;
  affiliate_links: boolean;
  ready: boolean;
}

export interface AntiPattern {
  name: string;
  pattern: string;
  penalty: number;
  feedback: string;
}

export interface ContentLexicon {
  /** Emphasis tokens signalling emotional charge. */
  emphasis_words: string[];
  /** Verbs signalling conflict, achievement, or transformation (stakes). */
  stakes_verbs: string[];
  /** Optional domain-specific stakes nouns (named ranks, venues, prizes). */
  stakes_nouns: string[];
  /** Title anti-patterns; each match decreases the score and emits feedback. */
  anti_patterns: AntiPattern[];
  /** Maximum acceptable title length in characters. */
  max_title_length: number;
}

/**
 * Universal default lexicon — cross-domain. Captures emphasis adverbs,
 * superlative affect words, and generic conflict verbs that work for any
 * narrative-driven creator (chess, fitness, coaching, community, etc.).
 */
export const DEFAULT_LEXICON: ContentLexicon = {
  emphasis_words: [
    "finally",
    "almost",
    "never",
    "always",
    "actually",
    "literally",
    "totally",
    "completely",
    "best",
    "worst",
    "insane",
    "crazy",
    "shocking",
    "shocked",
    "unbelievable",
    "impossible",
    "destroyed",
    "crushed",
    "stunning",
    "ridiculous",
    "biggest",
    "hardest",
    "first",
    "last",
  ],
  stakes_verbs: [
    "beat",
    "lost",
    "won",
    "win",
    "defeated",
    "destroyed",
    "crushed",
    "faced",
    "challenged",
    "survived",
    "broke",
    "broken",
  ],
  stakes_nouns: ["championship", "tournament", "final", "rival", "match", "challenge"],
  anti_patterns: [
    {
      name: "episode_numbering",
      pattern: "^\\s*(episode|ep\\.?)\\s*\\d+",
      penalty: 1,
      feedback: "Remove episode numbering from title start",
    },
  ],
  max_title_length: 60,
};

/**
 * Detects emphasis: lexicon match (case-insensitive) OR an ALL-CAPS word
 * of length >= 4 (universal emphasis convention in titles).
 */
function hasEmphasis(title: string, lexicon: ContentLexicon): boolean {
  if (lexicon.emphasis_words.length > 0) {
    const escaped = lexicon.emphasis_words.map(escapeRegex).join("|");
    if (new RegExp(`\\b(${escaped})\\b`, "i").test(title)) return true;
  }
  return /\b[A-Z]{4,}\b/.test(title);
}

/**
 * Detects stakes: lexicon match (verbs/nouns) OR any numeric token >= 2
 * digits (rating, count, score, year — universal across domains).
 */
function hasStakes(title: string, lexicon: ContentLexicon): boolean {
  const tokens = [...lexicon.stakes_verbs, ...lexicon.stakes_nouns];
  if (tokens.length > 0) {
    const escaped = tokens.map(escapeRegex).join("|");
    if (new RegExp(`\\b(${escaped})\\b`, "i").test(title)) return true;
  }
  return /\b\d{2,}\b/.test(title);
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Score a title against the formula: [EMPHASIS] + [STAKES] + [LENGTH]
 * minus anti-pattern penalties. Score 0-3 (clamped at 0).
 */
export function scoreTitleFormula(
  title: string,
  lexicon: ContentLexicon = DEFAULT_LEXICON
): {
  score: number;
  has_emotion: boolean;
  has_stakes: boolean;
  length_ok: boolean;
  feedback: string[];
} {
  const feedback: string[] = [];

  const has_emotion = hasEmphasis(title, lexicon);
  const has_stakes = hasStakes(title, lexicon);
  const length_ok = title.length <= lexicon.max_title_length;

  let score = 0;
  if (has_emotion) score++;
  if (has_stakes) score++;
  if (length_ok) score++;

  if (!has_emotion) {
    feedback.push(
      "Add an emotional hook (emphasis word or ALL-CAPS intensifier — e.g. 'finally', 'INSANE')"
    );
  }
  if (!has_stakes) {
    feedback.push("Add stakes (achievement verb or specific number — e.g. 'beat', '1500')");
  }
  if (!length_ok) {
    feedback.push(
      `Title is ${title.length} chars — trim to ${lexicon.max_title_length} or fewer`
    );
  }

  for (const anti of lexicon.anti_patterns) {
    if (new RegExp(anti.pattern, "i").test(title)) {
      score = Math.max(0, score - anti.penalty);
      feedback.push(anti.feedback);
    }
  }

  return { score, has_emotion, has_stakes, length_ok, feedback };
}

/**
 * Score a thumbnail against four universal CTR criteria.
 */
export function scoreThumbnail(criteria: {
  face_visible: boolean;
  emotion_clear: boolean;
  text_readable: boolean;
  high_contrast: boolean;
}): ThumbnailScore {
  let score = 0;
  if (criteria.face_visible) score++;
  if (criteria.emotion_clear) score++;
  if (criteria.text_readable) score++;
  if (criteria.high_contrast) score++;

  return { ...criteria, score, max_score: 4 };
}

/**
 * Evaluate a video idea on rivalry / twist / uniqueness / engagement.
 * 4/4 = must_make, 3/4 = make_it, 2/4 = rework, <2 = skip.
 */
export function evaluateIdea(idea: VideoIdea): {
  score: number;
  verdict: "must_make" | "make_it" | "rework" | "skip";
} {
  let score = 0;
  if (idea.has_rival || idea.has_twist) score++;
  if (idea.has_twist) score++;
  if (idea.is_unique) score++;
  if (idea.will_engage) score++;

  const verdict =
    score >= 4 ? "must_make" : score === 3 ? "make_it" : score === 2 ? "rework" : "skip";

  return { score, verdict };
}

/**
 * Generate an upload checklist. Title score >= 2 and thumbnail score >= 3
 * are the publish-readiness floor.
 */
export function createUploadChecklist(params: {
  thumbnail: ThumbnailScore;
  title_score: number;
  hook_within_30s: boolean;
  description_optimized: boolean;
  chapters_added: boolean;
  affiliate_links: boolean;
}): UploadChecklist {
  const thumbnail_pass = params.thumbnail.score >= 3;
  const title_pass = params.title_score >= 2;
  const hook_pass = params.hook_within_30s;
  const description_pass = params.description_optimized;

  return {
    thumbnail_pass,
    title_pass,
    hook_pass,
    description_pass,
    chapters_added: params.chapters_added,
    affiliate_links: params.affiliate_links,
    ready: thumbnail_pass && title_pass && hook_pass && description_pass,
  };
}

/**
 * Plan a week — top 3 long-form + top 3 shorts by evaluation score.
 * `skip` verdicts excluded.
 */
export function planWeek(
  ideas: VideoIdea[],
  _week_start: Date
): { long_form: VideoIdea[]; shorts: VideoIdea[] } {
  const scored = ideas
    .map((idea) => ({ idea, ...evaluateIdea(idea) }))
    .filter((e) => e.verdict !== "skip")
    .sort((a, b) => b.score - a.score);

  const long_form = scored
    .filter((e) => e.idea.format !== SHORT_FORMAT)
    .slice(0, 3)
    .map((e) => e.idea);

  const shorts = scored
    .filter((e) => e.idea.format === SHORT_FORMAT)
    .slice(0, 3)
    .map((e) => e.idea);

  return { long_form, shorts };
}
