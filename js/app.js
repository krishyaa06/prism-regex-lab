(() => {
  const { $, $$, copy, store, esc, debounce } = Prism;
  const pat = $("#pattern"), text = $("#text"), repl = $("#repl");
  const flags = () => $$("#flags input").filter((i) => i.checked).map((i) => i.value).join("");
  const DEFAULT_TEXT = "Contact team@prismprotocol.dev or soumya.b+dev@gmail.com\nLaunch dates: 2026-10-26, 2026-11-05 and 2027-01-15\nVisit https://dc.gg/prismprotocol — release v2.4.1 ships soon.\nColors: #00d2ff #6c63ff #fff";
  $("#lib").innerHTML = Core.LIBRARY.map((p, i) => `<button class="pill acc" data-i="${i}">${p.name}</button>`).join("");
  $("#lib").onclick = (e) => {
    const b = e.target.closest("button"); if (!b) return;
    const p = Core.LIBRARY[b.dataset.i]; pat.value = p.pattern;
    $$("#flags input").forEach((i) => (i.checked = p.flags.includes(i.value))); render();
  };
  function render() {
    store.set("regex:state", { p: pat.value, t: text.value, r: repl.value, f: flags() });
    const r = Core.matches(pat.value, flags(), text.value);
    if (!r.ok) {
      $("#count").className = "pill bad"; $("#count").textContent = "Invalid";
      $("#list").innerHTML = `<div class="err">${esc(r.error)}</div>`; $("#hl").innerHTML = esc(text.value) + "\n"; $("#explain").innerHTML = ""; $("#replOut").textContent = ""; return;
    }
    const list = r.list;
    $("#count").className = "pill " + (list.length ? "ok" : ""); $("#count").textContent = `${list.length} match${list.length === 1 ? "" : "es"}`;
    let h = "", pos = 0;
    for (const m of list) { if (m.end === m.index) continue; h += esc(text.value.slice(pos, m.index)) + `<mark>${esc(m.text)}</mark>`; pos = m.end; }
    $("#hl").innerHTML = h + esc(text.value.slice(pos)) + "\n";
    $("#list").innerHTML = list.length ? list.slice(0, 200).map((m, i) => {
      const g = m.named ? Object.entries(m.named).map(([k, v]) => `${k}=${v}`).join(" · ") : m.groups.map((v, j) => `$${j + 1}=${v ?? "∅"}`).join(" · ");
      return `<div class="m"><span class="i">#${i + 1}</span><span class="t">${esc(m.text) || "∅"}</span><span class="g">@${m.index}${g ? " · " + esc(g) : ""}</span></div>`;
    }).join("") : '<div class="empty">No matches yet</div>';
    $("#explain").innerHTML = pat.value ? Core.explain(pat.value).map((x) => `<div class="ex"><code>${esc(x.token)}</code><span>${esc(x.desc)}</span></div>`).join("") : '<div class="empty">Type a pattern to see it explained</div>';
    const rr = repl.value ? Core.replace(pat.value, flags(), text.value, repl.value) : null;
    $("#replOut").textContent = rr && rr.ok ? rr.text : "Replacement preview appears here";
  }
  const run = debounce(render, 80);
  [pat, text, repl].forEach((el) => el.addEventListener("input", run));
  text.addEventListener("scroll", () => ($("#hl").scrollTop = text.scrollTop));
  $("#flags").addEventListener("change", render);
  $("#copyre").onclick = () => copy(`/${pat.value}/${flags()}`);
  const s = store.get("regex:state");
  pat.value = s?.p ?? Core.LIBRARY[0].pattern; text.value = s?.t ?? DEFAULT_TEXT; repl.value = s?.r ?? "";
  if (s?.f != null) $$("#flags input").forEach((i) => (i.checked = s.f.includes(i.value)));
  render();
})();
