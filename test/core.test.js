const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../js/core.js");

test("finds all matches with groups", () => {
  const r = C.matches("(\\d+)-(\\d+)", "g", "a 1-2 b 30-40");
  assert.equal(r.list.length, 2);
  assert.deepEqual(r.list[1].groups, ["30", "40"]);
  assert.equal(r.list[1].index, 8);
});
test("named groups are returned", () => {
  const r = C.matches("(?<y>\\d{4})", "g", "in 2026");
  assert.equal(r.list[0].named.y, "2026");
});
test("invalid patterns report an error", () => {
  const r = C.matches("(", "g", "x");
  assert.equal(r.ok, false);
});
test("replace supports references", () => {
  assert.equal(C.replace("(\\w+)@(\\w+)", "g", "a@b", "$2 at $1").text, "b at a");
});
test("explain describes tokens", () => {
  const ex = C.explain("^\\d{3}[a-z]+$");
  assert.deepEqual(ex.map((x) => x.token), ["^", "\\d", "{3}", "[a-z]", "+", "$"]);
  assert.match(ex[2].desc, /exactly 3/);
});
test("library patterns compile and match samples", () => {
  for (const p of C.LIBRARY) assert.equal(C.build(p.pattern, p.flags).ok, true, p.name);
  const email = C.LIBRARY.find((p) => p.name === "Email");
  assert.equal(C.matches(email.pattern, email.flags, "x a@b.co y").list[0].text, "a@b.co");
});
