const { test } = require('node:test');
const assert = require('node:assert/strict');
const { formatPlan } = require('../plan.js');

test('a plan includes the action, timing and practice draft', () => {
  assert.equal(formatPlan('  Ask one question ', ' Thursday ', ' What helped you get started? '),
    'MY CAREER NEXT STEP\n\nAction: Ask one question\nWhen: Thursday\n\nWhat I’ll say\nWhat helped you get started?');
});

test('an unfinished or whitespace-only plan cannot be exported', () => {
  assert.equal(formatPlan('Ask one question', ' ', 'Hi'), '');
  assert.equal(formatPlan('Ask one question', 'Thursday', ' '), '');
  assert.equal(formatPlan('', 'Thursday', 'Hi'), '');
});
