type SectionFlowLineProps = {
  className?: string;
  variant?: 'full' | 'short';
};

export function SectionFlowLine({ className = '', variant = 'full' }: SectionFlowLineProps) {
  return (
    <div
      className={`relative pointer-events-none ${variant === 'short' ? 'max-w-xl mx-auto' : 'w-full'} ${className}`}
      aria-hidden="true"
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-background" />
    </div>
  );
}
