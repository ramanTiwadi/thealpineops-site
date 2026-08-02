# Alpine Ops Google Reviews Integration

This repo now contains a full Google Reviews integration for a static React site hosted on GitHub Pages:

```text
React website -> Cloudflare Worker -> Cloudflare KV cache -> Google Places API (New)
```

The browser never sees the Google API key. React calls `https://reviews.thealpineops.com/reviews`; the Worker reads Google secrets, fetches Place Details reviews, caches the response for 12 hours, and returns stale cached reviews if Google is temporarily unavailable.

## Prerequisites

- Use Node.js 22 LTS for the Worker. Current Wrangler releases require Node 22.
- Use Node.js 20.19+ or 22.12+ for the Vite site.
- Use the dedicated Alpine Ops Gmail account for Cloudflare, Google Cloud, billing, and API ownership.
- Keep payment and recovery details attached to the Alpine Ops account, not a personal account.

## Folder Structure

```text
cloudflare/google-reviews-worker/
  package.json
  wrangler.jsonc
  tsconfig.json
  src/index.ts

src/hooks/useGoogleReviews.ts
src/components/GoogleReviews/
  ReviewGrid.tsx
  ReviewCard.tsx
  StarRating.tsx
  GoogleReviews.module.scss
```

The home page uses `ReviewGrid` from `src/components/GoogleReviews/ReviewGrid.tsx`.

## Part 1: Cloudflare Setup

Official references:

- Cloudflare account and dashboard: https://dash.cloudflare.com/sign-up
- Add a site and change nameservers: https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/
- Workers getting started: https://developers.cloudflare.com/workers/get-started/guide/
- Wrangler config: https://developers.cloudflare.com/workers/wrangler/configuration/
- KV bindings: https://developers.cloudflare.com/kv/concepts/kv-bindings/
- Worker custom domains: https://developers.cloudflare.com/workers/configuration/routing/custom-domains/

### 1. Create a Cloudflare Account

1. Open https://dash.cloudflare.com/sign-up.
2. Sign up with the dedicated Alpine Ops Gmail account.
3. Verify the email when Cloudflare sends the verification message.
4. Keep this Gmail account as the owner for Cloudflare, Google Cloud, billing, and API keys.

### 2. Add `thealpineops.com` to Cloudflare

1. In Cloudflare dashboard, click `Add a domain`.
2. Enter `thealpineops.com`.
3. Choose the Free plan unless you already know you need paid Cloudflare features.
4. Cloudflare scans existing DNS records.
5. Review the scanned DNS records before continuing.

### 3. What Happens to GoDaddy DNS

GoDaddy remains the registrar, meaning you still renew the domain there. Cloudflare becomes the authoritative DNS provider, meaning DNS records are managed in Cloudflare after the nameserver switch.

Before changing nameservers, copy important GoDaddy DNS records into Cloudflare:

- `A`, `AAAA`, or `CNAME` records used by GitHub Pages.
- `CNAME` record for `www`, if present.
- `MX`, `TXT`, `SPF`, `DKIM`, and `DMARC` records, if email is configured.
- The existing GitHub Pages `CNAME` target if the site already works.

### 4. Change GoDaddy Nameservers

1. In Cloudflare, after adding the domain, Cloudflare shows two nameservers such as `name.ns.cloudflare.com`.
2. Keep that Cloudflare tab open.
3. Open GoDaddy: https://dcc.godaddy.com/domains.
4. Select `thealpineops.com`.
5. Go to `DNS` or `Manage DNS`.
6. Find `Nameservers`.
7. Click `Change Nameservers`.
8. Choose `I'll use my own nameservers`.
9. Paste both Cloudflare nameservers exactly.
10. Save.

DNS propagation can take minutes or up to 24 hours.

### 5. Verify the Domain

In Cloudflare:

1. Go to `Websites`.
2. Select `thealpineops.com`.
3. Cloudflare will show `Pending nameserver update` until propagation finishes.
4. When active, it shows `Active`.

CLI checks:

```bash
dig ns thealpineops.com @1.1.1.1
dig ns thealpineops.com @8.8.8.8
```

You should see Cloudflare nameservers.

