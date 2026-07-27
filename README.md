# Citizen Café — Hebrew Flashcards

A flashcard app for studying Hebrew vocabulary the way Citizen Café structures it: **tier → level → type**. You pick a deck, flip a card to see the English version of the word, and shuffle when you want a fresh order.

**Live demo:** https://citizen-exam.vercel.app  
**Repo:** https://github.com/ronilea/citizen-exam

## Tech stack

Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui · Neon PostgreSQL · Prisma 7 · Vercel

## Getting started

You’ll need Node.js 20+ and a [Neon](https://neon.tech) Postgres database (the free tier is enough).

```bash
git clone https://github.com/ronilea/citizen-exam.git
cd citizen-exam
npm install
```

Copy the submitted var into `.env`:

```env
DATABASE_URL="postgresql://user:password@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require"
```

Then bring up the schema, seed the cards, and start the app:

```bash
npx prisma migrate deploy   # apply schema
npm run db:seed             # levels + ~230 flashcards
npm run dev                 # http://localhost:3000
```

Useful extras: `npm run db:seed` to re-seed, and `npx prisma studio` if you want to browse the data in a UI.

## Schema rationale

The curriculum maps cleanly onto a few layers:

```
Tier (static config)      →  Foundation | Flow | Freedom
Level (DB + config)       →  Red, Orange, … Purple
Type (DB, optional)       →  Pack 1–N for levels that have packs
Flashcard (DB)            →  Hebrew ↔ English (~10 per leaf)
```

**Why these tables?**  
`Level` and `ContentType` follow the real course structure. Flashcards hang off a level, and optionally a type. Levels without packs (Red, Purple, and so on) simply leave `typeId` null.

**Why is `tier` a string, not a table?**  
There are only three tiers, they don’t change at runtime, and they mainly exist so the UI can group levels. A full `Tier` table would mean extra joins for almost no gain. If tiers ever became configurable — renaming, reordering, or adding new ones from an admin UI — I’d promote them to a proper table and relate levels to it.

**Hybrid config + database**

| Data | Where | Why |
|---|---|---|
| Tier / level / type structure | `lib/taxonomy.ts` | Dropdowns stay instant; no round-trip for static structure |
| Vocabulary content | Neon via Prisma | Real modelling, migrations, and serverless queries |
| Offline source of truth | `seed/data.ts` | Pairs generated offline and kept in git |

In practice: generate pairs with an AI assistant, paste them into `seed/data.ts`, run `npm run db:seed`, and the app reads from Neon. Nothing calls an LLM while the app is running.

## Key decisions & trade-offs

| Decision | Trade-off |
|---|---|
| **Neon + Prisma** (not JSON-only) | Fits the brief (“seed into Neon”) and gives a real schema. The cost is a bit of setup and one network fetch per deck. |
| **Shared `DeckSelect`** | Tier, level, and type all share one dropdown component. Slight indirection, much less duplicated markup. |
| **Fetch the full deck (~10 cards)** | One request, then shuffle / back / next stay snappy on the client. At this size, chunking would mostly add loading flicker. If a leaf grew to **1000+ cards**, I’d load in chunks (or paginate) so the first paint doesn’t leave the learner waiting. |
| **CSS in `globals.css` + Tailwind in TSX** | Shared layout shells live as named classes; one-off tweaks stay as utilities. TSX is easier to read; you do jump to CSS for shared styles. |
| **Offline seed only** | Changing vocabulary means editing `seed/data.ts` and re-seeding. |
| **Linear Back / Next** | Buttons disable at the ends instead of wrapping, so the study loop feels clearer. |
| **Libre Baskerville** | Fedra is commercial; the design notes document the fallback. |

## AI usage

I used Cursor / Claude to help scaffold the stack, generate the Hebrew ↔ English pairs into `seed/data.ts`, and shape the UI from the design notes. The running app never calls an LLM.

## Deploy (Vercel)

1. Put the repo on GitHub (public for submission) and import it at [vercel.com/new](https://vercel.com/new).  
2. Add `DATABASE_URL` with the pooled Neon string.  
3. Deploy — `postinstall` runs `prisma generate`.  
4. Once from your machine against production:  
   `DATABASE_URL="…" npx prisma migrate deploy`  
   `DATABASE_URL="…" npm run db:seed`  
5. Open the live site and try **Foundation → Red**.

## If I had more time

- Spaced repetition and a way to remember progress between sessions  
- An admin UI so vocabulary can change without re-seeding  
- Pull UI copy (hero title, hints, button labels) into one config or i18n layer — so a French-speaking student, for example, could see French UI while still studying Hebrew, without looking for the English versions through many TSX files.
- Audio pronunciation for the Hebrew side  
- Licensed Fedra webfont, plus Playwright coverage for select → flip → navigate  
