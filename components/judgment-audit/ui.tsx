import type { ReactNode } from 'react';

type Tone = 'aqua' | 'muted' | 'deep';

export function Eyebrow({ children, tone = 'aqua' }: { children: ReactNode; tone?: Tone }) {
  const toneClass = tone === 'aqua' ? '' : ` ja-eyebrow--${tone}`;
  return <p className={`ja-eyebrow${toneClass}`}>{children}</p>;
}

export function Label({ children, muted = false, className = '' }: { children: ReactNode; muted?: boolean; className?: string }) {
  return <p className={`ja-label${muted ? ' ja-label--muted' : ''} ${className}`.trim()}>{children}</p>;
}

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

/** Eyebrow + two-tone heading (+ optional lead), revealed on scroll. */
export function SectionHead({ eyebrow, title, lead }: { eyebrow: ReactNode; title: ReactNode; lead?: ReactNode }) {
  return (
    <div className="ja-section__head ja-reveal">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="ja-h2">{title}</h2>
      {lead ? <p className="ja-lead">{lead}</p> : null}
    </div>
  );
}

export function Muted({ children }: { children: ReactNode }) {
  return <span className="ja-muted-text">{children}</span>;
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  arrow?: boolean;
}) {
  return (
    <a href={href} className={`ja-btn${variant === 'ghost' ? ' ja-btn--ghost' : ''}`}>
      <span>{children}</span>
      {arrow ? (
        <span className="ja-btn__arrow" aria-hidden="true">
          →
        </span>
      ) : null}
    </a>
  );
}

export function Grid({ min = 240, children }: { min?: number; children: ReactNode }) {
  return (
    <div className="ja-grid" style={{ ['--ja-min' as string]: `min(${min}px, 100%)` }}>
      {children}
    </div>
  );
}
