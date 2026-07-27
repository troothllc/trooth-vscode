#!/usr/bin/env node
'use strict';

// Validates package.json against the minimum VS Code extension manifest requirements.

const pkg = require('../package.json');

const errors = [];

if (!pkg.engines || !pkg.engines.vscode) {
  errors.push('engines.vscode is required');
}
if (!pkg.main) {
  errors.push('main entry is required');
}
if (!pkg.contributes || !pkg.contributes.commands || pkg.contributes.commands.length === 0) {
  errors.push('contributes.commands is required and must contain at least one command');
}
if (!pkg.publisher) {
  errors.push('publisher is required');
}
if (!pkg.displayName) {
  errors.push('displayName is required');
}

if (errors.length > 0) {
  for (const err of errors) {
    console.error('::error::' + err);
  }
  process.exit(1);
}

console.log('Manifest valid. Commands declared: ' + pkg.contributes.commands.length);
