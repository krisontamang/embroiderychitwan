# Chitwan Embroidery

Premium embroidery and fashion website for `chitwanembroidery.com`, built with Next.js, TypeScript, Tailwind CSS, Supabase, Cloudinary, and Vercel deployment in mind.

## Features

- Mobile-first luxury boutique UI with pink, gold, ivory, champagne, and ink tones
- Home, Gallery, Services, Products, Custom Orders, Contact, and Admin pages
- Product and service pricing sections
- WhatsApp ordering links
- Nepal-wide delivery and eSewa/Khalti payment messaging
- SEO metadata and LocalBusiness JSON-LD
- Admin dashboard for inline editing, search, filters, save/delete actions, image uploads, and video uploads
- Supabase-ready schema with RLS policies
- Cloudinary upload API route for images and videos
- Demo fallback data when env vars are missing

## Local Development

This workspace was bootstrapped with a local pnpm runner because no global package manager was available.

```bash
node .codex-tools/pnpm/package/bin/pnpm.cjs dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SITE_URL=https://chitwanembroidery.com
NEXT_PUBLIC_WHATSAPP_NUMBER=9779800000000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
SUPABASE_SERVICE_ROLE_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Create an admin user in Supabase Auth.
4. Insert that user's UUID into `public.admin_profiles`.
5. Add Supabase env vars to Vercel.

The public site reads active products, services, and gallery items. Admin writes are protected by Supabase Auth plus the `admin_profiles` table.

## Cloudinary Setup

Create a Cloudinary account and add cloud name, API key, API secret, and upload folder env vars. The admin dashboard posts files to `/api/uploads`, which supports image and video uploads.

## Deploying to Vercel

1. Push the project to GitHub.
2. Import it into Vercel.
3. Add all env vars from `.env.example`.
4. Point `chitwanembroidery.com` DNS to Vercel.
