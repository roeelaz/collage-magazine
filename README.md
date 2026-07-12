# קולאז' — Collage Magazine

Independent website for Collage, a Hebrew literary magazine: issue publishing
(free/paid downloads), a public updates feed, a submission form, and a
password-protected admin panel.

## Running it locally

### 1. Prerequisites

You need **Node.js** (version 20 or newer) installed. Check if you already have it:

```bash
node -v
npm -v
```

If that fails with "command not found", install Node.js:

- **Mac**: `brew install node` (requires [Homebrew](https://brew.sh)), or download an installer from [nodejs.org](https://nodejs.org).
- **Windows/Linux**: download an installer from [nodejs.org](https://nodejs.org).

You also need a Postgres connection string — see step 3.

### 2. Install and configure

From the project folder, run:

```bash
npm install
```

This downloads all the packages the project depends on (Next.js, Prisma,
etc.) into a `node_modules` folder — it can take a minute or two, and you
only need to do it once (or again after pulling changes that add new
dependencies).

Next, create your local environment file:

```bash
cp .env.example .env
```

`.env` holds settings like the database connection string, the admin login,
and optional email credentials.

### 3. Set up the database

The app needs a real Postgres database, even for local development — set
`DATABASE_URL` in `.env` to a Postgres connection string (the same one you'll
use in production works fine; see the Vercel Postgres setup in "Deploying"
below). Then run:

```bash
npm run db:migrate
npm run db:seed
```

- `db:migrate` creates the tables (issues, updates, the admin login) in that
  database. You only need to re-run this if the data model changes.
- `db:seed` creates the admin user, using the `ADMIN_EMAIL` and
  `ADMIN_PASSWORD` from your `.env` file. Re-run this any time you want to
  reset the admin password.

### 4. Start the site

```bash
npm run dev
```

This starts a local server. Once you see `Ready`, open your browser to:

- **Public site**: [http://localhost:3000](http://localhost:3000)
- **Admin panel**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login) — log in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from your `.env` file.

The site auto-reloads as you edit files. To stop the server, go back to the
terminal and press `Ctrl+C`.

### What you can do from the admin panel

- Create a new **issue**: upload a cover image and a PDF, write a title and
  description, mark it free or paid, and publish it (or save as a draft by
  leaving "פרסום" unchecked).
- Create a new **update**: a short announcement (e.g. a new issue, an open
  call for submissions) that appears on the homepage and the updates feed.
- Edit or delete existing issues/updates at any time.

### What works without any external accounts

- **File uploads**: cover images and PDFs are saved to `public/uploads`
  (switches to Vercel Blob automatically once `BLOB_READ_WRITE_TOKEN` is set).
- **Submission emails**: without `SMTP_*` env vars set, submissions from the
  "הגשת יצירות" form are logged to the terminal instead of emailed — the
  flow is still fully testable, you just won't get a real email.

### Troubleshooting

- **"command not found: npm"** — Node.js isn't installed or isn't on your
  PATH; see step 1.
- **Port 3000 already in use** — another process is using it. Either stop
  that process, or run `npm run dev -- -p 3001` to use a different port.
- **Admin login fails** — make sure you ran `npm run db:seed` after setting
  `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`, and that you're using those
  exact values.
- **Changed `.env` but nothing changed** — stop the dev server (`Ctrl+C`)
  and run `npm run dev` again; environment variables are only read at
  startup.

### `npm run` scripts

- `dev` / `build` / `start` / `lint` — standard Next.js scripts.
- `db:migrate` — run Prisma migrations.
- `db:seed` — create/update the admin user from `.env`.
- `db:studio` — opens Prisma Studio, a visual browser/editor for the local
  database, at [http://localhost:5555](http://localhost:5555).

## Deploying

1. **Database**: in your Vercel project, go to Storage → Create Database →
   Postgres (this provisions a Neon-backed Postgres database and can
   auto-populate `DATABASE_URL` as a project env var). Copy that same
   connection string into your local `.env` too, then run
   `npm run db:migrate` once to create the tables.
2. **File storage**: set `BLOB_READ_WRITE_TOKEN` (Vercel Blob) — uploads
   automatically switch from local disk to Blob storage, no code changes
   needed (see `src/lib/storage.ts`).
3. **Email**: set `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` so
   submissions are emailed instead of logged.
4. **Session secret**: set `SESSION_SECRET` to a fresh random 64-char hex
   string (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).
5. **Admin login**: set `ADMIN_EMAIL` / `ADMIN_PASSWORD` and run
   `npm run db:seed` once against the production database.
6. **Domain**: point your domain's DNS at the hosting provider (Vercel is
   the natural fit for Next.js) and set `SITE_URL` to the final URL — it
   feeds the sitemap, robots.txt, and Open Graph metadata.

Paid issues are modeled (`Issue.priceAgorot`, an `Order` table with
`downloadToken`) but checkout isn't wired up yet — the intent is to add a
payment processor (e.g. Stripe) that creates an `Order` on successful
payment and gates the download route on it, without changing the schema.
