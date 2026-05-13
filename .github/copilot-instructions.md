# Copilot Instructions

Project name: Interview Prep Coach

Tech stack:
- Frontend: Next.js, React, TypeScript
- Styling: Tailwind CSS
- Backend: Node.js
- Database: PostgreSQL
- AI integration: OpenAI-compatible API

Primary source of truth:
- Product requirements: `docs/app-spec.md`
- Agent workflow rules: `AGENTS.md`

Core rules:
- Read the relevant parts of `docs/app-spec.md` before making changes.
- Preserve the mastery-based rating model.
- Do not treat mistakes as direct rating deductions.
- Keep Knowledge Rating separate from Improvement Areas.
- Make minimal focused edits.
- Do not refactor unrelated files.
- Do not add dependencies unless necessary.
- Ask before changing database schema, auth flow, routing structure, or app architecture.
- Prefer reusable typed components and clear separation of UI, business logic, and persistence.
- Keep code readable, production-oriented, and easy to extend.

Working style:
1. Understand the requested change.
2. Read the relevant spec section.
3. Identify impacted files.
4. Propose a short plan for non-trivial work.
5. Implement only the requested change.
6. Summarize what changed and any follow-up work.

Quality bar:
- Type-safe code
- Clear naming
- No duplicated business logic
- Responsive UI
- No hardcoded mock logic where real structure is expected