### 6. Create the First Cloudflare Worker

This repo already contains the Worker code in `cloudflare/google-reviews-worker`. You can create/deploy it from your terminal with Wrangler.

### 7. Install Wrangler

From the Worker folder:

```bash
cd cloudflare/google-reviews-worker
npm install
```

This installs Wrangler locally in this Worker project. You do not need a global install.

### 8. Log in with Wrangler

```bash
npx wrangler login
```

The browser opens Cloudflare. Log in with the Alpine Ops Gmail account and approve Wrangler.

Confirm:

```bash
npx wrangler whoami
```

### 9. Create the Worker Project

The project is already generated here, so do not run a separate scaffold command. The important files are:

```text
package.json
wrangler.jsonc
tsconfig.json
src/index.ts
```

### 10. Create a KV Namespace

```bash
npx wrangler kv namespace create REVIEWS_CACHE
```

Wrangler prints an `id`. Copy it.

### 11. Connect the KV Namespace

Open `cloudflare/google-reviews-worker/wrangler.jsonc` and replace:

```jsonc
"id": "PASTE_YOUR_KV_NAMESPACE_ID_HERE"
```

with the real namespace id from Wrangler.

### 12. Create Worker Secrets

After Google setup is complete, add both secrets:

```bash
npx wrangler secret put GOOGLE_PLACES_API_KEY
npx wrangler secret put GOOGLE_PLACE_ID
```

Paste the API key into the first prompt and the Google Business Place ID into the second prompt.

### 13. Deploy the Worker

```bash
npm run deploy
```

Wrangler deploys `alpine-ops-google-reviews`.

### 14. Map `reviews.thealpineops.com` to the Worker

The `wrangler.jsonc` file includes:

```jsonc
"routes": [
  {
    "pattern": "reviews.thealpineops.com",
    "custom_domain": true
  }
]
```

After deploy, Cloudflare creates the custom domain route and certificate. You can also verify in the dashboard:

1. Cloudflare dashboard -> `Workers & Pages`.
2. Open `alpine-ops-google-reviews`.
3. Go to `Settings` -> `Domains & Routes`.
4. Confirm `reviews.thealpineops.com` is listed.

### 15. Test the Worker Locally

Local dev still needs secrets. Use a temporary `.dev.vars` file only on your machine:

```bash
cd cloudflare/google-reviews-worker
printf "GOOGLE_PLACES_API_KEY=your_real_key\nGOOGLE_PLACE_ID=your_real_place_id\n" > .dev.vars
npm run dev
```

Test:

```bash
curl -i http://127.0.0.1:8787/reviews
```

Do not commit `.dev.vars`.

### 16. Test the Deployed Worker

```bash
curl -i https://reviews.thealpineops.com/reviews
```

Test CORS for the production website:

```bash
curl -i https://reviews.thealpineops.com/reviews \
  -H "Origin: https://thealpineops.com"
```

You should see:

```text
Access-Control-Allow-Origin: https://thealpineops.com
```

## Part 2: Google Cloud Setup

Official references:

- Google Cloud console: https://console.cloud.google.com/
- Places API (New) Place Details: https://developers.google.com/maps/documentation/places/web-service/place-details
- Place IDs: https://developers.google.com/maps/documentation/places/web-service/place-id
- API key security: https://developers.google.com/maps/api-security-best-practices
- Places usage and billing: https://developers.google.com/maps/documentation/places/web-service/usage-and-billing
- Pricing list: https://developers.google.com/maps/billing-and-pricing/pricing
- Pricing categories: https://developers.google.com/maps/billing-and-pricing/pricing-categories

### 1. Create a Google Cloud Project

1. Open https://console.cloud.google.com/.
2. Sign in with the Alpine Ops Gmail account.
3. Click the project selector at the top.
4. Click `New Project`.
5. Project name: `Alpine Ops Website`.
6. Click `Create`.

### 2. Naming

Use:

```text
Alpine Ops Website
```

This keeps Maps billing separate from unrelated future projects.

### 3. Billing Requirements

Google Maps Platform requires billing for Places API requests. In Google Cloud:

