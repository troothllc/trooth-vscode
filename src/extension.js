'use strict';

// Trooth VS Code / Cursor extension v0.1
//
// During the pre-launch window (before August 2, 2026), commands run in
// scaffold mode: they validate configuration and surface notices, but the
// production API integration ships when api.trooth.co goes live.
//
// vscode module is provided by the host (VS Code or Cursor). It is only
// required when the extension activates, so this file imports it lazily.

const SCAFFOLD_NOTICE = 'Trooth runs in scaffold mode through August 1, 2026. Production scans begin August 2, 2026 (EU AI Act enforcement day). Configure your API key in Settings now to have full functionality the day the API goes live.';
const TRUST_CENTER_URL = 'https://www.trooth.co/security';
const SIGNUP_URL = 'https://www.trooth.co';
const DOCS_URL = 'https://www.trooth.co/docs/api';

let vscode = null;
let statusBarItem = null;

function getConfig() {
  const config = vscode.workspace.getConfiguration('trooth');
  return {
    apiKey: config.get('apiKey') || process.env.TROOTH_API_KEY || '',
    host: config.get('host') || 'https://api.trooth.co',
    frameworks: config.get('frameworks') || '',
    showStatusBar: config.get('showStatusBar') !== false
  };
}

function ensureApiKey() {
  const config = getConfig();
  if (config.apiKey) return true;
  vscode.window
    .showWarningMessage(
      'Trooth API key is not set. Add it in Settings -> Extensions -> Trooth, or set the TROOTH_API_KEY environment variable.',
      'Open Settings',
      'Get a key'
    )
    .then(function (choice) {
      if (choice === 'Open Settings') {
        vscode.commands.executeCommand('workbench.action.openSettings', 'trooth.apiKey');
      } else if (choice === 'Get a key') {
        vscode.env.openExternal(vscode.Uri.parse(SIGNUP_URL));
      }
    });
  return false;
}

function commandScan() {
  if (!ensureApiKey()) return;
  vscode.window.showInformationMessage(SCAFFOLD_NOTICE, 'Open Trust Center', 'View docs').then(function (choice) {
    if (choice === 'Open Trust Center') {
      vscode.env.openExternal(vscode.Uri.parse(TRUST_CENTER_URL));
    } else if (choice === 'View docs') {
      vscode.env.openExternal(vscode.Uri.parse(DOCS_URL));
    }
  });
}

function commandCheckDrift() {
  if (!ensureApiKey()) return;
  vscode.window.showInformationMessage(
    'Drift checks ship with the production API on August 2, 2026. Subscribe to the Trooth Network newsletter for the launch announcement.'
  );
}

function commandVerifyReceipt() {
  vscode.window
    .showOpenDialog({
      canSelectMany: false,
      filters: { 'Trust Receipt': ['json'] },
      title: 'Select a Trooth Trust Receipt to verify'
    })
    .then(function (uris) {
      if (!uris || uris.length === 0) return;
      vscode.window.showInformationMessage(
        'Selected ' + uris[0].fsPath + '. Cryptographic verification ships with the @trooth/verifier library (publishing alongside the production API). For now, use https://www.trooth.co/security to verify against the canonical registry.'
      );
    });
}

function commandShowTrustCenter() {
  vscode.env.openExternal(vscode.Uri.parse(TRUST_CENTER_URL));
}

function commandOpenTrustProfile() {
  vscode.window.showInformationMessage(
    'Your Public Trust Profile becomes available after your first scan. Visit ' + SIGNUP_URL + ' to sign up.'
  );
  vscode.env.openExternal(vscode.Uri.parse(SIGNUP_URL));
}

function createStatusBarItem() {
  const config = getConfig();
  if (!config.showStatusBar) return null;
  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  item.text = '$(shield) Trooth';
  item.tooltip = 'Trooth Compliance (scaffold mode through Aug 1, 2026). Click to run a scan.';
  item.command = 'trooth.scan';
  item.show();
  return item;
}

function activate(context) {
  vscode = require('vscode');

  const commands = [
    vscode.commands.registerCommand('trooth.scan', commandScan),
    vscode.commands.registerCommand('trooth.checkDrift', commandCheckDrift),
    vscode.commands.registerCommand('trooth.verifyReceipt', commandVerifyReceipt),
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
  activate: activate,
  deactivate: deactivate
};
