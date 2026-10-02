import { useTranslations } from 'next-intl';
import { Label, SectionHead, mutedTag } from '@/components/shared/motion';

const NOUGRAM_URL = 'https://nougram.co';

type Product = {
  eyebrow: string;
  title: string;
  headline: string;
  description: string;
  status: string;
  highlightsLabel: string;
  highlights: string[];
  cta: string;
};

export default function Laboratory() {
  const t = useTranslations('home.lab');
  const nougram = t.raw('products.nougram') as Product;

  return (
    <section id="laboratory" className="relative border-t border-white/5 py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHead eyebrow={t('eyebrow')} title={t.rich('title', mutedTag)} lead={t('lead')} />

        <div className="flex flex-col gap-8">
          {/* Nougram keeps its own brand colors. */}
          <article className="abra-lift abra-reveal rounded-[2rem] border border-[#E54D00]/25 bg-[#262537] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-12">
            <ProductHeader product={nougram} dotColor="#FFB48A" badgeClass="border-[#E54D00]/40 bg-[#E54D00]/10 text-[#FFB48A]" />
            <ProductBody product={nougram} />
            <a
              href={NOUGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary inline-flex items-center gap-2 rounded-full bg-[#E54D00] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#f05f18]"
            >
              {nougram.cta}
              <span aria-hidden="true">↗</span>
            </a>
          </article>
        </div>

        <p className="abra-reveal mt-12 max-w-3xl border-t border-white/5 pt-8 text-sm font-light italic leading-relaxed text-white/55">
          {t('microcopy')}
        </p>
      </div>
    </section>
  );
}

function ProductHeader({ product, badgeClass, dotColor }: { product: Product; badgeClass: string; dotColor?: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-white/60">{product.eyebrow}</p>
        <h3 className="abra-h3 text-3xl font-semibold md:text-4xl">{product.title}</h3>
      </div>
      <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${badgeClass}`}>
        <span
          className="abra-dot abra-dot--sm"
          style={dotColor ? { background: dotColor } : undefined}
          aria-hidden="true"
        />
        {product.status}
      </span>
    </div>
  );
}

function ProductBody({ product }: { product: Product }) {
  return (
    <>
      <p className="mb-4 text-xl font-medium leading-snug text-white md:text-2xl">{product.headline}</p>
      <p className="mb-8 max-w-3xl text-base font-light leading-relaxed text-white/75">{product.description}</p>
      {product.highlightsLabel ? <Label muted className="mb-3">{product.highlightsLabel}</Label> : null}
      <ul className={`mb-10 grid grid-cols-1 gap-4 ${product.highlights.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
        {product.highlights.map((item) => (
          <li
            key={item}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm font-light leading-relaxed text-white/80"
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
