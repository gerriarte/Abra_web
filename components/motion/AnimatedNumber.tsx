'use client';

import CountUp from './CountUp';

/**
 * Cuenta hacia arriba la parte numérica ENTERA de un string de métrica
 * (p. ej. "+340", "5x", "x3"), preservando prefijo/sufijo. Si el valor no
 * contiene un entero (p. ej. "Rebrand"), se muestra tal cual.
 */
export default function AnimatedNumber({
  value,
  className,
  duration,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const m = value.match(/^(\D*)(\d+)(\D*)$/);
  if (!m) return <span className={className}>{value}</span>;
  const [, prefix, num, suffix] = m;
  return (
    <span className={className}>
      {prefix}
      <CountUp
        value={Number(num)}
        duration={duration}
        format={(n) => Math.round(n).toLocaleString('es-CO')}
      />
      {suffix}
    </span>
  );
}
