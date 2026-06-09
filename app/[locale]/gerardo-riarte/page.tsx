import Image from "next/image";

export default function GerardoRiarteLandingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0A2D4D_0%,_#020C17_38%,_#01080F_100%)] text-white">
      <div className="mx-auto w-full max-w-2xl px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-12">
        <section className="flex min-h-[72vh] flex-col items-center justify-center text-center sm:min-h-[78vh]">
          <div className="mb-6 rounded-full border border-white/10 bg-white/5 p-1.5">
            <Image
              src="/Gerardo Riarte.webp"
              alt="Gerardo Riarte"
              width={176}
              height={176}
              priority
              className="h-36 w-36 rounded-full object-cover sm:h-44 sm:w-44"
            />
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">Gerardo Riarte</h1>
          <p className="mt-3 text-lg font-medium text-white/90 sm:text-xl">Growth Marketing × IA Aplicada</p>
          <p className="mt-3 max-w-xl text-sm text-white/70 sm:text-base">
            Ayudo a agencias y empresas a crecer sin que la operación las frene.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:min-w-[320px]">
            <a
              href="https://www.linkedin.com/in/gerardoriarte/"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary rounded-full bg-white px-6 py-3.5 text-base font-semibold text-[#020C17] hover:bg-white/90"
            >
              -&gt; Conectar en LinkedIn
            </a>
            <a
              href="https://nougram.co"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-ghost rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-base font-semibold text-white hover:bg-white/10"
            >
              -&gt; Conocé Nougram
            </a>
          </div>
        </section>

        <section className="py-10">
          <p className="text-base leading-relaxed text-white/80 sm:text-lg">
            Fundador de A:BRA Latam, agencia de Growth Marketing en Bogotá con foco en IA aplicada.
            Especialista en automatización, SEO, pauta y estrategia digital. Argentino convencido de que
            LATAM tiene el mejor mercado para escalar con tecnología.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 py-8 sm:p-8">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">A:BRA Latam</h2>
          <p className="mt-3 text-base leading-relaxed text-white/80 sm:text-lg">
            Agencia de Growth Marketing con foco en IA. Trabajamos con empresas que quieren escalar sin
            depender de más headcount.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            <li className="rounded-full border border-white/20 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/90">
              -&gt; Estrategia de crecimiento con IA
            </li>
            <li className="rounded-full border border-white/20 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/90">
              -&gt; Automatización de marketing
            </li>
            <li className="rounded-full border border-white/20 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/90">
              -&gt; SEO + Pauta + Analítica
            </li>
          </ul>
          <a
            href="https://abralatam.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary mt-7 inline-block rounded-full bg-white px-6 py-3.5 text-base font-semibold text-[#020C17] hover:bg-white/90"
          >
            -&gt; Ver agencia
          </a>
        </section>

        <section className="mt-6 rounded-3xl border border-white/15 bg-[#262537] px-6 py-8 text-white shadow-[0_14px_40px_rgba(0,0,0,0.35)] sm:px-8 sm:py-10">
          <h2 className="text-3xl font-semibold sm:text-4xl">Nougram</h2>
          <p className="mt-3 text-2xl font-semibold leading-snug sm:text-3xl">
            ¿Cuánto ganás realmente en cada propuesta que mandás?
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/80">
            Nougram es el cotizador que le asegura la ganancia neta a agencias y profesionales que
            venden conocimiento. Sin adivinar. Sin perder.
          </p>
          <a
            href="https://nougram.co"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary mt-7 inline-block rounded-full bg-[#E54D00] px-6 py-3.5 text-base font-semibold text-white hover:bg-[#f05f18]"
          >
            -&gt; Quiero saber más
          </a>
        </section>

        <section className="py-12 text-center">
          <p className="text-2xl font-semibold text-white sm:text-3xl">¿Charlamos?</p>
          <div className="mt-5 flex flex-col gap-2.5 text-base text-white/85">
            <a
              href="https://www.linkedin.com/in/gerardoriarte/"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-ghost rounded-full border border-white/20 bg-white/[0.03] px-4 py-2.5 font-medium text-white/90 hover:bg-white/[0.08]"
            >
              LinkedIn
            </a>
            <a
              href="mailto:business@abralatam.com"
              className="cta-ghost rounded-full border border-white/20 bg-white/[0.03] px-4 py-2.5 font-medium text-white/90 hover:bg-white/[0.08]"
            >
              business@abralatam.com
            </a>
            <a
              href="https://wa.me/573214444727"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-ghost rounded-full border border-white/20 bg-white/[0.03] px-4 py-2.5 font-medium text-white/90 hover:bg-white/[0.08]"
            >
              WhatsApp Business (+573214444727)
            </a>
          </div>
        </section>
      </div>
      <footer className="pb-8 text-center text-xs text-white/40">© 2026 Gerardo Riarte</footer>
    </div>
  );
}
