import Link from 'next/link';
import type { ReactNode } from 'react';

type Tone = 'aqua' | 'muted' | 'deep';

export function Eyebrow({ children, tone = 'aqua' }: { children: ReactNode; tone?: Tone }) {
  const toneClass = tone === 'aqua' ? '' : ` abra-eyebrow--${tone}`;
  return <p className={`abra-eyebrow${toneClass}`}>{children}</p>;
}

export function Label({ children, muted = false, className = '' }: { children: ReactNode; muted?: boolean; className?: string }) {
  return <p className={`abra-label${muted ? ' abra-label--muted' : ''} ${className}`.trim()}>{children}</p>;
}

/** Second phrase of a two-tone heading: light weight, dimmed. Use with `t.rich(key, { muted })`. */
export function Muted({ children }: { children: ReactNode }) {
  return <span className="abra-muted-text">{children}</span>;
}

/** Rich-text tag map for headings that use `<muted>…</muted>` in messages. */
export const mutedTag = { muted: (chunks: ReactNode) => <Muted>{chunks}</Muted> };

/** Eyebrow + two-tone heading (+ optional lead), revealed on scroll. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  className = '',
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`abra-section-head abra-reveal ${className}`.trim()}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="abra-h2">{title}</h2>
      {lead ? <p className="abra-lead">{lead}</p> : null}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  arrow = '→',
  external = false,
  download = false,
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  /** Trailing glyph; `false` hides it. */
  arrow?: string | false;
  external?: boolean;
  download?: boolean;
  className?: string;
}) {
  const classes = `abra-btn${variant === 'ghost' ? ' abra-btn--ghost' : ''} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <span className="abra-btn__arrow" aria-hidden="true">
          {arrow}
        </span>
      ) : null}
    </>
  );

  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(download ? { download: true } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export function Grid({ min = 240, children, className = '' }: { min?: number; children: ReactNode; className?: string }) {
  return (
    <div className={`abra-grid ${className}`.trim()} style={{ ['--abra-min' as string]: `min(${min}px, 100%)` }}>
      {children}
    </div>
  );
}
