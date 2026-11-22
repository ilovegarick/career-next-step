'use strict';

const get = id => document.getElementById(id);
const stages = document.querySelectorAll('.stage');
const progress = document.querySelector('.progress');
const steps = [...progress.children];
const draft = get('draft');
const action = get('action');
const timing = get('timing');
const summary = get('summary');
const status = get('status');
const drafts = new Map();
let currentScenario;
const choiceButtons = new Map();

function show(id, focus = true) {
  const step = ['choose', 'practice', 'plan', 'result'].indexOf(id);
  stages.forEach(stage => { stage.hidden = stage.id !== id; });
  steps.forEach((item, index) => {
    item.removeAttribute('aria-current');
    if (Math.min(step, 2) === index) item.setAttribute('aria-current', 'step');
  });
  status.textContent = '';
  if (focus) get(id).querySelector('h2').focus();
}

for (const [key, scenario] of Object.entries(scenarios)) {
  const button = document.createElement('button');
  button.type = 'button';
  const label = document.createElement('strong');
  label.textContent = scenario.label;
  const description = document.createElement('span');
  description.textContent = scenario.description;
  button.append(label, description);
  button.addEventListener('click', () => {
    const saved = drafts.get(key);
    currentScenario = key;
    get('practice-title').textContent = scenario.title;
    get('hint').textContent = scenario.hint;
    get('example-draft').textContent = scenario.draft;
    draft.value = saved?.draft ?? '';
    action.value = saved?.action ?? scenario.action;
    timing.value = saved?.timing ?? '';
    [draft, action, timing].forEach(field => field.setCustomValidity(''));
    show('practice');
  });
  choiceButtons.set(key, button);
  get('choices').append(button);
}

function validate(field) {
  field.setCustomValidity(field.value.trim() ? '' : 'Enter something before continuing.');
  return field.reportValidity();
}

function remember() {
  drafts.set(currentScenario, { draft: draft.value, action: action.value, timing: timing.value });
}

for (const field of [draft, action, timing]) {
  field.addEventListener('input', () => {
    field.setCustomValidity('');
    remember();
  });
}

get('practice').addEventListener('submit', event => {
  event.preventDefault();
  if (validate(draft)) show('plan');
});

get('plan').addEventListener('submit', event => {
  event.preventDefault();
  if (!validate(action) || !validate(timing)) return;
  summary.textContent = formatPlan(action.value, timing.value, draft.value);
  show('result');
});

for (const button of document.querySelectorAll('[data-back]')) {
  button.addEventListener('click', () => {
    const destination = button.dataset.back;
    show(destination, destination !== 'choose');
    if (destination === 'choose') choiceButtons.get(currentScenario).focus();
  });
}

get('copy').addEventListener('click', async () => {
  const plan = summary.textContent;
  const isCurrentPlan = () => !get('result').hidden && summary.textContent === plan;
  try {
    await navigator.clipboard.writeText(plan);
    if (isCurrentPlan()) status.textContent = 'Plan copied.';
  } catch {
    if (!isCurrentPlan()) return;
    summary.focus();
    const range = document.createRange();
    range.selectNodeContents(summary);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Plan selected. Press Ctrl+C or Command+C to copy. On a phone, touch and hold the text to copy it.';
  }
});

get('print').addEventListener('click', () => window.print());
get('restart').addEventListener('click', () => {
  drafts.clear();
  currentScenario = undefined;
  get('practice').reset();
  get('plan').reset();
  summary.textContent = '';
  show('choose');
});

progress.hidden = false;
show('choose', false);
