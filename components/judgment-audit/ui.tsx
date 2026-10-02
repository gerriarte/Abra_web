import type { ReactNode } from 'react';

export { ButtonLink, Eyebrow, Grid, Label, Muted, SectionHead } from '@/components/shared/motion';

/** Section wrapper: full-bleed band with the shared 1280px container. */
export function Section({
  id,
  surface = false,
  children,
}: {
  id?: string;
  surface?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`ja-section${surface ? ' ja-section--surface' : ''}`}>
      <div className="ja-wrap">{children}</div>
    </section>
  );
}
