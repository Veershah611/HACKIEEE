import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { SiteEffects } from '@/components/SiteEffects';
import { seo, siteUrl } from '@/content/event';

import '@/styles/tokens.css';
import '@/styles/base.css';
// Section styles are imported in visual order. These are plain global CSS,
// not CSS Modules, so cascade order matters — keep this list in page order.
import '@/styles/sections/nav.css';
import '@/styles/sections/hero.css';
import '@/styles/sections/tape.css';
import '@/styles/sections/drift.css';
import '@/styles/sections/stats.css';
import '@/styles/sections/decree.css';
import '@/styles/sections/bugle.css';
import '@/styles/sections/tracks.css';
import '@/styles/sections/timeline.css';
import '@/styles/sections/roster.css';
import '@/styles/sections/prizes.css';
import '@/styles/sections/chapters.css';
import '@/styles/sections/faq.css';
import '@/styles/sections/cta.css';
import '@/styles/responsive.css';
import { asset } from '@/lib/asset';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.ogDescription,
    type: 'website',
    images: [asset(seo.ogImage)],
  },
};

export const viewport: Viewport = {
  themeColor: seo.themeColor,
  width: 'device-width',
  initialScale: 1,
};

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%230A0A0F'/%3E%3Crect x='7' y='14' width='18' height='10' rx='2' fill='%23FF4E00'/%3E%3Crect x='10' y='10' width='5' height='4' rx='1.6' fill='%23FF4E00'/%3E%3Crect x='17' y='10' width='5' height='4' rx='1.6' fill='%23FF4E00'/%3E%3C/svg%3E";

const FONTS =
  'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..112,200..700&family=Pixelify+Sans:wght@400..700&family=Silkscreen:wght@400;700&family=Bangers&family=Cinzel+Decorative:wght@700;900&family=Special+Elite&display=swap';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below adds `js` to this
    // element before React hydrates, which React would otherwise flag.
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={FAVICON} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" as="image" href={asset('/assets/opt/lego-cloud.webp')} />
        <link rel="preload" as="image" href={asset('/assets/opt/rubble-ground.webp')} />
        <link rel="stylesheet" href={FONTS} />
        {/*
          Gates every hide rule in CSS. If the bundle fails to load this never
          runs, no `.js [data-reveal]:not(.in)` rule matches, and the whole page
          renders visible instead of blank. Must stay inline and must stay in
          <head> — a deferred module would flash unstyled content first.
        */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: one-line literal, no user input
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <SiteEffects />
        {children}
      </body>
    </html>
  );
}
