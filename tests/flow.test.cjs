'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { resolve } = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

test('a participant writes, edits, and clears a personal plan', async () => {
  const browser = await chromium.launch({
    channel: process.env.CAREER_TEST_BROWSER || undefined
  });

  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(resolve(__dirname, '../index.html')).href);
    const choose = () => page.getByRole('button', { name: /Reconnect with someone/ }).click();
    const draft = page.getByRole('textbox', { name: 'What you’ll say' });

    await choose();
    assert.equal(await draft.inputValue(), '');
    assert.match(await page.locator('#example-draft').innerText(), /Hi Morgan/);
    await page.getByRole('button', { name: /Make a plan/ }).click();
    assert.equal(await page.locator('#plan').isVisible(), false);

    const message = 'Hi Casey, could I ask you about your first help desk role?';
    await draft.fill(message);
    await page.getByRole('button', { name: /Make a plan/ }).click();
    await page.getByRole('textbox', { name: 'When' }).fill('Thursday after class');
    const showPlan = () => page.getByRole('button', { name: /See my plan/ }).click();
    await showPlan();
    const summary = page.locator('#summary');
    assert.ok((await summary.innerText()).includes(message));

    await page.getByRole('button', { name: 'Edit plan' }).click();
    await page.getByRole('textbox', { name: 'When' }).fill('Friday at noon');
    await showPlan();
    assert.match(await summary.innerText(), /When: Friday at noon/);
    assert.ok((await summary.innerText()).includes(message));

    await page.getByRole('button', { name: 'Start over' }).click();
    await choose();
    assert.equal(await draft.inputValue(), '');
    await draft.fill('What helped you get started?');
    await page.getByRole('button', { name: /Make a plan/ }).click();
    assert.equal(await page.getByRole('textbox', { name: 'When' }).inputValue(), '');
  } finally {
    await browser.close();
  }
});
