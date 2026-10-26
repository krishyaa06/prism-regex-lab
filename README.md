<!-- ═════════════ HEADER ═════════════ -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:07060f,50:3EE69A,100:00D2FF&height=200&section=header&text=Prism%20Regex%20Lab&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Test%20%C2%B7%20Highlight%20%C2%B7%20Explain%20%C2%B7%20Replace&descAlignY=58&descSize=16" width="100%" alt="Prism Regex Lab" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&duration=2600&pause=800&color=3EE69A&center=true&vCenter=true&width=680&lines=Live+match+highlighting;Capture+groups+and+named+groups;Regex+explained+in+plain+English;Built-in+pattern+library" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/krishyaa06/prism-regex-lab/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/krishyaa06/prism-regex-lab/ci.yml?branch=main&style=for-the-badge&label=CI&logo=githubactions&logoColor=white" alt="CI" /></a>
  <a href="https://krishyaa06.github.io/prism-regex-lab/"><img src="https://img.shields.io/badge/Live_Demo-Open-3EE69A?style=for-the-badge&logo=githubpages&logoColor=black" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/Vanilla-HTML%20%7C%20CSS%20%7C%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/dependencies-0-3EE69A?style=for-the-badge" alt="Zero dependencies" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/krishyaa06/prism-regex-lab?style=for-the-badge&color=00D2FF" alt="License" /></a>
</p>

<p align="center">
  <img src="assets/screenshots/desktop.png" width="90%" alt="Prism Regex Lab screenshot" />
</p>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" />

## ⚡ Overview

**Prism Regex Lab** is a JavaScript regular expression playground. Type a pattern and toggle flags; matches are highlighted directly inside the test string, every capture (including named groups) is listed with its index, and each token of the pattern is explained in plain English. A replace field previews `$1` / `$<name>` substitutions instantly.

## ✨ Features

- **Inline highlighting** of every match as you type
- **Flags**: `g`, `i`, `m`, `s`, `u` toggles
- **Match list** with index, numbered and named groups
- **Explain mode** that breaks the pattern into human-readable tokens
- **Replace preview** with `$1`, `$&` and `$<name>` support
- **Pattern library**: email, URL, IPv4, hex color, dates, Indian mobile, semver and more
- State is saved locally, copy as `/pattern/flags`

## 📸 Screenshots

<table>
  <tr>
    <td width="68%"><img src="assets/screenshots/desktop.png" width="100%" alt="Prism Regex Lab on desktop" /></td>
    <td width="32%"><img src="assets/screenshots/mobile.png" width="100%" alt="Prism Regex Lab on mobile" /></td>
  </tr>
</table>

## 🚀 Quick Start

**Use it online:** [https://krishyaa06.github.io/prism-regex-lab/](https://krishyaa06.github.io/prism-regex-lab/)

**Run locally:**

```bash
git clone https://github.com/krishyaa06/prism-regex-lab.git
cd prism-regex-lab
# open index.html in your browser, or serve it:
npx serve .
```

## 🛠️ Usage

1. Type a pattern between the slashes, or pick one from the library chips.
2. Toggle flags. Matches highlight in the test string.
3. Check **Matches** for groups and **Explanation** for a token-by-token breakdown.
4. Enter a replacement like `$<day>/$<month>/$<year>` to preview the output.

## 📁 Project Structure

```
prism-regex-lab/
├── assets/
│   ├── logo.png
│   └── logo.svg
├── css/
│   ├── app.css
│   └── prism.css
├── js/
│   ├── app.js   # UI wiring
│   ├── core.js   # matching, replace and explainer — tested in Node
│   └── prism.js
├── test/
│   └── core.test.js
├── .gitignore
├── LICENSE
├── README.md
├── index.html
└── package.json
```

## 🧪 Tests

```bash
npm test
```

Tests use the built-in `node:test` runner, so there is nothing to install. CI runs them on Node 20 and 22.

## 🤝 Contributing

1. Fork the repo and create a branch: `git checkout -b feature/my-idea`
2. Make your change and add a test in `test/`
3. Run `npm test` and open a Pull Request

## 🔷 Part of Prism Protocol

Prism Regex Lab is one of the open-source tools built by [Prism Protocol](https://dc.gg/prismprotocol), a tech community where young builders learn, ship and compete together.

## 👤 Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/krishyaa06"><img src="https://github.com/krishyaa06.png" width="90" style="border-radius:50%" /><br><b>Soumya Bhandare</b></a><br>
      <sub>Founder @ Prism Protocol</sub>
    </td>
    <td>
      <a href="https://dc.gg/prismprotocol"><img src="https://img.shields.io/badge/Discord-Prism%20Protocol-5865F2?style=for-the-badge&logo=discord&logoColor=white" /></a><br>
      <a href="https://instagram.com/prism_protocol_"><img src="https://img.shields.io/badge/Instagram-@prism__protocol__-E4405F?style=for-the-badge&logo=instagram&logoColor=white" /></a><br>
      <a href="https://x.com/krishyaa06"><img src="https://img.shields.io/badge/X-@krishyaa06-000000?style=for-the-badge&logo=x&logoColor=white" /></a>
    </td>
  </tr>
</table>

## 📄 License

Released under the [MIT License](LICENSE).

<p align="center">
  <b>If you like this project, consider giving it a ⭐</b><br>
  <sub>"Build. Create. Compete." · Made with ⚡ by Prism Protocol</sub>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00D2FF,50:3EE69A,100:07060f&height=110&section=footer" width="100%" />
