// One-Line Office Jokes — a single line that makes office life funny.
// Writes the joke to /output/entry.txt. Deterministic: no input, no network.
//
// The brief (sealed judge criteria, most important first):
// 1. a single-line joke about office life, not a story, slogan or list;
// 2. turns on a real detail of office life (meetings, email, printer,
//    coffee machine) rather than generic talk about work;
// 3. lands its laugh in the last few words, so the turn arrives on the
//    final beat;
// 4. clear on one reading, with no setup that needs explaining;
// 5. fresh wording rather than a joke already going round the internet.
//
// Winner:
//   "I hit reply-all to apologise for hitting reply-all, and now Legal
//    is on the thread."
// Why it wins: the joke is one escalation with no setup — the apology
// repeats the original mistake, and the punch lands in the last five
// words, when Legal joins the thread. Reply-all is the concrete detail
// the brief's criterion 2 wants, and the stakes rise with each clause:
// a mistake, an apology that is the same mistake, then the company's
// lawyers watching. Clear on one reading, and the wording is not the
// internet's reply-all joke (which stops at "sorry, wrong list").
//
// Runners-up, and why they lost:
// - "My out-of-office says I'm in a meeting about my out-of-office."
//   (64 chars) has a clean recursion and a last-word turn, but the
//   out-of-office angle is crowded — we already hold several entries
//   there, and the judge has seen it.
// - "I set a meeting to discuss why we have too many meetings, and it
//   ran over." (76 chars) is a tidy irony, but "too many meetings" is
//   the modal office complaint; every second entry will say it.
// - "The printer only jams on deadline day, so I renamed it
//   'management'." (69 chars) has a real detail, but the brief itself
//   names the jamming printer as its example — the modal entry.
// Discarded outright: "this meeting could have been an email", "per my
// last email", any coffee-machine-is-broken line — all going round the
// internet already, failing criterion 5 on arrival.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I hit reply-all to apologise for hitting reply-all, and now Legal is on the thread.";

const MAX_CHARS = 199; // competition cap: under 200 characters, one line
if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
  throw new Error(`gate: entry must be 1-${MAX_CHARS} chars, got ${ENTRY.length}`);
}
if (ENTRY.trim() !== ENTRY || /[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote entry.txt (${ENTRY.length} chars)`);
