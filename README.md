# trooth-vscode

The Trooth extension for VS Code and Cursor.

Trooth operates the Trooth Network: one public, signed, machine-readable record per company, carrying its identity, products and demos, commercial terms, domain and marketing links, people, documents, security and privacy posture, AI practices, procurement terms and relationships. It is Trooth's only product and it is free.

**Trooth witnesses and dates facts. It does not score, rate, rank or certify anyone.**

## What this version does, exactly

Version 0.1.0 is a scaffold. It registers five commands, puts an item in the status bar, reads four settings and opens links. **It makes no network request of any kind.** There is no code in `src/extension.js` that opens a socket, and nothing in this extension reads a company record, checks a signature or sends anything to Trooth or anywhere else.

That is written down here rather than left to be discovered, because an editor extension that quietly did any of those things would be the opposite of the point.

| Command id | What invoking it does |
|---|---|
| `trooth.scan` | Checks that a key is configured, then shows a notice with two buttons that open [trooth.co/security](https://www.trooth.co/security) and [trooth.co/docs/api](https://www.trooth.co/docs/api) in your browser. |
| `trooth.checkDrift` | Checks that a key is configured, then shows a notice. |
| `trooth.verifyReceipt` | Opens a file dialog filtered to `.json` and shows the path you chose. It does not check a signature. |
| `trooth.showTrustCenter` | Opens [trooth.co/security](https://www.trooth.co/security) in your browser. |
| `trooth.openTrustProfile` | Opens [trooth.co](https://www.trooth.co) in your browser. |

The command palette lists them under **Trooth** (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` elsewhere).

The status bar item sits on the right, reads `Trooth`, and runs `trooth.scan` when clicked. It appears unless `trooth.showStatusBar` is turned off, and it is rebuilt when you change that setting.

## Settings

| Setting | Default | What it does in this version |
|---|---|---|
| `trooth.showStatusBar` | `true` | Shows or hides the status bar item. Takes effect immediately. |
| `trooth.apiKey` | `""` | Read only to decide whether a command shows the "no key configured" warning. It is never sent anywhere. `TROOTH_API_KEY` in the environment is used when the setting is empty. |
| `trooth.host` | `https://api.trooth.co` | Read and then not used, because nothing here makes a request. |
| `trooth.frameworks` | `""` | Read and then not used. |

Two of the four settings therefore have no observable effect. They are listed here because the manifest declares them and you will see them in the settings UI, and it is better to say what they do than to let you infer it.

## Running it

There is nothing to build and nothing to install: `package.json` declares no dependencies and no development dependencies, and its `vscode:prepublish` script does no work. The extension is plain JavaScript loaded from `src/extension.js`.

```bash
git clone https://github.com/troothllc/trooth-vscode.git
```

Open the folder in VS Code or Cursor and start an Extension Development Host from the Run and Debug view. Requires VS Code 1.85 or newer, which `engines.vscode` pins.

This README carries no Marketplace install command, because the manifest is at 0.1.0 and this repository builds no package.

### Cursor

The extension calls only the public VS Code extension API: `commands`, `window`, `workspace`, `env` and `Uri`. Nothing in it is specific to VS Code's own build, so it runs in Cursor the same way.

### Checks

```bash
npm run smoke   # loads src/extension.js and prints that it loaded
```

CI runs three things on every push and pull request: `node --check src/extension.js`, a JSON parse of `package.json`, and `scripts/validate-manifest.js`, which fails the build when the manifest is missing `engines.vscode`, `main`, `publisher`, `displayName` or at least one declared command.

## What to use meanwhile

The command line reader does today what this extension is being built toward, and VS Code's integrated terminal is as close to the editor as it needs to be:

```bash
npx trooth check stripe.com
```

That reads a company's published record from the public Network. No key, no account, and nothing about you is sent. `trooth lint` reads what your own repository's infrastructure declares, locally, and opens no sockets. Both are documented at [`troothllc/trooth-cli`](https://github.com/troothllc/trooth-cli) and [trooth.co/cli](https://www.trooth.co/cli).

To check a Trooth signature yourself, the keys are published at [trooth.co/verify/keys](https://www.trooth.co/verify/keys) and the procedure is written up at [`troothllc/trust-verifier-sdk`](https://github.com/troothllc/trust-verifier-sdk).

## Known gaps in this version

Named rather than left for you to find.

- No command reads a record, and none checks a signature. `trooth.verifyReceipt` picks a file and stops.
- Three of the five command titles in `package.json`, several of its keywords, and two of the notice strings in `src/extension.js` name products, certifications and dates that belong to an earlier version of this business. The Marketplace renders the manifest, so those strings are a public surface and they are wrong on it.
- `trooth.host` and `trooth.frameworks` are read and unused.

## Security

Your API key stays on your machine. This extension reads it to decide whether to show a warning and sends it nowhere, but treat it as a secret anyway: settings files get committed. Prefer `TROOTH_API_KEY` in your environment, or your own secret manager.

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

Trooth automates. Trooth never signs for you.
