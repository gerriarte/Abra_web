'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import useOnScreen from '@/hooks/useOnScreen';
import { useGTM } from '@/hooks/useGTM';
import { contactSchema } from '@/lib/validation/contactSchema';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const { pushEvent } = useGTM();
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    country: '',
    phone: '',
    email: '',
    services: [] as string[],
    customMessage: '',
    date: '',
    time: '',
    privacyAccepted: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const nextStep = () => {
    // Validate current step before proceeding
    const stepErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName || formData.fullName.length < 2) stepErrors.fullName = "Name is too short";
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) stepErrors.email = "Invalid email";
      if (!formData.company) stepErrors.company = "Company is required";
      if (!formData.phone || formData.phone.length < 10) stepErrors.phone = "Invalid phone";
    } else if (currentStep === 2) {
      if (formData.services.length === 0) stepErrors.services = "Select at least one service";
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      nextStep();
      return;
    }

    setErrors({});
    setStatus(null);

    if (honeypot) return;

    // Final validation
    try {
      contactSchema.parse(formData);
    } catch (error: any) {
      if (error.errors) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
      return;
    }

    setSubmitted(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: t('form.success') });
        pushEvent('form_submit', {
          form_name: 'contact_form',
          form_status: 'success',
          services_selected: formData.services,
        });

        setFormData({
          fullName: '',
          company: '',
          country: '',
          phone: '',
          email: '',
          services: [],
          customMessage: '',
          date: '',
          time: '',
          privacyAccepted: false
        });
        setCurrentStep(1);
      } else {
        setStatus({ type: 'error', message: data.error || t('form.error') });
      }
    } catch (error) {
      setStatus({ type: 'error', message: t('form.error') });
    } finally {
      setSubmitted(false);
    }
  };

  const serviceOptions = [
    { id: 'branding', value: 'Branding Development', labels: { en: 'Branding Development', es: 'Desarrollo de Branding' } },
    { id: 'communications', value: 'Institutional Communications', labels: { en: 'Institutional Communications', es: 'Comunicaciones Institucionales' } },
    { id: 'marketing', value: 'Digital Marketing & Growth', labels: { en: 'Digital Marketing & Growth', es: 'Marketing Digital y Crecimiento' } },
    { id: 'web', value: 'Web Design & Development', labels: { en: 'Web Design & Development', es: 'Diseño y Desarrollo Web' } },
    { id: 'uxui', value: 'UX/UI Design', labels: { en: 'UX/UI Design', es: 'Diseño UX/UI' } },
    { id: 'analytics', value: 'Marketing Reports & Analytics', labels: { en: 'Marketing Reports & Analytics', es: 'Reporte y análisis de Marketing' } },
    { id: 'full', value: 'Full Service', labels: { en: 'Full Service', es: 'Servicio Completo' } },
  ];

  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div ref={ref} className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-light text-[#04213B] tracking-tight mb-6 transition-all duration-1000">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <div className="bg-[#FBFBFB] rounded-[40px] border border-gray-100 p-8 md:p-16 relative overflow-hidden">
            {/* Progress Bar */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 ${currentStep >= step ? 'bg-[#04213B] text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                    {currentStep > step ? <CheckCircle2 size={18} /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-px ml-4 transition-all duration-700 ${currentStep > step ? 'bg-[#04213B]' : 'bg-gray-100'
                      }`} />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />

              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Field label={t('form.fullName')} error={errors.fullName}>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={t('form.fullNamePlaceholder')}
                        className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-all"
                      />
                    </Field>
                    <Field label={t('form.company')} error={errors.company}>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={t('form.companyPlaceholder')}
                        className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-all"
                      />
                    </Field>
                    <Field label={t('form.email')} error={errors.email}>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t('form.emailPlaceholder')}
                        className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-all"
                      />
                    </Field>
                    <Field label={t('form.phone')} error={errors.phone}>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t('form.phonePlaceholder')}
                        className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-all"
                      />
                    </Field>
                  </div>
                </div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
                  <div className="space-y-6">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-4">
                      {t('form.interestedIn')}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {serviceOptions.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all cursor-pointer ${formData.services.includes(option.value)
                            ? 'bg-[#04213B] border-[#04213B] text-white shadow-xl shadow-[#04213B]/20'
                            : 'bg-white border-gray-100 text-gray-500 hover:border-accent/50'
                            }`}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={formData.services.includes(option.value)}
                            onChange={(e) => {
                              const newServices = e.target.checked
                                ? [...formData.services, option.value]
                                : formData.services.filter(s => s !== option.value);
                              setFormData({ ...formData, services: newServices });
                            }}
                          />
                          <span className="text-sm font-medium">{option.labels[locale as 'en' | 'es']}</span>
                        </label>
                      ))}
                    </div>
                    {errors.services && <p className="text-rose-500 text-xs mt-2">{errors.services}</p>}
                  </div>

                  <Field label={t('form.customMessage')}>
                    <textarea
                      value={formData.customMessage}
                      onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
                      placeholder={t('form.customMessagePlaceholder')}
                      rows={4}
                      className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-all resize-none"
                    />
                  </Field>
                </div>
              )}

              {/* Step 3: Schedule & Submit */}
              {currentStep === 3 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-10">
                  <div className="space-y-4">
                    <p className="text-gray-500 font-light leading-relaxed">
                      {locale === 'es'
                        ? 'Si deseas agendar una reunión de una vez, compártenos día y hora y nos contactaremos.'
                        : 'If you would like to schedule a meeting right away, please share a preferred day and time and we will get in touch.'}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Field label={t('form.date')}>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-all"
                      />
                    </Field>
                    <Field label={t('form.time')}>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-all"
                      />
                    </Field>
                  </div>

                  <div className="flex items-center gap-4 bg-white/50 p-6 rounded-3xl border border-gray-100">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={formData.privacyAccepted}
                      onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-200 accent-[#04213B]"
                    />
                    <label htmlFor="privacy" className="text-xs text-gray-400 font-light leading-relaxed">
                      {t('form.privacyText')} <a href="#" className="underline text-gray-600">{t('form.privacyPolicy')}</a>
                    </label>
                  </div>
                  {errors.privacyAccepted && <p className="text-rose-500 text-xs">{errors.privacyAccepted}</p>}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100/50">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#04213B] transition-all font-medium text-sm"
                  >
                    <ArrowLeft size={16} />
                    Atrás
                  </button>
                ) : <div />}

                <button
                  type={currentStep === 3 ? "submit" : "button"}
                  onClick={currentStep === 3 ? undefined : nextStep}
                  disabled={submitted}
                  className="flex items-center gap-3 px-10 py-4 rounded-full border border-[#04213B] text-[#04213B] hover:bg-[#04213B] hover:text-white transition-all duration-500 text-xs font-bold tracking-[0.2em] uppercase disabled:opacity-50 group"
                >
                  {submitted ? '...' : (currentStep === 3 ? (locale === 'es' ? 'Enviar' : 'Send') : (locale === 'es' ? 'Siguiente' : 'Next'))}
                  {currentStep < 3 && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </form>

            {/* Status Messages */}
            {status && (
              <div className={`mt-8 p-6 rounded-3xl border text-sm font-medium ${status.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'
                }`}>
                {status.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
        {label}
      </label>
      {children}
      {error && <p className="text-rose-500 text-xs font-light">{error}</p>}
    </div>
  );
}
