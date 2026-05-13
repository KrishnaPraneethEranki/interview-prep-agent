# AGENTS.md

## Purpose
This repository uses a spec-driven workflow for AI-assisted development. Treat this file as the operating manual for coding agents working in this repo.

## Source of truth
- Product specification: `docs/app-spec.md`
- Repo-wide coding instructions: `.github/copilot-instructions.md`

## Agent behavior
When asked to make a change:

1. Read the relevant sections in `docs/app-spec.md`.
2. Identify the smallest set of files that need to change.
3. For non-trivial work, propose a concise implementation plan first.
4. Make minimal, reviewable edits.
5. Avoid unrelated refactors.
6. Preserve existing conventions unless explicitly asked to improve them.
7. After changes, summarize:
   - files changed,
   - what was implemented,
   - any assumptions,
   - any follow-up work.

## Ask before doing these
- Changing database schema
- Adding or removing dependencies
- Changing authentication behavior
- Renaming major folders or public APIs
- Reworking architecture
- Replacing existing UI frameworks or libraries

## Never do these
- Do not commit secrets or API keys
- Do not modify unrelated files
- Do not silently change the rating model
- Do not mix mistake tracking into skill rating
- Do not replace real app flows with only static landing-page code

## Product-specific rules
- Ratings represent knowledge acquired in a skill over time.
- Mistakes are tracked separately as learning gaps.
- Every category has an overall knowledge rating on a 10-point scale.
- The UI displays the rating as 5 stars using score / 2.
- Example: 7/10 = 3.5 stars.
- AI feedback must include strengths, missing concepts, improved answer, explanation, and a follow-up question.

## Preferred implementation approach
- Keep components small and reusable.
- Keep evaluation logic separate from UI components.
- Keep persistence logic separate from presentation.
- Use clear types/interfaces for domain models.
- Build incrementally: dashboard, category page, session flow, summary, analytics.

## Done criteria
A task is done when:
- the requested behavior is implemented,
- relevant types and logic are updated,
- unrelated files are untouched,
- the result matches `docs/app-spec.md`.