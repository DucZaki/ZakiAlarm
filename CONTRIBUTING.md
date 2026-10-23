# Contributing to ZakiAlarm

Thanks for your interest! ZakiAlarm is a Vietnamese, mobile-first alarm and
sleep-journal web app built with Vite and vanilla JavaScript modules.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints. Opening `index.html` through `file://` does
not run the Vite modules correctly.

## Checks before opening a pull request

```bash
npm test        # domain logic and screen route tests (node --test)
npm run build   # production build must succeed
```

## Conventions

- Keep scheduling and validation logic in `src/domain/` as pure functions so
  it stays unit-testable without a browser.
- Every user-facing string is Vietnamese; keep the tone short and friendly.
- Escape user-provided text with `escapeHTML` before inserting it into HTML.
- Do not add accounts, payments, ads or tracking: every feature stays free.
- Write a clear PR title in the form `type(scope): summary`, for example
  `feat(alarm): add countdown text helper`.

## Reporting bugs

Use the bug report issue template and include your browser, device, the steps
to reproduce, and what you expected to happen instead.
