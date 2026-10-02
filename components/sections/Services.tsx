import { useTranslations } from 'next-intl';
import { Label, SERVICE_ICONS, SectionHead, mutedTag } from '@/components/shared/motion';

type Service = { title: string; body: string; includes: string[] };

export default function Services() {
  const t = useTranslations('home.services');
  const services = t.raw('items') as Service[];

  return (
    <section id="services" className="relative border-t border-white/5 py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHead eyebrow={t('eyebrow')} title={t.rich('title', mutedTag)} lead={t('lead')} />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {services.map((service, i) => (
            <article key={service.title} className="abra-card abra-reveal gap-5 p-8 md:p-10">
              <div className="flex items-start justify-between gap-4">
                {SERVICE_ICONS[i]}
                <Label muted>{String(i + 1).padStart(2, '0')}</Label>
              </div>
              <h3 className="abra-h3 text-2xl md:text-[28px]">{service.title}</h3>
              <p className="abra-text abra-text--strong">{service.body}</p>
              <div className="mt-auto flex flex-col gap-3 border-t border-white/[0.08] pt-5">
                <Label muted>{t('includesLabel')}</Label>
                <ul className="flex flex-wrap gap-2">
                  {service.includes.map((item) => (
                    <li key={item} className="abra-pill">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
