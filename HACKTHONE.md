# Hackthone — External QHSE Forms

Anonymous QHSE forms. **Separate from widgets and separate from backend UI.**

- **This app** = form UI (Next.js on Render)
- **Backend** = `Hackthone/backend` — receives submit, PDF, local/QHSE store
- **Widgets** = not used here

See **[../ARCHITECTURE.md](../ARCHITECTURE.md)**.

---

## Env (`.env.local`)

```env
HACKTHONE_BACKEND_URL=https://hack-backend-h3eq.onrender.com
HACKTHONE_API_KEY=...
NEXT_PUBLIC_QHSE_FORMS_URL=https://hack-qhse.onrender.com
```

Submit flow: browser → `/api/proxy` (this app) → backend `/api/qhse/*`.

---

## Dev

```bash
npm install
npm run dev   # port 3002
```

---

## Form URL pattern

```
https://hack-qhse.onrender.com/forms/near-miss
```
