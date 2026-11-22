# Career Next Step

A free, no-account practice tool for job seekers who have applied to the roles they found and feel unsure about reaching out. Choose a low-pressure way to connect, rehearse what to say, and leave with one action you can copy or print.

- **[Try the live demo](https://ilovegarick.github.io/career-next-step/)** or open `index.html` in a browser to run it locally.
- **Run a 10-minute activity.** Open the demo and choose **For facilitators**.
- **Evaluate a pilot** with the [evaluation plan](pilot/evaluation-plan.md).

## Why this exists

Career advising can help someone improve a résumé and understand how networking works. The hard part can still be deciding what to do after the appointment, especially when contacting a stranger feels out of reach. Career Next Step starts with the smallest useful action the job seeker is willing to try.

This independent portfolio project was inspired by frontline college career advising and workforce case management. The examples are fictional. The app keeps responses in page memory and provides copy and print controls for job seekers who choose to keep a plan.

## Adapt it

Edit `scenarios.js` to use familiar industries and examples. Update `pilot/index.html` to point facilitators toward local events or advising. The question practice path works even when someone has no contact in mind and no event scheduled.

## Publish your own copy

Fork the repository. In your fork’s **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, and save. Update the demo link in your fork’s README once GitHub Pages shows its URL. [GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Tests

Run `node --test tests/plan.test.cjs` for the export unit tests. To run those tests and the browser test with Node.js 20 or newer, use:

```sh
npm ci
npx playwright install chromium
npm test
```

The browser test checks that participants write their own draft, can edit an exported plan, and can clear it with **Start over**.
