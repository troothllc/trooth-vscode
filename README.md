# trooth-vscode

The Trooth extension for VS Code and Cursor.

Trooth operates the Trooth Network: one public, machine-readable record per company, carrying its identity, products and demos, commercial terms, domain and marketing links, people, documents, security and privacy posture, AI practices, procurement terms and relationships. It is Trooth's only product and it is free. Trooth signs one object in that record, the witness statement for a reading it took; the rest of the profile is not signed.

**Trooth witnesses and dates facts. It does not grade, rate or rank anyone.**

## What this version does, exactly

Version 0.1.2 is a scaffold. It registers five commands, puts an item in the status bar, reads one setting and opens links. **It makes no network request of its own.** A link it opens is handed to your browser, which loads it like any other link. There is no code in `src/extension.js` that opens a socket, and nothing in this extension reads a company record, checks a signature or sends anything to Trooth or anywhere else.

That is written down here rather than left to be discovered, because an editor extension that quietly did any of those things would be the opposite of the point.

| Command id | Title in the command palette | What invoking it does |
|---|---|---|
| `trooth.scan` | Show Trust Center and API Docs Links | Shows a notice that this version is a scaffold, with two buttons that open [trooth.co/security](https://www.trooth.co/security) and [trooth.co/docs/api](https://www.trooth.co/docs/api) in your browser. |
| `trooth.checkDrift` | Show How to Read a Record from the Terminal | Shows a notice that points to `npx trooth check <domain>` in the integrated terminal. |
| `trooth.showSignatureInstructions` | Open How to Check a Signature | Shows a notice that this extension checks no signature, with a button that opens [trooth.co/docs/verifiable-evidence](https://www.trooth.co/docs/verifiable-evidence) in your browser. Replaces 0.1.1's `trooth.verifyReceipt`, which opened a file picker and stopped. |
| `trooth.showTrustCenter` | Open Trooth's Trust Center | Opens [trooth.co/security](https://www.trooth.co/security) in your browser. |
| `trooth.openTrustProfile` | Open trooth.co | Shows a notice and opens [trooth.co](https://www.trooth.co) in your browser. It does not open a Trust Profile. |

None of the commands asks for a key, a file or any other input.

The command palette lists them under **Trooth**, as `Trooth: <title>` (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` elsewhere).

The status bar item sits on the right, shows a shield icon and `Trooth`, and runs `trooth.scan` when clicked. It appears unless `trooth.showStatusBar` is turned off, and it is rebuilt when you change that setting.

## Settings

| Setting | Default | What it does |
|---|---|---|
| `trooth.showStatusBar` | `true` | Shows or hides the status bar item. Takes effect immediately. |

That is the only setting. Version 0.1.1 also declared `trooth.apiKey`, `trooth.host` and `trooth.frameworks`, read them (and read `TROOTH_API_KEY` from the environment) and did nothing with any of them. 0.1.2 removed all three and reads no environment variable: a place to put a key that nothing uses is only a place for a key to leak from. If you set any of them in 0.1.1, delete the lines from your settings file; the editor now ignores them, and a key in a committed settings file is still exposed.

## Running it

There is nothing to build and nothing to install: `package.json` declares no dependencies and no development dependencies, and its `vscode:prepublish` script does no work. The extension is plain JavaScript loaded from `src/extension.js`.

```bash
git clone https://github.com/troothllc/trooth-vscode.git
```

Open the folder in VS Code or Cursor and start an Extension Development Host from the Run and Debug view. Requires VS Code 1.85 or newer, which `engines.vscode` pins.

This README carries no Marketplace install command, because the manifest is at 0.1.2 and this repository builds no package.

### Cursor

The extension calls only the public VS Code extension API: `commands`, `window`, `workspace`, `env`, `Uri` and `StatusBarAlignment`. Nothing in it is specific to VS Code's own build, so it is expected to run in Cursor the same way. CI does not load it in either editor.

### Checks

```bash
npm run smoke   # runs every command against a stand-in editor
```

CI runs four things on every push to `main`, on every pull request and when started by hand: `node --check src/extension.js`, a JSON parse of `package.json`, `scripts/validate-manifest.js`, which fails the build when the manifest is missing `engines.vscode`, `main`, `publisher`, `displayName` or at least one declared command, or declares a setting that looks like a credential, and `scripts/smoke.js`, which loads the extension against a stand-in for the VS Code API, runs every declared command, and fails if a command is missing or extra, asks for input, reads a setting other than `trooth.showStatusBar` or a `TROOTH_` environment variable, opens anything other than a trooth.co page, or loads a networking module.

## Feature matrix

| Capability | 0.1.2 | Tested by |
|---|---|---|
| Open trooth.co pages in the browser | Yes | `scripts/smoke.js` |
| Status bar item | Yes | `scripts/smoke.js` |
| Read a company record | No | `scripts/smoke.js` (no networking module loads) |
| Check a signature | No | `scripts/smoke.js` (the command opens instructions only) |
| Store or send a key | No | `scripts/validate-manifest.js` and `scripts/smoke.js` |

## What to use meanwhile

The command line reader does today what this extension is meant to do, and VS Code's integrated terminal is as close to the editor as it needs to be:

```bash
npx trooth check stripe.com
```

That reads a company's published record from the public Network. No key and no account. **`check` sends the domain you ask about to `api.trooth.co` in the request URL**, with your IP address and a user agent naming the CLI, as any HTTPS request carries; [trooth.co/privacy](https://www.trooth.co/privacy) says what Trooth keeps. (This README said until 0.1.2 that the CLI downloaded the whole list and looked the domain up locally. That stopped being true in CLI 0.4.4.) `trooth lint` reads what your own repository's infrastructure declares, locally, and opens no sockets. Both are documented at [`troothllc/trooth-cli`](https://github.com/troothllc/trooth-cli) and [trooth.co/cli](https://www.trooth.co/cli).

To check a Trooth signature yourself, the keys are published at [trooth.co/verify/keys](https://www.trooth.co/verify/keys) and the exact-byte procedure is at [trooth.co/docs/verifiable-evidence](https://www.trooth.co/docs/verifiable-evidence).

## Known gaps in this version

Named rather than left for you to find.

- No command reads a record, and none checks a signature.

## Security

This version asks for no key and reads none. Version 0.1.1 declared an unused `trooth.apiKey` setting; if you put a key there, remove it from your settings file and treat the key as exposed if that file was ever committed.

Report a vulnerability through the [Vulnerability Disclosure Policy](https://www.trooth.co/security/vulnerability-disclosure-policy).

## Links

- The Network: [trooth.co/network](https://www.trooth.co/network)
- The CLI: [trooth.co/cli](https://www.trooth.co/cli)
- Developers: [trooth.co/developers](https://www.trooth.co/developers)
- Signing keys: [trooth.co/verify/keys](https://www.trooth.co/verify/keys)
- Trust Center: [trooth.co/security](https://www.trooth.co/security)
- Publish your own record, free: [trooth.co/get-started](https://www.trooth.co/get-started)
- Contact: [trooth.co/contact](https://www.trooth.co/contact)

## License

Apache License 2.0. See [LICENSE](LICENSE).

Trooth signs what it witnessed. It never signs on a company's behalf.
