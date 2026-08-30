# Trooth for VS Code and Cursor

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.85+-007ACC.svg)](https://code.visualstudio.com)
[![Cursor](https://img.shields.io/badge/Cursor-supported-000000.svg)](https://cursor.sh)

Witness your posture, check drift, and verify Trust Receipts without leaving your editor. Works in VS Code and Cursor.

Trooth is the witnessed trust network for software and AI companies. This extension puts the build side of Trooth in your editor: scan the project you have open, watch for drift, and open your public record on the Network.

## What it does

| In your editor | What it does |
|---|---|
| Scan | Scan the project you have open against the frameworks on your plan |
| Drift | Check drift since your last scan and surface findings inline |
| Verify | Verify a Trust Receipt locally, so you trust the math and not our servers |
| Trust Center | Open the Trust Center for the current company |
| Public record | Open your public trust record on the Network in one click |
| Status bar | Your current standing, shown in the status bar |

All commands are on the Command Palette (`Cmd+Shift+P` on Mac, `Ctrl+Shift+P` on Windows or Linux). Search for **Trooth:**.

## Install

### From source

```bash
git clone https://github.com/troothllc/trooth-vscode.git
cd trooth-vscode
# Open in VS Code and press F5 to launch an Extension Development Host
```

### From the Marketplace

```
ext install troothllc.trooth-vscode
```

Use this once the Marketplace listing is live.

## Configure

Open Settings (`Cmd+,` / `Ctrl+,`) and search for "trooth". Available settings:

| Setting | Default | Description |
|---|---|---|
| `trooth.apiKey` | `""` | Your Trooth API key. Get one free at [trooth.co](https://trooth.co). |
| `trooth.host` | `https://api.trooth.co` | API host. Override for staging environments. |
| `trooth.frameworks` | `""` | Comma-separated list of frameworks to scan against. Empty for all on your plan. |
| `trooth.showStatusBar` | `true` | Show the Trooth indicator in the bottom status bar. |

Alternatively, set the `TROOTH_API_KEY` environment variable; the extension reads it as a fallback.

## Commands

| Command | Description |
|---|---|
| `Trooth: Run compliance scan` | Run a scan on the current project. |
| `Trooth: Check drift status` | Show drift since the last scan. |
| `Trooth: Verify Trust Receipt` | Verify a Trooth-signed receipt JSON file. |
| `Trooth: Open Trust Center` | Open trooth.co/security in your browser. |
| `Trooth: Open my Public Trust Profile` | Open your record on the Network. |

## Cursor compatibility

This extension uses only the public VS Code Extension API and is fully compatible with Cursor, the AI-first fork of VS Code. Install from source or via VSIX in Cursor's extension panel.

## Security

Pass your API key via VS Code Settings or via the `TROOTH_API_KEY` environment variable. Avoid committing your settings file with the key in it. See [SECURITY.md](https://github.com/troothllc/.github/blob/main/SECURITY.md) for the vulnerability disclosure policy.

## License

Apache License 2.0. See [LICENSE](LICENSE).

## About Trooth

Trooth is the witnessed trust network for software and AI companies. A company gets witnessed once, across identity, security, privacy, and AI practices, each with a source and a date, and buyers and their AI agents read a current, signed record with no login. Get witnessed at [trooth.co/signup](https://trooth.co/signup).

[trooth.co](https://trooth.co) · [Security](https://trooth.co/security)
