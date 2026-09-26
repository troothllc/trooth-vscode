'use strict';

// Trooth VS Code / Cursor extension v0.1
//
// This version is a scaffold. Its commands show notices and hand trooth.co
// links to the browser. It makes no network request of its own, reads no
// company record and checks no signature.
//
// vscode module is provided by the host (VS Code or Cursor). It is only
// required when the extension activates, so this file imports it lazily.

const SCAFFOLD_NOTICE = 'This version of the Trooth extension is a scaffold. It opens trooth.co pages in your browser and makes no network request of its own. It does not read a company record or check a signature.';
const TRUST_CENTER_URL = 'https://www.trooth.co/security';
const SIGNUP_URL = 'https://www.trooth.co';
const DOCS_URL = 'https://www.trooth.co/docs/api';
const SIGNATURE_URL = 'https://www.trooth.co/docs/verifiable-evidence';

let vscode = null;
let statusBarItem = null;

// The one setting this version reads. 0.1.1 also read an API key, a host and
// a list of frameworks and did nothing with them; an unused place to put a key
// is a place a key leaks from, so 0.1.2 removed all three.
function getConfig() {
  const config = vscode.workspace.getConfiguration('trooth');
  return {
    showStatusBar: config.get('showStatusBar') !== false
  };
}

function commandScan() {
  vscode.window.showInformationMessage(SCAFFOLD_NOTICE, 'Open Trust Center', 'View API docs').then(function (choice) {
    if (choice === 'Open Trust Center') {
      vscode.env.openExternal(vscode.Uri.parse(TRUST_CENTER_URL));
    } else if (choice === 'View API docs') {
      vscode.env.openExternal(vscode.Uri.parse(DOCS_URL));
    }
  });
}

function commandCheckDrift() {
  vscode.window.showInformationMessage(
    'This extension does not read company records. To read a company\'s public record, run "npx trooth check <domain>" in the integrated terminal. It needs no key and no account, and it sends the domain you ask about to api.trooth.co in the request URL.'
  );
}

function commandShowSignatureInstructions() {
  vscode.window.showInformationMessage(
    'This extension does not check signatures. Trooth signs one object, the witness statement for a reading it took; the instructions for checking it yourself, offline, are on trooth.co.',
    'Open instructions'
  ).then(function (choice) {
    if (choice === 'Open instructions') vscode.env.openExternal(vscode.Uri.parse(SIGNATURE_URL));
  });
}

function commandShowTrustCenter() {
  vscode.env.openExternal(vscode.Uri.parse(TRUST_CENTER_URL));
}

function commandOpenTrustProfile() {
  vscode.window.showInformationMessage(
    'Opening ' + SIGNUP_URL + ' in your browser. This version does not open a Trust Profile. To publish your own company\'s record, free, go to https://www.trooth.co/get-started.'
  );
  vscode.env.openExternal(vscode.Uri.parse(SIGNUP_URL));
}

function createStatusBarItem() {
  const config = getConfig();
  if (!config.showStatusBar) return null;
  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  item.text = '$(shield) Trooth';
  item.tooltip = 'Trooth extension (scaffold). Click for links to Trooth\'s Trust Center and API docs.';
  item.command = 'trooth.scan';
  item.show();
  return item;
}

function activate(context) {
  vscode = require('vscode');

  const commands = [
    vscode.commands.registerCommand('trooth.scan', commandScan),
    vscode.commands.registerCommand('trooth.checkDrift', commandCheckDrift),
    vscode.commands.registerCommand('trooth.showSignatureInstructions', commandShowSignatureInstructions),
    vscode.commands.registerCommand('trooth.showTrustCenter', commandShowTrustCenter),
    vscode.commands.registerCommand('trooth.openTrustProfile', commandOpenTrustProfile)
  ];

  commands.forEach(function (cmd) { context.subscriptions.push(cmd); });

  statusBarItem = createStatusBarItem();
  if (statusBarItem) context.subscriptions.push(statusBarItem);

  // Refresh status bar when the user changes settings
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(function (event) {
      if (event.affectsConfiguration('trooth.showStatusBar')) {
        if (statusBarItem) {
          statusBarItem.dispose();
          statusBarItem = null;
        }
        statusBarItem = createStatusBarItem();
        if (statusBarItem) context.subscriptions.push(statusBarItem);
      }
    })
  );
}

function deactivate() {
  if (statusBarItem) {
    statusBarItem.dispose();
    statusBarItem = null;
  }
}

module.exports = {
  getConfig: getConfig,
  activate: activate,
  deactivate: deactivate
};
