import { useLocale, useTranslations } from 'next-intl';
import { ButtonLink, SectionHead, mutedTag } from '@/components/shared/motion';

export default function Founder() {
  const t = useTranslations('home.founder');
  const locale = useLocale();

  return (
    <section id="founder" className="relative border-t border-white/5 py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHead eyebrow={t('eyebrow')} title={t.rich('title', mutedTag)} />
        <div className="abra-reveal flex max-w-3xl flex-col gap-10">
          {/* TODO(ger): confirmar "más de una década" en el texto del fundador. */}
          <p className="abra-lead abra-lead--lg max-w-none">{t('body')}</p>
          <div className="abra-actions">
            <ButtonLink href={`/${locale}/gerardo-riarte`}>{t('ctaPersonal')}</ButtonLink>
            <ButtonLink href="https://www.linkedin.com/in/gerardoriarte/" variant="ghost" arrow="↗" external>
              {t('ctaLinkedin')}
            </ButtonLink>
            <ButtonLink href="https://instagram.com/gerardoriarte" variant="ghost" arrow="↗" external>
              {t('ctaInstagram')}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
