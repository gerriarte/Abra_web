'use client';

import { useId, useState, type FormEvent } from 'react';

/** WhatsApp number in international format, without "+" or spaces (Colombia: 57). */
const WHATSAPP_NUMBER = '573242110636';

export type CtaFormCopy = {
  label: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  company: string;
  companyPlaceholder: string;
  area: string;
  areas: string[];
  submit: string;
  note: string;
  errorRequired: string;
  errorEmail: string;
  /** Message template with {name} {email} {company} {area} placeholders. */
  whatsapp: string;
};

type Field = 'name' | 'email' | 'company';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CtaForm({ copy }: { copy: CtaFormCopy }) {
  const uid = useId();
  const [values, setValues] = useState({ name: '', email: '', company: '', area: copy.areas[0] ?? '' });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  const validate = () => {
    const next: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) next.name = copy.errorRequired;
    if (!values.email.trim()) next.email = copy.errorRequired;
    else if (!EMAIL_RE.test(values.email.trim())) next.email = copy.errorEmail;
    if (!values.company.trim()) next.company = copy.errorRequired;
    setErrors(next);
    return next;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    const text = copy.whatsapp
      .replace('{name}', values.name.trim())
      .replace('{email}', values.email.trim())
      .replace('{company}', values.company.trim())
      .replace('{area}', values.area);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    // Hook for analytics later, e.g. window.gtag?.('event', 'judgment_audit_whatsapp')
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const field = (key: Field, label: string, placeholder: string, type = 'text', autoComplete?: string) => {
    const id = `${uid}-${key}`;
    const error = errors[key];
    return (
      <div className="ja-field">
        <label htmlFor={id} className="abra-field__label">
          {label}
        </label>
        <input
          id={id}
          name={key}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={values[key]}
          onChange={(e) => {
            setValues((v) => ({ ...v, [key]: e.target.value }));
            if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="abra-input"
        />
        {error ? (
          <p id={`${id}-error`} className="abra-field__error">
            {error}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <form className="ja-form abra-reveal" aria-label={copy.label} onSubmit={onSubmit} noValidate>
      <div className="ja-form__grid">
        {field('name', copy.name, copy.namePlaceholder, 'text', 'name')}
        {field('email', copy.email, copy.emailPlaceholder, 'email', 'email')}
        {field('company', copy.company, copy.companyPlaceholder, 'text', 'organization')}
        <div className="ja-field">
          <label htmlFor={`${uid}-area`} className="abra-field__label">
            {copy.area}
          </label>
          <select
            id={`${uid}-area`}
            name="area"
            className="abra-input"
            value={values.area}
            onChange={(e) => setValues((v) => ({ ...v, area: e.target.value }))}
          >
            {copy.areas.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="abra-btn">
        <span>{copy.submit}</span>
        <span className="abra-btn__arrow" aria-hidden="true">
          →
        </span>
      </button>
      <p className="ja-form__note">{copy.note}</p>
    </form>
  );
}
