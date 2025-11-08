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
    service: '',
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
          service_selected: formData.service,
          page_location: typeof window !== 'undefined' ? window.location.href : '',
        });
        
        // Reset form
        setFormData({
          fullName: '',
          company: '',
          country: '',
          phone: '',
          email: '',
          service: '',
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
            service_selected: formData.service,
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
      id: 'full',
      value: 'Full Service',
      labels: {
        en: 'Full Service',
        es: 'Servicio Completo',
      },
    },
  ] as const;

  return (
    <section id="contact" className="py-20 bg-off">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div ref={ref} className="mb-16 text-center">
            <h2 className={`text-4xl md:text-5xl font-light text-primary mb-6 tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t('title')}
            </h2>
            <p className={`text-lg md:text-xl text-text-secondary font-light max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {t('subtitle')}
            </p>
          </div>

          {status && (
            <div
              aria-live="assertive"
              className={`mb-8 rounded-3xl border px-6 py-4 text-sm font-light transition-all duration-500 max-w-3xl mx-auto ${
                status.type === 'success'
                  ? 'border-emerald-200/50 bg-emerald-50/80 text-emerald-800 shadow-sm shadow-emerald-100/50'
                  : 'border-rose-200/50 bg-rose-50/80 text-rose-800 shadow-sm shadow-rose-100/50'
              }`}
            >
              {status.message}
            </div>
          )}

          {/* Contact Form - Structured Layout */}
          <div className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="bg-white/90 rounded-3xl border border-primary-light/15 shadow-sm shadow-primary-light/10 p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-8" noValidate>
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

                  {/* Personal Information Section */}
                  <div className="space-y-6 pb-6 border-b border-primary-light/10">
                    <h3 className="text-sm uppercase tracking-[0.2em] text-primary-light/70 font-light mb-4">
                      Información Personal
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs text-text-muted/70 mb-2 font-light uppercase tracking-wide">
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
                          className={`w-full bg-transparent border border-primary-light/20 rounded-lg focus:border-primary focus:outline-none px-4 py-3 text-base font-light text-primary transition-all duration-300 ${
                            errors.fullName ? 'border-rose-400 bg-rose-50/50' : 'hover:border-primary-light/40'
                          }`}
                          placeholder={t('form.fullNamePlaceholder')}
                          minLength={2}
                          maxLength={100}
                          pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                        />
                        {errors.fullName && (
                          <p className="text-rose-500 text-xs mt-2 font-light">{errors.fullName}</p>
                        )}
                      </div>

                      {/* Company Name */}
                      <div>
                        <label className="block text-xs text-text-muted/70 mb-2 font-light uppercase tracking-wide">
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
                          className={`w-full bg-transparent border border-primary-light/20 rounded-lg focus:border-primary focus:outline-none px-4 py-3 text-base font-light text-primary transition-all duration-300 ${
                            errors.company ? 'border-rose-400 bg-rose-50/50' : 'hover:border-primary-light/40'
                          }`}
                          placeholder={t('form.companyPlaceholder')}
                          maxLength={100}
                        />
                        {errors.company && (
                          <p className="text-rose-500 text-xs mt-2 font-light">{errors.company}</p>
                        )}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs text-text-muted/70 mb-2 font-light uppercase tracking-wide">
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
                          className={`w-full bg-transparent border border-primary-light/20 rounded-lg focus:border-primary focus:outline-none px-4 py-3 text-base font-light text-primary transition-all duration-300 ${
                            errors.email ? 'border-rose-400 bg-rose-50/50' : 'hover:border-primary-light/40'
                          }`}
                          placeholder={t('form.emailPlaceholder')}
                          maxLength={100}
                        />
                        {errors.email && (
                          <p className="text-rose-500 text-xs mt-2 font-light">{errors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-xs text-text-muted/70 mb-2 font-light uppercase tracking-wide">
                          {t('form.country')}
                        </label>
                        <input
                          type="text"
                          value={formData.country}
                          onChange={(e) => {
                            setFormData({ ...formData, country: e.target.value });
                            if (errors.country) setErrors({ ...errors, country: '' });
                          }}
                          className={`w-full bg-transparent border border-primary-light/20 rounded-lg focus:border-primary focus:outline-none px-4 py-3 text-base font-light text-primary transition-all duration-300 ${
                            errors.country ? 'border-rose-400 bg-rose-50/50' : 'hover:border-primary-light/40'
                          }`}
                          placeholder={t('form.countryPlaceholder')}
                          maxLength={60}
                          aria-label={t('form.country')}
                        />
                        {errors.country && (
                          <p className="text-rose-500 text-xs mt-2 font-light">{errors.country}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-xs text-text-muted/70 mb-2 font-light uppercase tracking-wide">
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
                          className={`w-full bg-transparent border border-primary-light/20 rounded-lg focus:border-primary focus:outline-none px-4 py-3 text-base font-light text-primary transition-all duration-300 ${
                            errors.phone ? 'border-rose-400 bg-rose-50/50' : 'hover:border-primary-light/40'
                          }`}
                          placeholder={t('form.phonePlaceholder')}
                          minLength={10}
                          maxLength={15}
                          pattern="^[\d\s\-\(\)]+$"
                          aria-label={t('form.phone')}
                        />
                        {errors.phone && (
                          <p className="text-rose-500 text-xs mt-2 font-light">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Service Selection Section */}
                  <div className="space-y-4 pb-6 border-b border-primary-light/10">
                    <h3 className="text-sm uppercase tracking-[0.2em] text-primary-light/70 font-light mb-4">
                      {t('form.interestedIn')}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {serviceOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, service: option.value });
                            if (errors.service) setErrors({ ...errors, service: '' });
                          }}
                          className={`px-4 py-3 border rounded-lg transition-all duration-300 font-light text-sm text-left ${
                            formData.service === option.value 
                              ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10' 
                              : 'border-primary-light/20 bg-transparent text-text-secondary hover:border-primary-light/40 hover:bg-primary/5'
                          }`}
                        >
                          {option.labels[locale as 'en' | 'es']}
                        </button>
                      ))}
                    </div>
                    {errors.service && (
                      <p className="text-rose-500 text-xs mt-2 font-light">{errors.service}</p>
                    )}
                  </div>

                  {/* Schedule Section */}
                  <div className="space-y-4 pb-6 border-b border-primary-light/10">
                    <h3 className="text-sm uppercase tracking-[0.2em] text-primary-light/70 font-light mb-4">
                      Disponibilidad
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs text-text-muted/70 mb-2 font-light uppercase tracking-wide">
                          {t('form.date')} *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-transparent border border-primary-light/20 rounded-lg focus:border-primary focus:outline-none px-4 py-3 text-base font-light text-primary transition-all duration-300 hover:border-primary-light/40"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-text-muted/70 mb-2 font-light uppercase tracking-wide">
                          {t('form.time')} *
                        </label>
                        <input
                          type="time"
                          required
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full bg-transparent border border-primary-light/20 rounded-lg focus:border-primary focus:outline-none px-4 py-3 text-base font-light text-primary transition-all duration-300 hover:border-primary-light/40"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Privacy Acceptance */}
                  <div className="flex items-start gap-4 pt-2">
                    <input
                      type="checkbox"
                      required
                      id="privacy"
                      checked={formData.privacyAccepted}
                      onChange={(e) => {
                        setFormData({ ...formData, privacyAccepted: e.target.checked });
                        if (errors.privacyAccepted) setErrors({ ...errors, privacyAccepted: '' });
                      }}
                      className="mt-1 w-5 h-5 border-2 border-primary-light/30 rounded focus:ring-2 focus:ring-primary/30 cursor-pointer accent-primary transition-all duration-300"
                    />
                    <label htmlFor="privacy" className="text-sm text-text-secondary font-light leading-relaxed cursor-pointer flex-1">
                      {t('form.privacyText')}{' '}
                      <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-light underline transition-colors">
                        {t('form.privacyPolicy')}
                      </a>
                      {' '}{t('form.and')}{' '}
                      <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-light underline transition-colors">
                        {t('form.terms')}
                      </a>
                    </label>
                  </div>
                  {errors.privacyAccepted && (
                    <p className="text-rose-500 text-xs mt-2 ml-9 font-light">{errors.privacyAccepted}</p>
                  )}

                  {/* Submit Button */}
                  <div className="flex justify-end pt-6">
                    <button
                      type="submit"
                      disabled={submitted}
                      className="px-8 py-4 bg-primary text-white hover:bg-primary-light active:bg-primary-dark transition-all duration-300 rounded-lg font-light text-base disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md disabled:hover:shadow-sm"
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

