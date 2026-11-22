import { useTranslations } from 'next-intl';
import { ButtonLink, Grid, Section, SectionHead } from './ui';

type Recurso = { title: string; text: string; cta: string; href: string; download?: boolean };

/** Herramientas gratuitas del libro: autodiagnóstico, canvas y plantilla. */
export function Recursos() {
  const t = useTranslations('JudgmentAudit.resources');
  const items = t.raw('items') as Recurso[];

  return (
    <Section id="recursos" surface>
      <SectionHead eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />
      <Grid min={260}>
        {items.map((r) => (
          <article key={r.title} className="abra-card abra-reveal">
            <h3 className="abra-h3">{r.title}</h3>
            <p className="abra-text">{r.text}</p>
            <ButtonLink href={r.href} variant="ghost" download={r.download}>
              {r.cta}
            </ButtonLink>
          </article>
        ))}
      </Grid>
    </Section>
  );
}
