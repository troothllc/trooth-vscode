# Trooth for VS Code and Cursor

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.85+-007ACC.svg)](https://code.visualstudio.com)
[![Cursor](https://img.shields.io/badge/Cursor-supported-000000.svg)](https://cursor.sh)

Run Trooth compliance scans, check drift, and verify Trust Receipts without leaving your editor. Works in VS Code and Cursor.

## What it does

- **Run a compliance scan** on the project you have open
- **Check drift** since your last scan and surface findings inline
- **Verify a Trust Receipt** locally (cryptographic verification ships with the production API)
- **Open the Trust Center** for the current vendor
- **Open your Public Trust Profile** in one click
- **Status bar indicator** with your current Trust Score (live during pre-launch as scaffold)

All commands are accessible from the Command Palette (`Cmd+Shift+P` on Mac, `Ctrl+Shift+P` on Windows / Linux). Search for **Trooth:**.

## Install

### From source (development)

```bash
git clone https://github.com/troothllc/trooth-vscode.git
cd trooth-vscode
# Open in VS Code and press F5 to launch an Extension Development Host
```

### From the Marketplace (after v1.0)

```
ext install troothllc.trooth-vscode
```

The Marketplace listing publishes alongside the production API on August 2, 2026.

## Configure

Open Settings (`Cmd+,` / `Ctrl+,`) and search for "trooth". Available settings:

| Setting | Default | Description |
|---|---|---|
| `trooth.apiKey` | `""` | Your Trooth API key. Get one free at [trooth.co](https://www.trooth.co). |
| `trooth.host` | `https://api.trooth.co` | API host. Override for staging environments. |
| `trooth.frameworks` | `""` | Comma-separated list of frameworks to scan against. Empty for all on your tier. |
| `trooth.showStatusBar` | `true` | Show the Trooth indicator in the bottom status bar. |

Alternatively, set the `TROOTH_API_KEY` environment variable; the extension reads it as a fallback.

## Commands

| Command | Description |
|---|---|
| `Trooth: Run compliance scan` | Run a scan on the current project. |
| `Trooth: Check drift status` | Show drift since the last scan. |
| `Trooth: Verify Trust Receipt` | Verify a Trooth-signed receipt JSON file. |
| `Trooth: Open Trust Center` | Open trooth.co/security in your browser. |
| `Trooth: Open my Public Trust Profile` | Open your vendor profile. |

## Status during pre-launch

The Trooth API begins production scans on **August 2, 2026**. Before that date, the extension runs in scaffold mode. It validates your configuration, surfaces useful notices, and opens links, so you can install and configure it now and have full functionality the day the API goes live.

## Cursor compatibility

This extension uses only the public VS Code Extension API and is fully compatible with Cursor (the AI-first fork of VS Code). Install from source or via VSIX in Cursor's extension panel.

## Security

Pass your API key via VS Code Settings or via the `TROOTH_API_KEY` environment variable. Avoid committing your settings file with the key in it. See [SECURITY.md](https://github.com/troothllc/.github/blob/main/SECURITY.md) for the vulnerability disclosure policy.

## License

Apache License 2.0. See [LICENSE](LICENSE).

## About Trooth

Trooth provides cryptographic compliance infrastructure for AI products. Continuous monitoring against SOC 2, ISO 27001, EU AI Act, NIST AI RMF, and HIPAA. Free at Bronze.

[trooth.co](https://www.trooth.co) · [Trust Center](https://www.trooth.co/security)
