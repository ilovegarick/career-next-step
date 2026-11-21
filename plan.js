'use strict';

function formatPlan(action, timing, draft) {
  const [nextStep, when, message] = [action, timing, draft].map(value => value.trim());
  if (!nextStep || !when || !message) return '';

  return `MY CAREER NEXT STEP\n\nAction: ${nextStep}\nWhen: ${when}\n\nWhat I’ll say\n${message}`;
}

if (typeof module !== 'undefined') module.exports = { formatPlan };
