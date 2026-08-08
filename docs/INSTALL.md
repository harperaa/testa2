# Installation Complete!

## Automated Steps

- Dependencies installed
- Doppler CLI installed and authenticated
- Doppler project created with dev/prd configs
- Repo pinned to dev (.doppler.yaml written)
- CSRF and Session secrets pushed to Doppler dev
- Clerk application created (accountless)
- JWT template for Convex created
- Frontend API URL pushed to Doppler dev
- Convex project set up and functions deployed
- Webhook endpoint created via Svix
- Convex environment variables set (CLERK_WEBHOOK_SECRET\
-  ADMIN_EMAIL\
-  NEXT_PUBLIC_CLERK_FRONTEND_API_URL)
- Convex deployment IDs synced to Doppler dev
- CI service token created and pushed to GitHub Actions

## Claim Your Clerk App

Visit: https://dashboard.clerk.com/apps/claim?token=t7be67jak7z9g8ycrxnsflnmf6bzdk78q1vy8gbb

Click the **Claim** button to create your Clerk account — then skip the remaining
setup steps on that page, as the installer has already configured everything for you.
Refresh the page after claiming to access your Clerk dashboard.

## Content Modules

- [x] homepage-content
- [x] blog
- [x] dashboard-sample
- [x] pricing

## Optional Steps (can be done later)

These are only needed when you're ready to enable paid subscriptions:

1. **Enable Billing** in Clerk Dashboard:
   - Go to Clerk Dashboard > Billing > Settings > Enable Billing
2. **Create a Subscription Plan**:
   - Clerk Dashboard > Billing > Plans > Create Plan
   - Name it, set monthly price, save

## Start Development

Doppler mode is active — env vars come from your Doppler `dev` config.

Terminal 1: `npm run convex:doppler`
Terminal 2: `npm run dev:doppler`

The URL to access your app will be shown in Terminal 2 output.
