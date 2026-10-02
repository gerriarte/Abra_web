'use client';

import { useId, useState, type FormEvent, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Check } from 'lucide-react';

const TOTAL_STEPS = 3;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RequiredField = 'fullName' | 'email';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const services = (useTranslations('home.services').raw('items') as { title: string }[]).map((s) => s.title);
  const uid = useId();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    services: [] as string[],
    date: '',
    time: '',
  });
  const [errors, setErrors] = useState<Partial<Record<RequiredField, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const id = (key: string) => `${uid}-${key}`;
  const update = (key: keyof typeof data, value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateStepOne = () => {
    const found: Partial<Record<RequiredField, string>> = {};
    if (!data.fullName.trim()) found.fullName = t('required');
    if (!data.email.trim()) found.email = t('required');
    else if (!EMAIL_RE.test(data.email.trim())) found.email = t('invalidEmail');
    setErrors(found);
    const first = (Object.keys(found) as RequiredField[])[0];
    if (first) document.getElementById(id(first))?.focus();
    return !first;
  };

  const next = () => {
    if (step === 1 && !validateStepOne()) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < TOTAL_STEPS) {
      next();
      return;
    }
    setSubmitting(true);
    // Submission is still mocked (as before the redesign): nothing is sent yet.
    setTimeout(() => {
      setSubmitting(false);
      setStatus(t('success'));
    }, 1500);
  };

  const toggleService = (label: string, checked: boolean) =>
    setData((d) => ({
      ...d,
      services: checked ? [...d.services, label] : d.services.filter((s) => s !== label),
    }));

  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-10 md:p-14">
      {/* Progress */}
      <div className="mb-12 flex items-center justify-center gap-3" aria-hidden="true">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((n) => (
          <div key={n} className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full font-mono text-sm transition-colors duration-500 ${
                step >= n ? 'bg-aqua text-profundo' : 'border border-white/15 bg-white/5 text-white/60'
              }`}
            >
              {step > n ? <Check size={18} /> : n}
            </div>
            {n < TOTAL_STEPS ? <div className={`h-px w-10 ${step > n ? 'bg-aqua' : 'bg-white/10'}`} /> : null}
          </div>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {t('step', { current: step, total: TOTAL_STEPS })}
      </p>

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-10">
        {step === 1 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field id={id('fullName')} label={t('fullName')} error={errors.fullName}>
              <input
                id={id('fullName')}
                type="text"
                autoComplete="name"
                value={data.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                placeholder={t('fullNamePlaceholder')}
                aria-invalid={errors.fullName ? true : undefined}
                aria-describedby={errors.fullName ? `${id('fullName')}-error` : undefined}
                className="abra-input"
              />
            </Field>
            <Field id={id('email')} label={t('email')} error={errors.email}>
              <input
                id={id('email')}
                type="email"
                autoComplete="email"
                value={data.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder={t('emailPlaceholder')}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? `${id('email')}-error` : undefined}
                className="abra-input"
              />
            </Field>
            <Field id={id('company')} label={t('company')}>
              <input
                id={id('company')}
                type="text"
                autoComplete="organization"
                value={data.company}
                onChange={(e) => update('company', e.target.value)}
                placeholder={t('companyPlaceholder')}
                className="abra-input"
              />
            </Field>
            <Field id={id('phone')} label={t('phone')}>
              <input
                id={id('phone')}
                type="tel"
                autoComplete="tel"
                value={data.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder={t('phonePlaceholder')}
                className="abra-input"
              />
            </Field>
          </div>
        ) : null}

        {step === 2 ? (
          <fieldset className="flex flex-col gap-5">
            <legend className="abra-field__label mb-5">{t('servicesTitle')}</legend>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {services.map((label) => {
                const checked = data.services.includes(label);
                return (
                  <label
                    key={label}
                    className={`flex cursor-pointer items-center gap-4 rounded-2xl border px-6 py-5 transition-colors duration-300 focus-within:ring-[3px] focus-within:ring-aqua/40 ${
                      checked ? 'border-aqua bg-aqua/10 text-white' : 'border-white/10 bg-white/[0.04] text-white/70 hover:border-aqua/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={(e) => toggleService(label, e.target.checked)}
                    />
                    <span
                      aria-hidden="true"
                      className={`flex h-5 w-5 items-center justify-center rounded border ${checked ? 'border-aqua bg-aqua text-profundo' : 'border-white/30'}`}
                    >
                      {checked ? <Check size={14} /> : null}
                    </span>
                    <span className="text-sm font-medium">{label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ) : null}

        {step === 3 ? (
          <fieldset className="flex flex-col gap-5">
            <legend className="abra-field__label mb-5">{t('availabilityTitle')}</legend>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field id={id('date')} label={t('date')}>
                <input id={id('date')} type="date" value={data.date} onChange={(e) => update('date', e.target.value)} className="abra-input" />
              </Field>
              <Field id={id('time')} label={t('time')}>
                <input id={id('time')} type="time" value={data.time} onChange={(e) => update('time', e.target.value)} className="abra-input" />
              </Field>
            </div>
          </fieldset>
        ) : null}

        <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(s - 1, 1))}
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft size={16} aria-hidden="true" /> {t('back')}
            </button>
          ) : (
            <span />
          )}
          <button type="submit" disabled={submitting} className="abra-btn">
            <span>{submitting ? t('sending') : step === TOTAL_STEPS ? t('send') : t('next')}</span>
            <span className="abra-btn__arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </form>

      {status ? (
        <p role="status" className="mt-8 rounded-3xl border border-aqua/20 bg-aqua/10 p-6 text-center font-mono text-sm text-aqua">
          {status}
        </p>
      ) : null}
    </div>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="abra-field__label">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="abra-field__error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
