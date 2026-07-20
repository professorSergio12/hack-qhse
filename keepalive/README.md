# Keepalive — QHSE forms

Pings **only** this service so Render free-tier does not sleep:

`https://hack-qhse.onrender.com/`

Upload **this `keepalive` folder** as its own Render Background Worker (or Web Service).

## Deploy (Render)

1. Create a new service from this folder (or zip/upload this folder as its own repo).
2. **Build:** `npm install`
3. **Start:** `npm start`
4. Optional env: `KEEPALIVE_URL`, `KEEPALIVE_CRON` (see `.env.example`)

## Local

```bash
cd keepalive
cp .env.example .env
npm install
npm start
```

One-shot: `npm run ping`
