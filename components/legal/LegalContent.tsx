import type { LegalDocument } from '@/content/legal';

/**
 * Renderiza un documento legal (Política de Privacidad / Términos de Servicio)
 * con el estilo del sitio. Server component puro, sin estado.
 */
export default function LegalContent({ doc }: { doc: LegalDocument }) {
  return (
    <section className="relative z-10">
      <div className="container mx-auto px-4 max-w-3xl pt-32 pb-24 md:pt-40 md:pb-32">
        {/* Encabezado */}
        <header className="mb-16 md:mb-20">
          {doc.intro && (
            <p className="text-[10px] font-bold text-primary mb-5 tracking-[0.3em] uppercase">
              {doc.intro}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl font-light text-text-primary leading-tight text-balance">
            {doc.title}
          </h1>
          <p className="mt-5 text-xs text-text-muted font-light uppercase tracking-widest">
            {doc.updatedLabel}: {doc.updated}
          </p>
        </header>

        {/* Secciones */}
        <div className="space-y-12 md:space-y-14">
          {doc.sections.map((section) => (
            <article key={section.heading} className="space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-text-primary tracking-tight">
                {section.heading}
              </h2>
              {section.blocks.map((block, i) =>
                block.type === 'p' ? (
                  <p
                    key={i}
                    className="text-sm md:text-base text-text-secondary font-light leading-relaxed"
                  >
                    {block.text}
                  </p>
                ) : (
                  <ul key={i} className="space-y-2.5 pl-1">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex gap-3 text-sm md:text-base text-text-secondary font-light leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary shadow-[0_0_8px_rgba(0,122,255,0.5)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
