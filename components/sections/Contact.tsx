'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import useOnScreen from '@/hooks/useOnScreen';
import { contactSchema } from '@/lib/validation/contactSchema';

export default function Contact() {
  const t = useTranslations('contact');
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    phoneCode: '+1',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
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
        alert(t('form.success'));
        // Reset form
        setFormData({
          fullName: '',
          company: '',
          phoneCode: '+1',
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
          alert(t('form.rateLimitError') || 'Too many requests. Please wait a few minutes.');
        } else {
          alert(data.error || t('form.error') || 'Error sending form. Please try again.');
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Error sending form. Please try again.');
    } finally {
      setSubmitted(false);
    }
  };

  const countryCodes = [
    { code: '+1', country: 'US/Canada' },
    { code: '+52', country: 'México' },
    { code: '+34', country: 'España' },
    { code: '+44', country: 'UK' },
    { code: '+54', country: 'Argentina' },
    { code: '+51', country: 'Perú' },
    { code: '+56', country: 'Chile' },
  ];

  const services = [
    'Branding Development',
    'Institutional Communications',
    'Digital Marketing & Growth',
    'Web Design & Development',
    'Full Service',
  ];

  return (
    <section id="contact" className="py-32 bg-off">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div ref={ref} className="mb-12 text-center">
            <h2 className={`text-4xl md:text-5xl font-light text-primary mb-4 tracking-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t('title')}
            </h2>
            <p className={`text-lg text-text-secondary font-light transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {t('subtitle')}
            </p>
          </div>

          {/* Contact Form - Minimalist Design */}
          <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Left: Form Fields */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12" noValidate>
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
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  className={`w-full bg-transparent border-0 border-b border-text-muted/40 focus:border-primary focus:outline-none py-2 text-sm md:text-base font-light text-primary ${
                    errors.fullName ? 'border-red-500' : ''
                  }`}
                  placeholder={t('form.fullNamePlaceholder')}
                  minLength={2}
                  maxLength={100}
                  pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1 font-light">{errors.fullName}</p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => {
                    setFormData({ ...formData, company: e.target.value });
                    if (errors.company) setErrors({ ...errors, company: '' });
                  }}
                  className={`w-full bg-transparent border-0 border-b border-text-muted/40 focus:border-primary focus:outline-none py-2 text-sm md:text-base font-light text-primary ${
                    errors.company ? 'border-red-500' : ''
                  }`}
                  placeholder={t('form.companyPlaceholder')}
                  maxLength={100}
                />
                {errors.company && (
                  <p className="text-red-500 text-xs mt-1 font-light">{errors.company}</p>
                )}
              </div>

              {/* Email and Phone - Side by Side */}
              <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline space-y-4 md:space-y-0">
                <div className="flex-1">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full bg-transparent border-0 border-b border-text-muted/40 focus:border-primary focus:outline-none py-2 text-base md:text-base text-sm font-light text-primary ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder={t('form.emailPlaceholder')}
                    maxLength={100}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 font-light">{errors.email}</p>
                  )}
                </div>
                <span className="hidden md:inline text-text-muted/60 font-light text-sm">or</span>
                <div className="flex-1 md:flex-none md:w-auto">
                  <div className="flex items-center gap-2 border-b border-text-muted/40 focus-within:border-primary">
                    <span className="text-primary font-light pb-2">+</span>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        // Restrict to digits only
                        const value = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, phone: value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      className={`flex-1 bg-transparent border-0 focus:outline-none py-2 text-base md:text-base text-sm font-light text-primary ${
                        errors.phone ? 'border-red-500' : ''
                      }`}
                      placeholder={t('form.phonePlaceholder')}
                      minLength={10}
                      maxLength={15}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 font-light">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <p className="text-sm md:text-base font-light text-primary mb-3 md:mb-4">{t('form.service')}:</p>
                <div className="flex flex-wrap gap-2">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, service });
                        if (errors.service) setErrors({ ...errors, service: '' });
                      }}
                      className={`px-3 py-2 border border-text-muted/40 hover:border-primary hover:bg-primary/5 transition-all duration-200 font-light text-xs md:text-sm ${
                        formData.service === service 
                          ? 'border-primary bg-primary/10' 
                          : 'bg-transparent'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
                {errors.service && (
                  <p className="text-red-500 text-xs mt-1 font-light">{errors.service}</p>
                )}
              </div>

              {/* Date and Time */}
              <div className="flex flex-col md:flex-row gap-4 items-baseline">
                <div className="flex-1 w-full">
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-transparent border-0 border-b border-text-muted/40 focus:border-primary focus:outline-none py-2 text-base md:text-base text-sm font-light text-primary"
                  />
                </div>
                <span className="hidden md:inline text-text-muted/60 font-light text-sm">at</span>
                <div className="flex-1 w-full">
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-text-muted/40 focus:border-primary focus:outline-none py-2 text-base md:text-base text-sm font-light text-primary"
                  />
                </div>
              </div>

              {/* Privacy Acceptance */}
              <div className="flex items-start gap-3 pt-4">
                <input
                  type="checkbox"
                  required
                  id="privacy"
                  checked={formData.privacyAccepted}
                  onChange={(e) => {
                    setFormData({ ...formData, privacyAccepted: e.target.checked });
                    if (errors.privacyAccepted) setErrors({ ...errors, privacyAccepted: '' });
                  }}
                  className="mt-1 w-5 h-5 border-2 border-text-muted/60 rounded focus:ring-2 focus:ring-primary cursor-pointer accent-primary"
                />
                <label htmlFor="privacy" className="text-sm text-text-secondary font-light leading-relaxed cursor-pointer">
                  {t('form.privacyText')}{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-light underline">
                    {t('form.privacyPolicy')}
                  </a>
                  {' ' + t('form.and') + ' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-light underline">
                    {t('form.terms')}
                  </a>
                </label>
                {errors.privacyAccepted && (
                  <p className="text-red-500 text-xs mt-1 font-light">{errors.privacyAccepted}</p>
                )}
              </div>

              {/* Submit Button - Circular */}
              <div className="flex justify-center md:justify-end pt-6 md:pt-8">
                <button
                  type="submit"
                  disabled={submitted}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center font-light text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitted ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Social & Locations */}
          <div className="lg:col-span-2 space-y-8 md:space-y-12 pt-6 md:pt-8">
            {/* Locations */}
            <div>
              <h3 className="text-xs font-light text-text-muted mb-6 tracking-wider uppercase">
                {t('form.locations')}
              </h3>
              <div className="space-y-4">
                <p className="text-primary font-light">Argentina</p>
                <p className="text-primary font-light">Colombia</p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xs font-light text-text-muted mb-6 tracking-wider uppercase">
                {t('form.connect')}
              </h3>
              <div className="space-y-4">
                <a 
                  href="https://linkedin.com/company/abra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-light transition-colors font-light flex items-center gap-2"
                >
                  LinkedIn →
                </a>
                <a 
                  href="https://instagram.com/abra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-light transition-colors font-light flex items-center gap-2"
                >
                  Instagram →
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

