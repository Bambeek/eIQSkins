# IQSkins

A simple pixel-style web template for a gaming skin exchange. This skeleton demonstrates how a marketplace for Counter Strike and Rust skins could look. It now includes a basic Node.js backend for Steam login and inventory fetching. This project is for demonstration purposes only and does not process real trades.

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm start
```

Set the following environment variables before running for Steam authentication.
You can obtain a key from <https://steamcommunity.com/dev/apikey>.


```
STEAM_API_KEY=yourSteamKey
SESSION_SECRET=randomString
RETURN_URL=http://localhost:3000/auth/steam/return
REALM=http://localhost:3000/
```

The server must have internet access so that Steam OpenID and inventory
requests succeed.

The site will be available at `http://localhost:3000`.
Static files live in the `public/` directory.

If you only want to view the static page, you can serve it with Python from the
`public/` directory:

```bash
cd public
python3 -m http.server 8000
```
Then visit `http://localhost:8000` to view the site.

## Image Assets

The small logo and banner graphics are embedded directly in `index.html`
using base64 data URIs. This avoids issues with binary files in pull
requests. If you wish to replace them with your own images, convert the
files to base64 strings and update the `src` attributes in the HTML.
For larger assets you may want to use [Git LFS](https://git-lfs.github.com/).
