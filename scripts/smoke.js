#!/usr/bin/env node
'use strict';

// Loads the extension against a stand-in for the VS Code API, runs every
// declared command, and holds three properties of this scaffold:
//   1. every command the manifest declares is registered, and no other;
//   2. no command asks for input that could be a secret, reads a setting
//      other than trooth.showStatusBar, or reads an environment variable;
//   3. no command opens a socket: http, https, net, tls and fetch are trapped.
//
//   node scripts/smoke.js

const Module = require('module');
const assert = require('assert');
const pkg = require('../package.json');

const opened = [];
const registered = new Map();
const settingsRead = [];
let prompts = 0;

const vscode = {
  commands: { registerCommand: (id, fn) => { registered.set(id, fn); return { dispose() {} }; } },
  window: {
    showInformationMessage: (msg, ...buttons) => Promise.resolve(buttons[0]),
    showInputBox: () => { prompts++; return Promise.resolve(undefined); },
    showOpenDialog: () => { prompts++; return Promise.resolve(undefined); },
    createStatusBarItem: () => ({ show() {}, dispose() {} }),
  },
  workspace: {
    getConfiguration: (section) => ({ get: (k) => { settingsRead.push(`${section}.${k}`); return undefined; } }),
    onDidChangeConfiguration: () => ({ dispose() {} }),
  },
  env: { openExternal: (uri) => { opened.push(String(uri)); return Promise.resolve(true); } },
  Uri: { parse: (s) => s },
  StatusBarAlignment: { Right: 2 },
};

const trapped = ['http', 'https', 'net', 'tls', 'http2', 'dgram'];
const realLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === 'vscode') return vscode;
  if (trapped.includes(request.replace(/^node:/, ''))) throw new Error(`the extension required ${request}`);
  return realLoad.apply(this, arguments);
};
global.fetch = () => { throw new Error('the extension called fetch'); };
const envBefore = { ...process.env };
const envReads = [];
process.env = new Proxy(envBefore, { get: (t, k) => { if (typeof k === 'string') envReads.push(k); return t[k]; } });

(async () => {
  const ext = require('../src/extension.js');
  ext.activate({ subscriptions: [] });
  const declared = pkg.contributes.commands.map((c) => c.command).sort();
  assert.deepStrictEqual([...registered.keys()].sort(), declared, 'registered commands match the manifest');
  for (const id of declared) {
    await registered.get(id)();
    await new Promise((r) => setImmediate(r));
  }
  assert.strictEqual(prompts, 0, 'no command asks for input');
  assert.deepStrictEqual([...new Set(settingsRead)], ['trooth.showStatusBar'], 'only trooth.showStatusBar is read');
  assert.deepStrictEqual(envReads.filter((k) => /TROOTH/i.test(k)), [], 'no TROOTH_ environment variable is read');
  for (const u of opened) assert.ok(/^https:\/\/www\.trooth\.co(\/|$)/.test(u), `only trooth.co pages are opened (${u})`);
  console.log(`extension loads; ${declared.length} commands ran; opened ${opened.length} trooth.co page(s); no socket, no prompt, no key`);
})().catch((e) => { console.error('::error::' + e.message); process.exit(1); });
