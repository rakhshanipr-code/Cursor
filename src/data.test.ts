import { incomingMixMehr, incomingMonthly, scores, ticketsMonthly } from "./data";

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

assert(incomingMonthly[2].value === 815307, "Mehr incoming mismatch");
assert(ticketsMonthly[1].open === 2830, "Messaging open mismatch");
assert(scores[0].name === "آصف" && scores[0].avg === 758, "Top score mismatch");
assert(
  incomingMixMehr[0].name === "هرزنامه" && incomingMixMehr[0].value === 426681,
  "Spam mix mismatch",
);
assert(
  incomingMixMehr.reduce((s, r) => s + r.share, 0) === 98,
  "Share should be ~98 because of rounding",
);

console.log("data snapshot checks passed");
