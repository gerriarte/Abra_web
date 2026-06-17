interface JsonLdProps {
  data: Record<string, any> | Array<Record<string, any>>;
}

/**
 * Inyecta schemas JSON-LD directamente en el HTML del servidor.
 *
 * Importante: se usa una etiqueta <script> plana (Server Component) en lugar de
 * next/script. next/script es un Client Component y en el App Router inyecta el
 * contenido tras la hidratación (queda solo en el payload RSC, no en el HTML
 * inicial), lo que muchos crawlers y validadores de datos estructurados no leen.
 */
export default function JsonLd({ data }: JsonLdProps) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
