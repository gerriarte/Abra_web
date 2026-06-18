'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import { ArrowRight, ArrowLeft, CheckCircle2, CalendarClock } from 'lucide-react';
import { SectionFlowLine } from '@/components/ui/SectionFlowLine';
import { CAL_BOOKING_URL } from '@/lib/links';

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    services: [] as string[],
    customMessage: '',
    date: '',
    time: '',
    privacyAccepted: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const nextStep = () => {
    const stepErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.fullName) stepErrors.fullName = "Required";
      if (!formData.email) stepErrors.email = "Required";
    }
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const serviceOptions = [
    { id: 'branding', labels: { en: 'Data-Driven Branding', es: 'Branding con base en datos' } },
    { id: 'communications', labels: { en: 'Conversion-Focused Communication', es: 'Comunicación con foco en conversión' } },
    { id: 'marketing', labels: { en: 'Growth Marketing & AI', es: 'Growth Marketing con IA aplicada' } },
    { id: 'web', labels: { en: 'Product & Web Development', es: 'Producto y desarrollo web' } },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      nextStep();
      return;
    }
    setSubmitted(true);
    // Mock submit for now
    setTimeout(() => {
      setSubmitted(false);
      setStatus({ type: 'success', message: t('form.success') });
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-balance mb-6">{t('title')}</h2>
            <p className="text-text-secondary font-light max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href={CAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-background hover:bg-white/90"
              >
                <CalendarClock size={16} />
                {t('scheduleDirect')}
              </a>
            </div>
            <p className="mt-4 text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">
              {t('scheduleOrForm')}
            </p>
            <SectionFlowLine className="mt-10" variant="short" />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-16 backdrop-blur-xl relative overflow-hidden">
            {/* Progress Bar */}
            <div className="flex items-center justify-center gap-4 mb-16">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono transition-all duration-500 ${
                    currentStep >= step ? 'bg-primary text-background' : 'bg-white/5 text-text-muted border border-white/10'
                  }`}>
                    {currentStep > step ? <CheckCircle2 size={18} /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-px ml-4 ${currentStep > step ? 'bg-primary' : 'bg-white/10'}`} />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {currentStep === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Field label={t('form.fullName')} error={errors.fullName}>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={t('form.fullNamePlaceholder')}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none text-text-primary transition-all"
                    />
                  </Field>
                  <Field label={t('form.email')} error={errors.email}>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('form.emailPlaceholder')}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none text-text-primary transition-all"
                    />
                  </Field>
                  <Field label={t('form.company')}>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={t('form.companyPlaceholder')}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none text-text-primary transition-all"
                    />
                  </Field>
                  <Field label={t('form.phone')}>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t('form.phonePlaceholder')}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none text-text-primary transition-all"
                    />
                  </Field>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {serviceOptions.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center gap-4 px-6 py-5 rounded-2xl border transition-all cursor-pointer ${
                            formData.services.includes(option.labels[locale as 'en' | 'es'])
                            ? 'bg-primary border-primary text-background'
                            : 'bg-white/5 border-white/10 text-text-secondary hover:border-primary/50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={formData.services.includes(option.labels[locale as 'en' | 'es'])}
                            onChange={(e) => {
                              const label = option.labels[locale as 'en' | 'es'];
                              const newServices = e.target.checked
                                ? [...formData.services, label]
                                : formData.services.filter(s => s !== label);
                              setFormData({ ...formData, services: newServices });
                            }}
                          />
                          <span className="text-sm font-medium">{option.labels[locale as 'en' | 'es']}</span>
                        </label>
                      ))}
                    </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Field label={t('form.date')}>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none text-text-primary transition-all"
                      />
                    </Field>
                    <Field label={t('form.time')}>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none text-text-primary transition-all"
                      />
                    </Field>
                  </div>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-8 border-t border-white/5">
                {currentStep > 1 ? (
                  <button type="button" onClick={prevStep} className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors font-mono text-xs uppercase tracking-widest">
                    <ArrowLeft size={16} /> {locale === 'es' ? 'Atrás' : 'Back'}
                  </button>
                ) : <div />}

                <button
                  type={currentStep === 3 ? "submit" : "button"}
                  onClick={currentStep === 3 ? undefined : nextStep}
                  disabled={submitted}
                  className="flex items-center gap-3 px-10 py-4 bg-primary text-background rounded-full font-bold text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-all group disabled:opacity-50"
                >
                  {submitted ? '...' : (currentStep === 3 ? (locale === 'es' ? 'Enviar' : 'Send') : (locale === 'es' ? 'Siguiente' : 'Next'))}
                  {currentStep < 3 && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </form>

            {status && (
              <div className="mt-8 p-6 rounded-3xl bg-primary/10 border border-primary/20 text-primary text-sm text-center font-mono">
                {status.message}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">
        {label}
      </label>
      {children}
      {error && <p className="text-warning text-[10px] font-mono uppercase">{error}</p>}
    </div>
  );
}
