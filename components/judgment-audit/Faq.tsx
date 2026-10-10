import { useTranslations } from 'next-intl';
import { Muted, Section, SectionHead } from './ui';

type Item = { q: string; a: string; list?: string[]; after?: string };

/** Native <details> accordion: keyboard and screen-reader support without client JS. */
export function Faq() {
  const t = useTranslations('JudgmentAudit.faq');
  const items = t.raw('items') as Item[];

  return (
    <Section id="preguntas" surface>
      <SectionHead eyebrow={t('eyebrow')} title={t.rich('title', { muted: (c) => <Muted>{c}</Muted> })} />
      <div className="ja-faq abra-reveal">
        {items.map((item) => (
          <details key={item.q} className="ja-faq__item">
            <summary className="ja-faq__q">
              <span>{item.q}</span>
              <span className="ja-faq__icon" aria-hidden="true" />
            </summary>
            <div className="ja-faq__a">
              <p className="abra-text">{item.a}</p>
              {item.list ? (
                <ol className="ja-faq__list">
                  {item.list.map((li) => (
                    <li key={li} className="abra-text">
                      {li}
                    </li>
                  ))}
                </ol>
              ) : null}
              {item.after ? <p className="abra-text">{item.after}</p> : null}
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
