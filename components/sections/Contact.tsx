'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import useOnScreen from '@/hooks/useOnScreen';
import { useGTM } from '@/hooks/useGTM';
import { contactSchema } from '@/lib/validation/contactSchema';

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const { pushEvent } = useGTM();
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
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
  const [honeypot, setHoneypot] = useState(''); // Honeypot field para spam
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setStatus(null);
    
    // Honeypot check - si este campo tiene valor, es bot
    if (honeypot) {
      console.log('Bot detected via honeypot');
      return;
    }
    
    // Client-side validation
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
        
        // Track form submission success in GTM
        pushEvent('form_submit', {
          form_name: 'contact_form',
          form_status: 'success',
          services_selected: formData.services,
          services_count: formData.services.length,
          page_location: typeof window !== 'undefined' ? window.location.href : '',
        });
        
        // Reset form
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
        setErrors({});
      } else {
        if (response.status === 429) {
          setStatus({ type: 'error', message: t('form.rateLimitError') || 'Demasiadas solicitudes. Por favor espera unos minutos.' });
        } else if (response.status === 503) {
          // Service unavailable - email not configured
          setStatus({ 
            type: 'error', 
            message: data.error || 'El servicio de correo no está disponible. Por favor, contáctanos directamente por WhatsApp usando el botón flotante.' 
          });
        } else {
          // Track form submission error in GTM
          pushEvent('form_submit', {
            form_name: 'contact_form',
            form_status: 'error',
            error_type: response.status.toString(),
            services_selected: formData.services,
            page_location: typeof window !== 'undefined' ? window.location.href : '',
          });
          
          setStatus({ 
            type: 'error', 
            message: data.error || t('form.error') || 'Error al enviar el formulario. Por favor intenta nuevamente o contáctanos por WhatsApp.' 
          });
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({ type: 'error', message: t('form.error') || 'Error sending form. Please try again.' });
    } finally {
      setSubmitted(false);
    }
  };

  const serviceOptions = [
    {
      id: 'branding',
      value: 'Branding Development',
      labels: {
        en: 'Branding Development',
        es: 'Desarrollo de Branding',
      },
    },
    {
      id: 'communications',
      value: 'Institutional Communications',
      labels: {
        en: 'Institutional Communications',
        es: 'Comunicaciones Institucionales',
      },
    },
    {
      id: 'marketing',
      value: 'Digital Marketing & Growth',
      labels: {
        en: 'Digital Marketing & Growth',
        es: 'Marketing Digital y Crecimiento',
      },
    },
    {
      id: 'web',
      value: 'Web Design & Development',
      labels: {
        en: 'Web Design & Development',
        es: 'Diseño y Desarrollo Web',
      },
    },
    {
      id: 'uxui',
      value: 'UX/UI Design',
      labels: {
        en: 'UX/UI Design',
        es: 'Diseño UX/UI',
      },
    },
    {
      id: 'analytics',
      value: 'Marketing Reports & Analytics',
      labels: {
        en: 'Marketing Reports & Analytics',
        es: 'Reporte y análisis de Marketing',
      },
    },
    {
      id: 'full',
      value: 'Full Service',
      labels: {
        en: 'Full Service',
        es: 'Servicio Completo',
      },
    },
  ] as const;

  return (
    <section id="contact" className="py-12 md:py-16 bg-off overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="max-w-5xl mx-auto w-full">
          {/* Section Title */}
          <div ref={ref} className="mb-8 md:mb-10 text-center">
            <h2 className={`text-3xl md:text-4xl font-light text-primary mb-3 md:mb-4 tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t('title')}
            </h2>
            <p className={`text-base md:text-lg text-text-secondary font-light max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {t('subtitle')}
            </p>
          </div>

          {status && (
            <div
              aria-live="assertive"
              className={`mb-4 rounded-xl border px-4 py-3 text-sm font-light transition-all duration-500 max-w-3xl mx-auto ${
                status.type === 'success'
                  ? 'border-emerald-200/50 bg-emerald-50/80 text-emerald-800 shadow-sm shadow-emerald-100/50'
                  : 'border-rose-200/50 bg-rose-50/80 text-rose-800 shadow-sm shadow-rose-100/50'
              }`}
            >
              {status.message}
            </div>
          )}

          {/* Contact Form - Compact Layout */}
          <div className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="bg-white/90 rounded-2xl border border-primary-light/15 shadow-sm shadow-primary-light/10 p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6" noValidate>
                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Personal Information Section - Compact Grid */}
                  <div className="space-y-4 pb-4 border-b border-primary-light/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs text-text-muted/70 mb-1.5 font-light uppercase tracking-wide">
                          {t('form.fullName')} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => {
                            setFormData({ ...formData, fullName: e.target.value });
                            if (errors.fullName) setErrors({ ...errors, fullName: '' });
                          }}
                          className={`w-full bg-transparent border border-primary-light/20 rounded-lg focus:border-accent focus:outline-none px-3 py-2 text-sm font-light text-primary transition-all duration-300 ${
                            errors.fullName ? 'border-rose-400 bg-rose-50/50' : 'hover:border-accent/50'
                          }`}
                          placeholder={t('form.fullNamePlaceholder')}
                          minLength={2}
                          maxLength={100}
                          pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                        />
                        {errors.fullName && (
                          <p className="text-rose-500 text-xs mt-1 font-light">{errors.fullName}</p>
                        )}
                      </div>

                      {/* Company Name */}
                      <div>
                        <label className="block text-xs text-text-muted/70 mb-1.5 font-light uppercase tracking-wide">
                          {t('form.company')} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => {
                            setFormData({ ...formData, company: e.target.value });
                            if (errors.company) setErrors({ ...errors, company: '' });
                          }}
                          className={`w-full bg-transparent border border-primary-light/20 rounded-lg focus:border-accent focus:outline-none px-3 py-2 text-sm font-light text-primary transition-all duration-300 ${
                            errors.company ? 'border-rose-400 bg-rose-50/50' : 'hover:border-accent/50'
                          }`}
                          placeholder={t('form.companyPlaceholder')}
                          maxLength={100}
                        />
                        {errors.company && (
                          <p className="text-rose-500 text-xs mt-1 font-light">{errors.company}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs text-text-muted/70 mb-1.5 font-light uppercase tracking-wide">
                          {t('form.email')} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: '' });
                          }}
                          className={`w-full bg-transparent border border-primary-light/20 rounded-lg focus:border-accent focus:outline-none px-3 py-2 text-sm font-light text-primary transition-all duration-300 ${
                            errors.email ? 'border-rose-400 bg-rose-50/50' : 'hover:border-accent/50'
                          }`}
                          placeholder={t('form.emailPlaceholder')}
                          maxLength={100}
                        />
                        {errors.email && (
                          <p className="text-rose-500 text-xs mt-1 font-light">{errors.email}</p>
                        )}
                      </div>

                      {/* Country */}
                      <div>
                        <label className="block text-xs text-text-muted/70 mb-1.5 font-light uppercase tracking-wide">
                          {t('form.country')}
                        </label>
                        <input
                          type="text"
                          value={formData.country}
                          onChange={(e) => {
                            setFormData({ ...formData, country: e.target.value });
                            if (errors.country) setErrors({ ...errors, country: '' });
                          }}
                          className={`w-full bg-transparent border border-primary-light/20 rounded-lg focus:border-accent focus:outline-none px-3 py-2 text-sm font-light text-primary transition-all duration-300 ${
                            errors.country ? 'border-rose-400 bg-rose-50/50' : 'hover:border-accent/50'
                          }`}
                          placeholder={t('form.countryPlaceholder')}
                          maxLength={60}
                          aria-label={t('form.country')}
                        />
                        {errors.country && (
                          <p className="text-rose-500 text-xs mt-1 font-light">{errors.country}</p>
                        )}
                      </div>
                      
                      {/* Phone */}
                      <div>
                        <label className="block text-xs text-text-muted/70 mb-1.5 font-light uppercase tracking-wide">
                          {t('form.phone')} *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: '' });
                          }}
                          className={`w-full bg-transparent border border-primary-light/20 rounded-lg focus:border-accent focus:outline-none px-3 py-2 text-sm font-light text-primary transition-all duration-300 ${
                            errors.phone ? 'border-rose-400 bg-rose-50/50' : 'hover:border-accent/50'
                          }`}
                          placeholder={t('form.phonePlaceholder')}
                          minLength={10}
                          maxLength={15}
                          pattern="^[\d\s\-\(\)]+$"
                          aria-label={t('form.phone')}
                        />
                        {errors.phone && (
                          <p className="text-rose-500 text-xs mt-1 font-light">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Service Selection Section - Compact Grid */}
                  <div className="space-y-3 pb-4 border-b border-primary-light/10">
                    <h3 className="text-xs uppercase tracking-[0.15em] text-accent font-light mb-3">
                      {t('form.interestedIn')}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {serviceOptions.map((option) => {
                        const isSelected = formData.services.includes(option.value);
                        return (
                          <label
                            key={option.id}
                            className={`flex items-center gap-2.5 px-3 py-2 border rounded-lg transition-all duration-300 font-light text-xs cursor-pointer ${
                              isSelected
                                ? 'border-accent bg-accent/10 text-primary shadow-sm shadow-accent/10' 
                                : 'border-primary-light/20 bg-transparent text-text-secondary hover:border-accent/50 hover:bg-accent/5'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                const newServices = e.target.checked
                                  ? [...formData.services, option.value]
                                  : formData.services.filter(s => s !== option.value);
                                setFormData({ ...formData, services: newServices });
                                if (errors.services) setErrors({ ...errors, services: '' });
                              }}
                              className="w-4 h-4 border-2 border-primary-light/30 rounded focus:ring-2 focus:ring-accent/30 cursor-pointer accent-accent transition-all duration-300 flex-shrink-0"
                            />
                            <span className="flex-1 leading-tight">{option.labels[locale as 'en' | 'es']}</span>
                          </label>
                        );
                      })}
                    </div>
                    {errors.services && (
                      <p className="text-rose-500 text-xs mt-1.5 font-light">{errors.services}</p>
                    )}
                  </div>

                  {/* Custom Message & Availability - Side by Side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4 border-b border-primary-light/10">
                    {/* Custom Message Section */}
                    <div>
                      <label className="block text-xs text-text-muted/70 mb-1.5 font-light uppercase tracking-wide">
                        {t('form.customMessage') || 'Consulta Personalizada'} <span className="text-text-muted/50 normal-case">({t('form.optional') || 'Opcional'})</span>
                      </label>
                      <textarea
                        value={formData.customMessage}
                        onChange={(e) => {
                          setFormData({ ...formData, customMessage: e.target.value });
                          if (errors.customMessage) setErrors({ ...errors, customMessage: '' });
                        }}
                        rows={4}
                        maxLength={1000}
                        className={`w-full bg-transparent border border-primary-light/20 rounded-lg focus:border-accent focus:outline-none px-3 py-2 text-sm font-light text-primary transition-all duration-300 resize-none ${
                          errors.customMessage ? 'border-rose-400 bg-rose-50/50' : 'hover:border-accent/50'
                        }`}
                        placeholder={t('form.customMessagePlaceholder') || 'Describe tu proyecto, objetivos, presupuesto...'}
                      />
                      <p className="text-xs text-text-muted/60 mt-1 font-light">
                        {formData.customMessage.length}/1000
                      </p>
                      {errors.customMessage && (
                        <p className="text-rose-500 text-xs mt-1 font-light">{errors.customMessage}</p>
                      )}
                    </div>

                    {/* Schedule Section */}
                    <div>
                      <label className="block text-xs text-text-muted/70 mb-1.5 font-light uppercase tracking-wide">
                        {t('form.availability') || 'Disponibilidad'} <span className="text-text-muted/50 normal-case">({t('form.optional') || 'Opcional'})</span>
                      </label>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-text-muted/60 mb-1.5 font-light">
                            {t('form.date')}
                          </label>
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-transparent border border-primary-light/20 rounded-lg focus:border-accent focus:outline-none px-3 py-2 text-sm font-light text-primary transition-all duration-300 hover:border-accent/50"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-text-muted/60 mb-1.5 font-light">
                            {t('form.time')}
                          </label>
                          <input
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full bg-transparent border border-primary-light/20 rounded-lg focus:border-accent focus:outline-none px-3 py-2 text-sm font-light text-primary transition-all duration-300 hover:border-accent/50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Acceptance & Submit */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                    <div className="flex items-start gap-3 flex-1">
                      <input
                        type="checkbox"
                        required
                        id="privacy"
                        checked={formData.privacyAccepted}
                        onChange={(e) => {
                          setFormData({ ...formData, privacyAccepted: e.target.checked });
                          if (errors.privacyAccepted) setErrors({ ...errors, privacyAccepted: '' });
                        }}
                        className="mt-0.5 w-4 h-4 border-2 border-primary-light/30 rounded focus:ring-2 focus:ring-accent/30 cursor-pointer accent-accent transition-all duration-300 flex-shrink-0"
                      />
                      <label htmlFor="privacy" className="text-xs text-text-secondary font-light leading-relaxed cursor-pointer">
                        {t('form.privacyText')}{' '}
                        <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent underline transition-colors">
                          {t('form.privacyPolicy')}
                        </a>
                        {' '}{t('form.and')}{' '}
                        <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent underline transition-colors">
                          {t('form.terms')}
                        </a>
                      </label>
                    </div>
                    {errors.privacyAccepted && (
                      <p className="text-rose-500 text-xs font-light">{errors.privacyAccepted}</p>
                    )}
                    <button
                      type="submit"
                      disabled={submitted}
                      className="px-6 py-2.5 bg-primary text-white hover:bg-accent active:bg-accent-dark transition-all duration-300 rounded-lg font-light text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md disabled:hover:shadow-sm whitespace-nowrap"
                    >
                      {submitted ? t('form.submitting') : t('form.submit')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}

