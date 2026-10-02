import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SectionHead, mutedTag } from '@/components/shared/motion';

/** Description copy lives in messages: home.partners.items.<key>. */
const PARTNERS = [
  {
    key: 'mtm',
    name: 'MTM Marca tu Marca',
    logo: '/Bestune/MTM-Marca-tu-marca-brand.webp',
    url: 'https://mtmmarcatumarca.com',
  },
];

export function PartnerShowcase() {
  const t = useTranslations('home.partners');

  return (
    <section id="partners" className="relative border-t border-white/5 py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHead eyebrow={t('eyebrow')} title={t.rich('title', mutedTag)} />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((partner) => (
            <a
              key={partner.key}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="abra-card abra-reveal group gap-6 p-8"
            >
              <div className="flex h-20 items-center">
                <Image
                  src={partner.logo}
                  alt=""
                  width={180}
                  height={80}
                  className="h-full w-auto max-w-[180px] rounded-lg object-contain grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="abra-h3 flex items-center gap-2">
                  {partner.name}
                  <span aria-hidden="true" className="text-sm text-aqua opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    ↗
                  </span>
                  <span className="sr-only">({t('visit')})</span>
                </h3>
                <p className="abra-text">{t(`items.${partner.key}`)}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
