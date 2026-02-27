# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

eIQSkins (IQSkins) is a demo pixel-art gaming skin marketplace built with Node.js/Express. It serves static HTML/CSS/JS from `public/` and provides Steam OpenID authentication via `passport-steam`. There is no database; sessions are in-memory only.

### Running the dev server

```bash
npm start        # starts Express on port 3000
```

The server does **not** have hot-reload. After code changes to `server.js`, you must restart the process manually.

### Environment variables

Copy `.env.example` to `.env`. The app starts without a real `STEAM_API_KEY`, but Steam login will not complete the OAuth flow without one. The `/user` and static page endpoints work regardless.

### Lint / Test / Build

- **No linter** is configured. There is no ESLint, Prettier, or similar tooling.
- **No automated tests** exist (`npm test` just echoes an error stub).
- **No build step** — the frontend is plain HTML/CSS/JS served as static files.

### Key gotchas

- The `main` branch contains only a README; all application code lives on feature branches (merged into the dev branch during setup).
- Express 5.x is used, which is still a pre-release line and has some API differences from Express 4.
- The `passport-steam` strategy requires internet access to reach Steam's OpenID endpoint; it will fail in fully offline environments.