1. Open `Billing`.
2. Create or select a billing account.
3. Add a payment method.
4. Link billing to `Alpine Ops Website`.
5. Add a budget alert, for example `₹500` or a USD equivalent you are comfortable with.

### 4. Enable Places API (New)

1. In Google Cloud, select `Alpine Ops Website`.
2. Go to `APIs & Services` -> `Library`.
3. Search `Places API`.
4. Open `Places API`.
5. Click `Enable`.

Use Places API (New), not legacy Places web service.

### 5. Create an API Key

1. Go to `APIs & Services` -> `Credentials`.
2. Click `Create credentials`.
3. Choose `API key`.
4. Copy the key.
5. Rename it to `Alpine Ops Reviews Worker Key`.

### 6. Restrict the API Key Correctly

Because the key is used by a Cloudflare Worker, do not use browser referrer restrictions. The request comes from Cloudflare, not the visitor's browser.

Use API restrictions:

1. Open the API key.
2. Under `API restrictions`, choose `Restrict key`.
3. Select `Places API`.
4. Save.

For application restrictions, the simplest reliable Worker setup is `None`, because Cloudflare Worker egress IPs are not a stable small allowlist. The key is still protected because it is stored as a Worker secret and is not sent to the browser.

### 7. Find the Google Business Place ID

Option A, easiest:

1. Open Google's Place ID Finder: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
2. Search for `Alpine Operations and Expeditions`.
3. Copy the Place ID shown in the map popup.

Option B, API test:

```bash
curl -X POST "https://places.googleapis.com/v1/places:searchText" \
  -H "Content-Type: application/json" \
  -H "X-Goog-Api-Key: YOUR_API_KEY" \
  -H "X-Goog-FieldMask: places.id,places.displayName,places.formattedAddress" \
  -d '{"textQuery":"Alpine Operations and Expeditions Dehradun"}'
```

Copy the matching `places[0].id`.

### 8. Test the API

```bash
curl -X GET \
  -H "X-Goog-Api-Key: YOUR_API_KEY" \
  -H "X-Goog-FieldMask: id,displayName,rating,userRatingCount,reviews" \
  "https://places.googleapis.com/v1/places/YOUR_PLACE_ID"
```

If it succeeds, you will see place details and reviews.

### 9. Google Quotas

In Google Cloud:

1. Go to `APIs & Services`.
2. Open `Places API`.
3. Click `Quotas & System Limits`.
4. Keep defaults at first.
5. Add budget alerts in `Billing` so spending surprises are caught early.

### 10. Estimated Monthly Cost

The Worker fetches Google at most once every 12 hours when visitors are active:

```text
2 Google requests/day x 31 days = about 62 billable requests/month
```

The request includes `reviews`, which Google lists under `Places API Place Details Enterprise + Atmosphere`. As of the current Google pricing page, Enterprise + Atmosphere has a 1,000 request monthly free usage cap globally and 7,000 in India, then starts at $25 per 1,000 global requests in the first paid tier.

Estimated normal cost for this cache design:

```text
About 62 requests/month -> usually $0 before exceeding the free usage cap.
```

Without caching, every website visitor could trigger paid Google usage. KV caching is what keeps this predictable.

### 11. Free Tier Usage

Google Maps Platform no longer uses the old blanket `$200 monthly credit` model for current Maps SKUs. Google now describes free monthly usage caps by SKU category. Reviews use an Enterprise + Atmosphere field, so plan around the Enterprise free cap and verify the pricing page before launch.

## Part 3: Worker

The Worker is implemented in `cloudflare/google-reviews-worker/src/index.ts`.

It does the following:

- Accepts only `GET /` and `GET /reviews`.
- Uses CORS only for `https://thealpineops.com`.
- Reads `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` from Worker secrets.
- Fetches Place Details from Places API (New).
- Requests only the fields needed for reviews and rating summary.
- Stores normalized JSON in KV.
- Treats cache as fresh for 12 hours.
- Keeps the KV entry for 7 days so stale reviews can be returned if Google fails.

Worker commands:

```bash
cd cloudflare/google-reviews-worker
npm install
npm run typecheck
npm run dev
npm run deploy
```

## Part 4: React

