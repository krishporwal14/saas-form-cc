# SaaS Form App

Simple Next.js form that stores submissions in Postgres via Prisma ORM.

## Local Run

1. Install dependencies:

```bash
npm install
```

2. Create local env file:

```bash
cp .env.example .env.local
```

3. Add your real `POSTGRES_URL` to `.env.local`.

4. Push the Prisma schema to your database:

```bash
npx prisma db push
```

5. Start dev server:

```bash
npm run dev
```

## What It Stores

Submissions are inserted by Prisma into `form_submissions` with columns:

- `id`
- `full_name`
- `email`
- `company`
- `message`
- `created_at`

The table is created when you run `npx prisma db push`.

## Deploy To Vercel

1. Push this repo to GitHub.
2. In Vercel, import the GitHub repo.
3. In your Vercel project, add a Postgres database from Storage.
4. Confirm `POSTGRES_URL` is present in project Environment Variables.
5. Deploy.

Optional CLI deployment:

```bash
npx vercel
npx vercel --prod
```
