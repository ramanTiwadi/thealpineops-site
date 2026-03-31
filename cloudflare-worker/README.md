## Cloudflare Worker: Google Reviews Proxy

This worker lets the GitHub Pages frontend fetch Google reviews without exposing
the Google API key in browser code.

### Endpoints

- `GET /reviews`

### Required secrets

Set these in Cloudflare Workers:

- `GOOGLE_API_KEY`
- `GOOGLE_PLACE_ID`

### Deploy

```bash
cd cloudflare-worker
npm install -g wrangler
wrangler login
wrangler secret put GOOGLE_API_KEY
wrangler secret put GOOGLE_PLACE_ID
wrangler deploy
```

### Frontend setup

Add the deployed Worker URL to your frontend env:

```bash
VITE_GOOGLE_REVIEWS_API_URL=https://your-worker.your-subdomain.workers.dev/reviews
```

For local dev, place it in a `.env.local` file in the project root.

### GitHub Actions deployment

This repo includes a workflow at:

- `.github/workflows/deploy-cloudflare-worker.yml`

Add these repository secrets in GitHub before using it:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `GOOGLE_API_KEY`
- `GOOGLE_PLACE_ID`

The workflow deploys automatically on pushes to `main` or `master` when files
inside `cloudflare-worker/` change, and it can also be run manually from the
Actions tab.