The React pieces are:

- `src/hooks/useGoogleReviews.ts`
- `src/components/GoogleReviews/ReviewGrid.tsx`
- `src/components/GoogleReviews/ReviewCard.tsx`
- `src/components/GoogleReviews/StarRating.tsx`
- `src/components/GoogleReviews/GoogleReviews.module.scss`

The hook calls:

```text
https://reviews.thealpineops.com/reviews
```

To test with a local Worker, create `.env.local` in the React project:

```bash
VITE_GOOGLE_REVIEWS_ENDPOINT=http://127.0.0.1:8787/reviews
```

Run the React app:

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Part 5: Deployment

Deploy Worker:

```bash
cd cloudflare/google-reviews-worker
npm run deploy
```

Deploy React site to GitHub Pages using your existing process. This repo is a Vite static site, so the site build is:

```bash
npm run build
```

After GitHub Pages deploys, open:

```text
https://thealpineops.com
```

Then check the browser Network tab for:

```text
https://reviews.thealpineops.com/reviews
```

## Updating

Update Worker code:

```bash
cd cloudflare/google-reviews-worker
npm run deploy
```

Update React code:

```bash
npm run build
```

Rotate Google API key:

```bash
cd cloudflare/google-reviews-worker
npx wrangler secret put GOOGLE_PLACES_API_KEY
npm run deploy
```

Update Place ID:

```bash
cd cloudflare/google-reviews-worker
npx wrangler secret put GOOGLE_PLACE_ID
npm run deploy
```

Clear review cache manually:

```bash
cd cloudflare/google-reviews-worker
npx wrangler kv key delete google-place-reviews:v1 --binding REVIEWS_CACHE
```

The next request refetches Google.

## Troubleshooting

`reviews.thealpineops.com` does not resolve:

- Confirm `thealpineops.com` is Active in Cloudflare.
- Confirm GoDaddy nameservers match Cloudflare nameservers.
- Confirm Worker custom domain exists under `Workers & Pages` -> Worker -> `Settings` -> `Domains & Routes`.

Worker says KV binding missing:

- Confirm `REVIEWS_CACHE` exists in `wrangler.jsonc`.
- Confirm the KV namespace id is real.
- Redeploy with `npm run deploy`.

Google returns `REQUEST_DENIED` or `403`:

- Confirm billing is enabled.
- Confirm Places API is enabled.
- Confirm the API key is restricted to Places API.
- Confirm the secret value was pasted correctly.

React shows an error state:

- Test `curl -i https://reviews.thealpineops.com/reviews`.
- Check CORS with `Origin: https://thealpineops.com`.
- Confirm `VITE_GOOGLE_REVIEWS_ENDPOINT` is not pointing to a dead local URL in production.

Reviews are old:

- The cache refreshes after 12 hours.
- Delete the KV key to force refresh.
- Google may not return every review; Places API typically returns a limited set of relevant reviews.

## Part 6: Best Practices

### Why Cloudflare Worker Instead of a Backend

The website is static on GitHub Pages, so adding a traditional backend would mean hosting, servers, deployments, monitoring, and security patching. A Worker gives one small serverless function close to users, with simple deployment and no always-on server.

### Why KV Caching

Google review data does not need to change on every page load. KV keeps the site fast and limits Google billable requests. This implementation fetches from Google only when the cached copy is older than 12 hours.

### Why Not Expose API Keys

Anything in React is public. If the Google key were shipped to the browser, anyone could copy it and spend your quota. Worker secrets stay server-side.

### How to Rotate Secrets

Create a new key in Google Cloud, restrict it to Places API, then run:

```bash
cd cloudflare/google-reviews-worker
npx wrangler secret put GOOGLE_PLACES_API_KEY
npm run deploy
```

After the new key works, delete the old key in Google Cloud.

### How to Update the Google Reviews Cache

Normal update:

```text
Wait up to 12 hours.
```

Immediate update:

```bash
cd cloudflare/google-reviews-worker
npx wrangler kv key delete google-place-reviews:v1 --binding REVIEWS_CACHE
```

Then visit:

```text
https://reviews.thealpineops.com/reviews
```
