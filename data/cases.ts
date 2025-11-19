export interface Metric {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
}

export interface TeamMember {
  role: string;
  name: string;
}

export interface ProjectDetailsType {
  logo?: string;
  year: string;
  duration: string;
  services: string[];
  team: TeamMember[];
}

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  brandDescription: string;
  situation: string;
  task: string;
  action: string;
  results: Metric[];
  projectDetails: ProjectDetailsType;
}

export const CASES_DATA: Record<string, CaseStudy> = {
  'different-coffee': {
    id: 'different-coffee-001',
    client: 'Different Coffee',
    title: 'Redefiniendo la Experiencia del Café Especialidad',
    brandDescription: 'Different Coffee es una tostaduría boutique que busca democratizar el acceso al café de especialidad. Con un enfoque en la trazabilidad y el comercio justo, su identidad visual y verbal refleja sofisticación, pero con un tono accesible y humano. No venden solo granos; venden rituales matutinos.',
    situation: 'A pesar de tener un producto superior y una marca visualmente potente, Different Coffee enfrentaba un estancamiento en su canal e-commerce. El costo por adquisición (CPA) en Meta Ads había aumentado un 40% debido a la saturación de competidores genéricos, y la retención de clientes (LTV) era baja.',
    task: 'Nuestra misión fue clara: Reestructurar el ecosistema de pauta digital para optimizar el CPA por debajo de $15 USD y aumentar la tasa de recompra en un 20% durante el Q4, aprovechando la temporada alta para posicionar la marca como líder en regalos corporativos y consumo hogareño premium.',
    action: 'Implementamos una estrategia "Full-Funnel". En la etapa de descubrimiento, utilizamos videos de alto impacto (Reels/TikTok) centrados en el ASMR de la preparación del café para generar deseo sensorial. En consideración, activamos campañas de Google Search y Shopping para capturar intención de compra de "café de especialidad". Finalmente, para retención, diseñamos flujos de Email Marketing automatizados post-compra y campañas de Remarketing dinámico con ofertas exclusivas para suscripciones mensuales.',
    results: [
      { label: 'Retorno de Inversión (ROAS)', value: '4.5', suffix: 'x' },
      { label: 'Reducción de CPA', value: '32', suffix: '%' },
      { label: 'Tasa de Conversión', value: '2.8', suffix: '%' },
      { label: 'Nuevos Suscriptores', value: '+150', suffix: '' },
    ],
    projectDetails: {
      logo: 'https://placehold.co/400x150/171717/ffffff/png?text=Different+Coffee&font=playfair',
      year: '2023',
      duration: '4 Meses (Sept - Dic)',
      services: ['Estrategia Digital', 'Paid Media', 'Content Creation', 'Email Automation'],
      team: [
        { role: 'Director Creativo', name: 'Ana Silva' },
        { role: 'Growth Manager', name: 'Carlos Ruiz' },
        { role: 'Copywriter', name: 'Elena Martínez' }
      ]
    }
  },
  'techflow': {
    id: 'techflow-case-1',
    client: 'TechFlow Systems',
    title: 'TechFlow: Escalar la Identidad Visual',
    brandDescription: 'TechFlow Systems es una empresa SaaS líder en automatización industrial que necesitaba una identidad visual a la altura de su innovación tecnológica.',
    situation: 'La marca visual no reflejaba la innovación tecnológica de sus nuevos productos de IA, lo que dificultaba la atracción de clientes enterprise.',
    task: 'Desarrollar un sistema de diseño modular basado en la precisión de la ingeniería y la fluidez de los datos para unificar su presencia global.',
    action: 'Creamos una identidad visual dinámica, un nuevo sitio web corporativo y un sistema de diseño completo que permite escalar la marca a través de todos los puntos de contacto digitales y físicos.',
    results: [
      { label: 'Leads Cualificados', value: '+40', suffix: '%' },
      { label: 'Engagement', value: '2.5', suffix: 'x' },
      { label: 'Tiempo en Sitio', value: '+120', suffix: '%' },
      { label: 'Conversión Demo', value: '3.2', suffix: '%' },
    ],
    projectDetails: {
      year: '2024',
      duration: '6 Meses',
      services: ['Branding', 'Web Design', 'UX/UI', 'Development'],
      team: [
        { role: 'Lead Designer', name: 'Sofia M.' },
        { role: 'Tech Lead', name: 'Javier R.' }
      ]
    }
  },
  'urban-mobility': {
    id: 'urban-mobility-case',
    client: 'Urban Go',
    title: 'Urban Go: Movilidad Sostenible',
    brandDescription: 'Urban Go es una startup que busca transformar la movilidad urbana con soluciones sostenibles y accesibles para todos.',
    situation: 'Lanzamiento de app de movilidad en un mercado dominado por gigantes, con presupuesto limitado y necesidad de tracción rápida.',
    task: 'Lograr 10,000 descargas en el primer mes con un costo de adquisición (CAC) sostenible.',
    action: 'Estrategia de posicionamiento hiper-local y diseño de app centrado en la comunidad, apoyado por campañas de guerrilla y micro-influencers.',
    results: [
      { label: 'Descargas', value: '10', suffix: 'k' },
      { label: 'CAC', value: '$2.5', suffix: '' },
      { label: 'Usuarios Activos', value: '45', suffix: '%' },
      { label: 'Rating App Store', value: '4.8', suffix: '' },
    ],
    projectDetails: {
      year: '2023',
      duration: '3 Meses',
      services: ['App Design', 'Go-to-Market', 'Branding'],
      team: [
        { role: 'Product Manager', name: 'Luis G.' },
        { role: 'Marketing Lead', name: 'Maria F.' }
      ]
    }
  },
  'vertex-construction': {
    id: 'vertex-construction-case',
    client: 'Vertex',
    title: 'Vertex: Construyendo Confianza Digital',
    brandDescription: 'Vertex es una constructora de lujo especializada en proyectos residenciales de alto nivel.',
    situation: 'Constructora de lujo con nula presencia digital y dependencia del boca a boca, perdiendo oportunidades frente a competidores más visibles.',
    task: 'Construir una presencia digital que refleje la calidad y exclusividad de sus obras y generar leads de alto valor.',
    action: 'Desarrollo de un website inmersivo tipo showroom y estrategia SEO local de alto valor para captar inversores y clientes premium.',
    results: [
      { label: 'Pipeline Generado', value: '$5', suffix: 'M+' },
      { label: 'Tráfico Orgánico', value: '+300', suffix: '%' },
      { label: 'Solicitudes Ppto', value: '15', suffix: '/mes' },
      { label: 'Top 3 Google', value: '12', suffix: 'KWs' },
    ],
    projectDetails: {
      year: '2023',
      duration: '5 Meses',
      services: ['Web Development', 'SEO', 'Lead Gen'],
      team: [
        { role: 'SEO Specialist', name: 'Pedro S.' },
        { role: 'Web Developer', name: 'Ana L.' }
      ]
    }
  },
  'nova-health': {
    id: 'nova-health-case',
    client: 'Nova Health',
    title: 'Nova Health: Telemedicina Accesible',
    brandDescription: 'Nova Health democratiza el acceso a servicios médicos de calidad a través de tecnología simple y humana.',
    situation: 'Alta tasa de abandono en el proceso de agendamiento de citas y alto porcentaje de inasistencias (no-shows).',
    task: 'Optimizar el flujo de conversión y reducir las inasistencias a las citas médicas.',
    action: 'Rediseño UX del funnel de reserva para hacerlo más intuitivo y sistema de recordatorios automatizados por WhatsApp.',
    results: [
      { label: 'Conversión', value: '+45', suffix: '%' },
      { label: 'No-Shows', value: '-80', suffix: '%' },
      { label: 'Satisfacción', value: '9.2', suffix: '/10' },
      { label: 'Citas/Mes', value: '+200', suffix: '' },
    ],
    projectDetails: {
      year: '2024',
      duration: '4 Meses',
      services: ['Product Design', 'Growth', 'Automation'],
      team: [
        { role: 'UX Researcher', name: 'Carla V.' },
        { role: 'Growth Hacker', name: 'Diego M.' }
      ]
    }
  },
  'eco-packaging': {
    id: 'eco-packaging-case',
    client: 'EcoPack',
    title: 'EcoPack: B2B Lead Generation',
    brandDescription: 'EcoPack provee soluciones de empaquetado sostenible para la industria alimentaria y retail.',
    situation: 'Ciclos de venta B2B largos y dificultad para llegar a tomadores de decisión en grandes empresas.',
    task: 'Generar oportunidades comerciales con empresas Fortune 500 y acelerar el ciclo de ventas.',
    action: 'Estrategia de Account-Based Marketing (ABM) en LinkedIn y nutrición de leads con contenido de alto valor.',
    results: [
      { label: 'Deals Cerrados', value: '3', suffix: '' },
      { label: 'ROI', value: '12', suffix: 'x' },
      { label: 'Reuniones Calificadas', value: '25', suffix: '' },
      { label: 'Ciclo de Venta', value: '-30', suffix: '%' },
    ],
    projectDetails: {
      year: '2023',
      duration: '6 Meses',
      services: ['LinkedIn Ads', 'Content Strategy', 'CRM'],
      team: [
        { role: 'B2B Strategist', name: 'Roberto C.' },
        { role: 'Content Lead', name: 'Lucia P.' }
      ]
    }
  }
};
