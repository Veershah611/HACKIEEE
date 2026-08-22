import { Brief } from '@/components/sections/Brief';
import { Bugle } from '@/components/sections/Bugle';
import { Chapters } from '@/components/sections/Chapters';
import { Cta } from '@/components/sections/Cta';
import { Decree } from '@/components/sections/Decree';
import { Faq } from '@/components/sections/Faq';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Nav } from '@/components/sections/Nav';
import { Prizes } from '@/components/sections/Prizes';
import { Roster } from '@/components/sections/Roster';
import { Tape } from '@/components/sections/Tape';
import { Timeline } from '@/components/sections/Timeline';
import { Tracks } from '@/components/sections/Tracks';

/**
 * One long-scroll page. Section order is the page order — this is the whole
 * composition, and each section owns its own markup, styles and behaviour.
 */
export default function Page() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Tape />
        <Brief />
        <Decree />
        <Tracks />
        <Timeline />
        <Bugle />
        <Roster />
        <Prizes />
        <Chapters />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
