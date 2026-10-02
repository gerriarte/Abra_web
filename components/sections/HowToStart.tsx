import { useLocale, useTranslations } from 'next-intl';
import { ButtonLink, Label, SectionHead, mutedTag } from '@/components/shared/motion';
import { CAL_BOOKING_URL } from '@/lib/links';

type Option = { label: string; title: string; body: string; cta: string };

export default function HowToStart() {
  const t = useTranslations('home.start');
  const locale = useLocale();
  const [call, audit] = t.raw('options') as Option[];

  return (
    <section id="start" className="relative border-t border-white/5 py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHead eyebrow={t('eyebrow')} title={t.rich('title', mutedTag)} />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <article className="abra-card abra-reveal gap-4 p-8 md:p-10">
            <Label muted>{call.label}</Label>
            <h3 className="abra-h3 text-2xl">{call.title}</h3>
            <p className="abra-text">{call.body}</p>
            <div className="mt-auto pt-4">
              <ButtonLink href={CAL_BOOKING_URL} variant="ghost" external>
                {call.cta}
              </ButtonLink>
            </div>
          </article>
          <article className="abra-card abra-card--accent abra-reveal gap-4 p-8 md:p-10">
            <Label>{audit.label}</Label>
            <h3 className="abra-h3 text-2xl">{audit.title}</h3>
            <p className="abra-text">{audit.body}</p>
            <div className="mt-auto pt-4">
              <ButtonLink href={`/${locale}/judgment-audit`}>{audit.cta}</ButtonLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
