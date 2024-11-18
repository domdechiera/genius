# ![](genius-logo.png) Genius

## A simplistic AI platform both in design and usability.

![genius-screenshot.png](genius-screenshot.png)

***Live demo:*** [https://genius-six-nu.vercel.app/](https://genius-six-nu.vercel.app/)

***NOTE:*** No API keys are set so the AI features do not function and is for display purposes only. For full functionality follow the below instructions. To test payments utilise Stripes test credit card details.

## Getting Started

1. Clone this repository:

```bash
git clone https://github.com/domdechiera/genius
```

2. Install dependencies:

```bash
npm install
```

3. Rename `.env-example` to `.env` and fill in your API keys:

   ```bash
   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   
   # AI Keys
   OPENAI_API_KEY=
   REPLICATE_API_TOKEN=
   
   # Connect to Supabase via Prisma connection pooling with Supavisor
   DATABASE_URL=
   DIRECT_URL=
   
   # Stripe
   STRIPE_API_KEY=
   STRIPE_WEBHOOK_SECRET=
   NEXT_PUBLIC_APP_URL=http://localhost:3000 
   # localhost for testing only - in production add your Stripe webhooks endpoint URL
   ```

4. Run the development server:

```bash
npm run dev
```

5. For testing of Stripe payments run the following in a separate shell:

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

6. For ease of database management run:

```bash
npx prisma studio
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## The Stack

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project utilises the following third-party tools:

- [Clerk](https://clerk.com) - Authentication and user management.
- [Supabase](https://supabase.com) - The open source Firebase alternative.
- [Stripe](https://stripe.com) - Payment processing and subscription management.
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components that you can copy and paste into your apps.
- [Vercel](https://vercel.com) -  Build, scale, and secure a faster, more personalised web.
- [Lucide](https://lucide.dev/) - Beautiful and consistent icons.
- [Crisp](https://crisp.chat/) - Business messaging platform.
- [Tailwind CSS](https://tailwindcss.com/) - Rapidly build modern websites without ever leaving your HTML.
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types.
- [OpenAI API](https://platform.openai.com/) -  API platform with latest models including DALL-E (Image Generation) and  GPT 4o-mini (Conversation and Code Generation).
- [Replicate AI](https://replicate.com) - Variety of AI models through a single API (Video and Music Generation).
- [Prisma ORM](https://prisma.io) - Simplify working and interacting with databases.

## Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

Looking to learn how to code? Check out [Code with Antonio](https://www.codewithantonio.com/).

