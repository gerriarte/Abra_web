import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { PROJECT_GRAPHICS } from './graphics';
import { Eyebrow, Grid, Label, Muted, Section, SectionHead } from './ui';

type Project = { area: string; name: string; what: string; help: string };

/**
 * Client logos: drop files in /public/judgment-audit/clients/ and list them here.
 * While the list is empty the strip is not rendered.
 */
const CLIENT_LOGOS: { src: string; alt: string }[] = [
  // { src: '/judgment-audit/clients/cliente.svg', alt: 'Cliente' },
];

export function Projects() {
  const t = useTranslations('JudgmentAudit.projects');
  const items = t.raw('items') as Project[];

  return (
    <Section id="proyectos" surface>
      <SectionHead eyebrow={t('eyebrow')} title={t.rich('title', { muted: (c) => <Muted>{c}</Muted> })} />
      <Grid min={320}>
        {items.map((p, i) => (
          <article key={p.name} className="abra-card ja-project abra-reveal">
            <div className="ja-graphic ja-project__graphic">{PROJECT_GRAPHICS[i]}</div>
            <div className="ja-project__body">
              <Label>{p.area}</Label>
              <h3 className="abra-h3">{p.name}</h3>
              <p className="abra-text">{p.what}</p>
            </div>
            <p className="ja-project__result">
              <span className="sr-only">{t('helpLabel')}: </span>
              {p.help}
            </p>
          </article>
        ))}
      </Grid>
      {CLIENT_LOGOS.length > 0 ? (
        <div className="ja-clients">
          <Eyebrow tone="muted">{t('clientsLabel')}</Eyebrow>
          <Grid min={160}>
            {CLIENT_LOGOS.map((logo) => (
              <div key={logo.src} className="ja-logo-slot">
                <Image src={logo.src} alt={logo.alt} width={160} height={48} />
              </div>
            ))}
          </Grid>
        </div>
      ) : null}
    </Section>
  );
}
