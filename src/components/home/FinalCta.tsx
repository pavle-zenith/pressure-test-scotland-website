import CtaBlock from '@/components/ui/CtaBlock';
import { ctaValve } from '@/assets/images';

// The final CTA, a full-width band. Restates the offer with the client's
// wording and gives the two paths (quote / phone).
export default function FinalCta() {
  return (
    <CtaBlock
      heading="Send your site drawings. Get a fixed quote back."
      body="Email them over or give us a call. You get a clear price, a date that fits your programme, and the compliance pack at the end. No pressure, no jargon."
      ctaLabel="Get a Quote"
      ctaHref="/contact"
      id="final-cta-title"
      fullWidth
      image={ctaValve}
    />
  );
}
