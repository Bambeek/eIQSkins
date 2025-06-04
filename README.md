# IQSkins

A simple pixel-style web template for a gaming skin exchange. This skeleton demonstrates how a marketplace for Counter Strike and Rust skins could look. It now includes a basic Node.js backend for Steam login and inventory fetching.

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm start
```

Set the following environment variables before running for Steam authentication:

```
STEAM_API_KEY=yourSteamKey
SESSION_SECRET=randomString
```

The site will be available at `http://localhost:3000`.

If you only want to view the static page, you can serve it with Python:

```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` to view the site.
