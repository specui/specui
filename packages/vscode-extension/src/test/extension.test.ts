import * as assert from 'assert';
import { window } from 'vscode';

suite('Extension Test Suite', () => {
  window.showInformationMessage('Start all tests.');

  test('Sample test', () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });
});
