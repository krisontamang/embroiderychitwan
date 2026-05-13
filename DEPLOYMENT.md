# Deployment: chitwanembroidery.com

## Current Status

- App builds successfully with Next.js.
- Domain defaults are set to `https://chitwanembroidery.com`.
- Admin dashboard is available at `/admin`.
- Supabase and Cloudinary are wired through environment variables and work in demo mode until real keys are added.

## Required Vercel Environment Variables

Add these in Vercel Project Settings -> Environment Variables:

```bash
NEXT_PUBLIC_SITE_URL=https://chitwanembroidery.com
NEXT_PUBLIC_WHATSAPP_NUMBER=9779800000000
NEXT_PUBLIC_WHATSAPP_DISPLAY="+977 980 0000000"

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_UPLOAD_FOLDER=chitwan-embroidery
```

## Vercel Deploy

If using the Vercel CLI:

```bash
vercel login
vercel link
vercel deploy --prod
```

If using GitHub integration:

1. Create a GitHub repo named `embroiderychitwan`.
2. Push this project to the `main` branch.
3. Import the repo in Vercel.
4. Add the environment variables above.
5. Deploy.

## Add Domain in Vercel

In Vercel:

1. Open the project.
2. Go to Settings -> Domains.
3. Add `chitwanembroidery.com`.
4. Add `www.chitwanembroidery.com` too.

## Cloudflare DNS Records

In Cloudflare DNS for `chitwanembroidery.com`, add:

```text
Type: A
Name: @
Value: 76.76.21.21
Proxy status: DNS only

Type: CNAME
Name: www
Value: 208cc2f205e47bab.vercel-dns-017.com
Proxy status: DNS only
```

Vercel may show project-specific records after you add the domain. If Vercel displays different DNS values, use Vercel's shown values.

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Create an Auth user for the admin.
4. Insert the Auth user UUID into `public.admin_profiles`.
5. Add Supabase env vars in Vercel.

## Cloudinary Setup

1. Create a Cloudinary account.
2. Add the Cloudinary env vars in Vercel.
3. The admin dashboard upload button will send images/videos to Cloudinary.
