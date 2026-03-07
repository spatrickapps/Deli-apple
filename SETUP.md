# Costco Deli App — Setup Guide

## What you need (all free)
- GitHub account → github.com
- Netlify account → netlify.com
- Supabase account → supabase.com

---

## Step 1 — Supabase (your database)

1. Go to supabase.com → New Project → name it "deli-app"
2. Once loaded, go to **SQL Editor** and run:

```sql
create table orders (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  user_name text not null,
  total_items int,
  items jsonb
);

create table settings (
  key text primary key,
  value jsonb
);
```

3. Go to **Project Settings → API** and copy:
   - **Project URL** (looks like https://xxxx.supabase.co)
   - **service_role** secret key (click Reveal)

---

## Step 2 — GitHub

1. Create a new repo called `deli-app` (Public)
2. Upload ALL files from this folder preserving structure:

```
deli-app/
├── public/
│   └── index.html
├── src/
│   └── app.jsx
├── netlify/
│   └── functions/
│       ├── orders.js
│       ├── disabled-items.js
│       ├── admin-login.js
│       └── package.json
├── scripts/
│   └── build.js
└── netlify.toml
```

Easiest: drag the whole unzipped folder into GitHub's file upload page.

---

## Step 3 — Netlify

1. Import from GitHub → select `deli-app`
2. Build settings (Netlify may auto-detect, but verify):
   - Build command: `node scripts/build.js`
   - Publish directory: `public`
3. Click Deploy

4. Once deployed, go to **Site Configuration → Environment Variables** and add:

| Key | Value |
|-----|-------|
| `SUPABASE_URL` | your Supabase project URL |
| `SUPABASE_SERVICE_KEY` | your service_role key |
| `ADMIN_KEY` | make up any secret string (e.g. xK9mP2qL) |

5. Go to **Deploys → Trigger deploy → Deploy site** to rebuild with env vars

---

## How to update the app

1. Edit `src/app.jsx` in GitHub
2. Netlify auto-detects the change, rebuilds and redeploys in ~60 seconds
3. Users see the green update banner next time they open the app online

---

## What's protected

- Your Supabase keys and ADMIN_KEY only exist as Netlify environment variables — never in the browser
- The admin password check runs on Netlify's server only
- The built `app.min.js` that users download has all variable names scrambled into single characters, all comments stripped, and is ~70% smaller than the source
- Anyone viewing source sees an unreadable minified bundle, not your app logic

---

## Admin login
- Username: Admin
- Password: chicken1
