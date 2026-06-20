# Kingdom IP Website

Lean production-ready Next.js website for **Kingdom IP**, a diagnostic strategy consultancy serving churches, ministries, pastors, and select purpose-driven organizations.

## Strategy Brief

Kingdom IP should feel intelligent, direct, modern, useful, and high-trust. The positioning is expert diagnostic judgment, not automated reporting. The site is built to generate qualified leads by helping visitors quickly understand the audit model, compare packages, and start an intake without wading through a large consulting catalog.

Core message: **Find what is holding your church back.**

Value proposition: **Clear diagnosis. Practical next steps.**

The copy avoids vague church language, inflated growth promises, generic consulting jargon, and over-positioning AI as the core service.

## Public Sitemap

- `/` - Homepage with hero, process summary, focused services, what you get, why Kingdom IP, featured package, FAQ preview, final CTA.
- `/services` - Focused audit services plus package comparison.
- `/contact` - Multi-step inquiry form.
- `/studio` - Sanity Studio for future CMS-managed content.

## Visual Direction

The brand uses a deep charcoal foundation, warm off-white surfaces, electric lime as the dominant accent, and sharp cobalt as the secondary accent. The visual system leans on audit-style scorecards, line details, bold typography, grid structure, direct CTAs, and diagnostic graphics.

Avoided motifs: crosses, doves, church buildings, crowns, shields, flames, soft pastel startup design, and generic church stock photography.

## Brand System

- Logo: strong minimal K mark with Kingdom IP wordmark.
- Mark: `/public/brand/logo-mark.svg`
- Wordmark: `/public/brand/wordmark.svg`
- Favicon: `/public/favicon.svg`
- Social profile image: `/public/brand/social-profile.svg`
- Colors:
  - Ink: `#111111`
  - Carbon: `#1a1a1a`
  - Paper: `#f7f3e8`
  - Bone: `#fffaf0`
  - Electric lime: `#d8ff3f`
  - Sharp cobalt: `#315cff`
  - Vivid orange: `#ff6a2a`
- Typography:
  - Display: local heavy grotesk stack, designed to avoid build-time font fetching
  - Body: Inter/system UI stack
- Buttons:
  - Primary: lime fill, black text
  - Secondary: lime outline on dark
  - Dark: black fill on light surfaces
- Cards:
  - Square/low-radius audit cards with strong borders.
- Icon style:
  - Lucide line icons, used sparingly as functional cues.

## Offer Strategy

The public menu is intentionally narrow:

- Website & Digital Presence Audit: `$750-$1,500`
- Message & Next Step Audit: `$950-$1,750`
- Sermon Clarity Review: `$350` single / `$950` bundle
- Systems & Workflow Audit: `$1,250-$2,500`
- Custom Consulting: by inquiry

This keeps Kingdom IP from promising work that needs interviews, onsite observation, or deeper leadership facilitation before a proper scope is defined.

The contact intake is intentionally thorough. It routes people through basics, scope, digital/message materials, sermon review materials, systems/workflow context, and final permissions. The sermon section supports 1, 3, 5, or 10 sermon reviews with separate links and details for each sermon. A 10-sermon diagnostic should be treated as a premium engagement, not the default sermon offer.

## Wireframe Summary

Homepage:

1. Dark hero with headline, dual CTA, diagnostic scorecard visual.
2. Three-step audit explanation.
3. Four service category cards.
4. Dark "What You Get" section.
5. Why Kingdom IP and sample social proof format.
6. Featured package panel.
7. FAQ preview.
8. Final CTA.

Services includes the audit menu and package comparison. Contact uses a multi-step form to capture complete audit materials.

## Local Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`.

## Environment Variables

Set these in `.env.local` and in Vercel:

```bash
NEXT_PUBLIC_SITE_URL=https://kingdomip.org
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=production
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=Kingdom IP <hello@kingdomip.org>
NEXT_PUBLIC_ANALYTICS_PROVIDER=vercel
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

The contact form sends through Resend. Add `RESEND_API_KEY` and `CONTACT_TO_EMAIL` before real traffic. `CONTACT_TO_EMAIL` is where inquiries go; use one email or a comma-separated list. If Resend is not configured, the form shows an error instead of a false success.

## Sanity CMS Setup

1. Create a Sanity project.
2. Add the project ID and dataset to `.env.local`.
3. Run the Next app and visit `/studio`.
4. Create documents for:
   - Site Settings
   - Services
   - Packages
   - Testimonials
   - FAQs
   - Team Members
   - Navigation
   - Footer
   - Contact Form Configuration

The current site includes first-draft fallback content in `lib/content.ts`. Sanity is included so the site can grow into CMS-managed content without rebuilding the project structure.

## GitHub Setup

```bash
git init
git add .
git commit -m "Launch Kingdom IP website"
git branch -M main
git remote add origin git@github.com:YOUR_ORG/kingdom-ip.git
git push -u origin main
```

This repo includes a GitHub Actions workflow at `.github/workflows/ci.yml` that installs dependencies and runs a production build on pushes and pull requests.

## Vercel Deployment

1. Import the GitHub repository into Vercel.
2. Add environment variables.
3. Use the default Next.js build settings.
4. Deploy.
5. Confirm `/`, `/services`, `/contact`, `/sitemap.xml`, `/robots.txt`, and `/studio`.

## Custom Domain: kingdomip.org

1. In Vercel, open Project Settings > Domains.
2. Add `kingdomip.org`.
3. Add `www.kingdomip.org` and redirect it to the apex domain.
4. Update DNS with the records Vercel provides.
5. Keep `NEXT_PUBLIC_SITE_URL=https://kingdomip.org`.
6. Re-deploy after DNS is verified.

## Stripe-Ready Architecture

Stripe environment variables are included. Packages have stable names and slugs, so checkout links or Stripe Price IDs can be added later without changing the package model.

## Launch Checklist

- Replace sample quote language with approved real testimonials when available.
- Confirm package pricing and service descriptions.
- Configure Resend and test contact email delivery.
- Add legal address and privacy terms if needed.
- Check mobile views for every page.
- Run keyboard navigation through menu, links, and form.
- Validate color contrast for any new CMS content.
- Submit sitemap in Google Search Console.
- Connect Plausible if preferred over Vercel Analytics.
- Confirm domain redirect from `www` to apex.
