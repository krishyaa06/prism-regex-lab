/* Prism Regex Lab · core logic (browser + Node) */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Core = api;
})(typeof self !== "undefined" ? self : this, function () {
  function build(pattern, flags) {
    try { return { ok: true, re: new RegExp(pattern, flags) }; }
    catch (e) { return { ok: false, error: e.message }; }
  }
  function matches(pattern, flags, text, limit = 1000) {
    const b = build(pattern, flags.includes("g") ? flags : flags + "g");
    if (!b.ok) return b;
    const out = [];
    if (pattern === "") return { ok: true, list: out };
    for (const m of text.matchAll(b.re)) {
      out.push({ index: m.index, end: m.index + m[0].length, text: m[0], groups: m.slice(1), named: m.groups || null });
      if (out.length >= limit) break;
      if (!flags.includes("g")) break;
    }
    return { ok: true, list: out };
  }
  function replace(pattern, flags, text, repl) {
    const b = build(pattern, flags);
    return b.ok ? { ok: true, text: text.replace(b.re, repl) } : b;
  }
  const TOKENS = [
    [/^\\d/, "a digit (0-9)"], [/^\\D/, "a non-digit"], [/^\\w/, "a word character (letter, digit, _)"], [/^\\W/, "a non-word character"],
    [/^\\s/, "whitespace"], [/^\\S/, "non-whitespace"], [/^\\b/, "a word boundary"], [/^\\B/, "a non-boundary"],
    [/^\\n/, "a newline"], [/^\\t/, "a tab"], [/^\\[1-9]/, (t) => `back-reference to group ${t[1]}`], [/^\\./, (t) => `the literal "${t[1]}"`],
    [/^\(\?<([A-Za-z_]\w*)>/, (t, m) => `start of named group "${m[1]}"`], [/^\(\?:/, "start of non-capturing group"],
    [/^\(\?=/, "start of lookahead"], [/^\(\?!/, "start of negative lookahead"], [/^\(\?<=/, "start of lookbehind"], [/^\(\?<!/, "start of negative lookbehind"],
    [/^\(/, "start of capture group"], [/^\)/, "end of group"],
    [/^\[\^(?:\\.|[^\]])*\]/, (t) => `any character NOT in ${t.slice(2, -1)}`], [/^\[(?:\\.|[^\]])*\]/, (t) => `one of ${t.slice(1, -1)}`],
    [/^\{(\d+),(\d*)\}\??/, (t, m) => (m[2] ? `between ${m[1]} and ${m[2]} times` : `${m[1]} or more times`) + (t.endsWith("?") ? " (lazy)" : "")],
    [/^\{(\d+)\}/, (t, m) => `exactly ${m[1]} times`],
    [/^\*\?/, "0 or more (lazy)"], [/^\+\?/, "1 or more (lazy)"], [/^\?\?/, "optional (lazy)"],
    [/^\*/, "0 or more times"], [/^\+/, "1 or more times"], [/^\?/, "optional"], [/^\^/, "start of line/string"], [/^\$/, "end of line/string"],
    [/^\./, "any character except newline"], [/^\|/, "OR"], [/^[^\\()[\]{}*+?.^$|]+/, (t) => `the text "${t}"`],
  ];
  function explain(pattern) {
    const out = [];
    let i = 0, guard = 0;
    while (i < pattern.length && guard++ < 2000) {
      const rest = pattern.slice(i);
      let hit = false;
      for (const [re, desc] of TOKENS) {
        const m = re.exec(rest);
        if (m) { out.push({ token: m[0], desc: typeof desc === "function" ? desc(m[0], m) : desc }); i += m[0].length; hit = true; break; }
      }
      if (!hit) { out.push({ token: rest[0], desc: `the character "${rest[0]}"` }); i++; }
    }
    return out;
  }
  const LIBRARY = [
    { name: "Email", pattern: "[\\w.+-]+@[\\w-]+\\.[\\w.-]+", flags: "gi" },
    { name: "URL", pattern: "https?:\\/\\/[^\\s/$.?#].[^\\s]*", flags: "gi" },
    { name: "IPv4", pattern: "\\b(?:(?:25[0-5]|2[0-4]\\d|1?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1?\\d?\\d)\\b", flags: "g" },
    { name: "Hex color", pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b", flags: "g" },
    { name: "Date (YYYY-MM-DD)", pattern: "(?<year>\\d{4})-(?<month>0[1-9]|1[0-2])-(?<day>0[1-9]|[12]\\d|3[01])", flags: "g" },
    { name: "Indian mobile", pattern: "(?:\\+91[\\s-]?)?[6-9]\\d{9}\\b", flags: "g" },
    { name: "Semver", pattern: "\\bv?(\\d+)\\.(\\d+)\\.(\\d+)(?:-[\\w.]+)?\\b", flags: "g" },
    { name: "Hashtag", pattern: "#[A-Za-z_]\\w*", flags: "g" },
    { name: "Strong password", pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s]).{8,}$", flags: "gm" },
    { name: "Slug", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$", flags: "gm" },
  ];
  return { build, matches, replace, explain, LIBRARY };
});
