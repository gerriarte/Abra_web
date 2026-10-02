/** Animated A:BRA Loop diagram (decorative). The phase cards next to it carry the meaning. */
export default function LoopDiagram({ phases, label, caption }: { phases: string[]; label: string; caption: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
      <div className="absolute inset-0 rounded-full border border-white/[0.08]" />
      <div className="loop-ring-spin absolute inset-[12%] rounded-full border border-dashed border-aqua/25" />
      <div className="absolute inset-[24%] rounded-full border border-white/[0.05]" />

      {/* Dot orbiting the outer ring */}
      <div className="abra-spin absolute inset-0">
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aqua shadow-[0_0_14px_3px_rgba(0,198,186,0.45)]" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="space-y-2 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/55">{label}</p>
          <p className="text-4xl font-light tabular-nums tracking-tight text-white/90">360°</p>
          <p className="font-mono text-[10px] text-white/50">{caption}</p>
        </div>
      </div>

      {phases.map((name, i) => {
        const angle = (i * 90 - 90) * (Math.PI / 180);
        const x = 50 + 46 * Math.cos(angle);
        const y = 50 + 46 * Math.sin(angle);
        return (
          <div
            key={name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div
              className="abra-node whitespace-nowrap rounded-full border border-aqua/30 bg-background/85 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-white/80 backdrop-blur-sm"
              style={{ animationDuration: '3.6s', animationDelay: `${i * 0.9}s` }}
            >
              {name}
            </div>
          </div>
        );
      })}

      <div className="absolute left-0 right-0 top-1/2 h-px bg-white/[0.06]" />
      <div className="absolute bottom-0 left-1/2 top-0 w-px bg-white/[0.06]" />
    </div>
  );
}
