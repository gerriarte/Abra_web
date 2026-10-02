import { useTranslations } from 'next-intl';
import { ButtonLink, Eyebrow } from '@/components/shared/motion';
import { CAL_BOOKING_URL } from '@/lib/links';
import ContactForm from './ContactForm';

/** Closing section: one CTA block, with the 3-step form below as the alternative. */
export default function Contact() {
  const t = useTranslations('home.closing');

  return (
    <section
      id="contact"
      className="relative border-t border-white/5 bg-[radial-gradient(circle_at_85%_10%,rgba(10,45,77,0.9)_0%,transparent_55%)] py-24 md:py-32"
    >
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <div className="abra-reveal mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h2 className="abra-h2">{t('title')}</h2>
          <p className="abra-lead">{t('body')}</p>
          <div className="abra-actions justify-center pt-2">
            <ButtonLink href={CAL_BOOKING_URL} external>
              {t('ctaPrimary')}
            </ButtonLink>
          </div>
          {/* TODO(ger): subir /public/A-BRA-Loop.pdf — el archivo no existe en el repo (el link ya estaba roto antes del rediseño). */}
          <a href="/A-BRA-Loop.pdf" download className="abra-link">
            {t('ctaPdf')}
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="abra-reveal mx-auto mt-20 max-w-4xl">
          <div className="mb-8 flex flex-col gap-3 text-center">
            <h3 className="abra-h3 text-2xl">{t('formTitle')}</h3>
            <p className="abra-text">{t('formLead')}</p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
