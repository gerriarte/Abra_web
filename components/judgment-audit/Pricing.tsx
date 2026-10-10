import { useTranslations } from 'next-intl';
import { ButtonLink, Label, Muted, Section, SectionHead } from './ui';

type PlanRow = { label: string; values: string[]; highlight?: boolean };
type DeliverableRow = { name: string; full: boolean; express: boolean };

export function Pricing() {
  const t = useTranslations('JudgmentAudit.pricing');
  const plans = t.raw('plans') as string[];
  const planRows = t.raw('planRows') as PlanRow[];
  const head = t.raw('deliverablesHead') as string[];
  const deliverables = t.raw('deliverables') as DeliverableRow[];

  const mark = (on: boolean) => (
    <>
      <span aria-hidden="true" className={on ? 'ja-check' : 'ja-dash'}>
        {on ? '✓' : '—'}
      </span>
      <span className="sr-only">{on ? t('included') : t('notIncluded')}</span>
    </>
  );

  return (
    <Section id="inversion" surface>
      <SectionHead eyebrow={t('eyebrow')} title={t.rich('title', { muted: (c) => <Muted>{c}</Muted> })} />

      {/* Below 640px each row stacks into a card; data-label carries the plan name. */}
      <div className="ja-table-wrap abra-reveal">
        <table className="ja-table ja-table--plans">
          <caption className="sr-only">{t('plansCaption')}</caption>
          <thead>
            <tr>
              <td />
              {plans.map((plan) => (
                <th key={plan} scope="col">
                  {plan}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {planRows.map((row) => (
              <tr key={row.label} className={row.highlight ? 'ja-table__row--highlight' : undefined}>
                <th scope="row">{row.label}</th>
                {row.values.map((value, i) => (
                  <td key={plans[i]} data-label={plans[i]}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ja-table-wrap abra-reveal">
        <table className="ja-table ja-table--matrix">
          <caption className="sr-only">{t('deliverablesCaption')}</caption>
          <thead>
            <tr>
              {head.map((cell) => (
                <th key={cell} scope="col">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {deliverables.map((row) => (
              <tr key={row.name}>
                <th scope="row">{row.name}</th>
                <td>{mark(row.full)}</td>
                <td>{mark(row.express)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="ja-note">{t('note')}</p>

      <div className="abra-card abra-card--accent ja-guarantee abra-reveal">
        <div className="ja-stack">
          <Label>{t('guarantee.label')}</Label>
          <p className="ja-guarantee__body">{t('guarantee.body')}</p>
        </div>
        <ButtonLink href="#agendar">{t('cta')}</ButtonLink>
      </div>
    </Section>
  );
}
