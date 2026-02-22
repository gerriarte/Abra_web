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
  year?: string;
  duration?: string;
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
  videos?: { url: string; title: string; titleEn: string }[];
  template?: 'standard' | 'audiovisual';
  partner?: { name: string; logo: string };
  projectDetails: ProjectDetailsType;
  images?: string[];
  heroImage?: string;
  titleEn?: string;
  brandDescriptionEn?: string;
  situationEn?: string;
  taskEn?: string;
  actionEn?: string;
  resultsEn?: Metric[];
  projectDetailsEn?: ProjectDetailsType;
}

export const CASES_DATA: Record<string, CaseStudy> = {
  'different-coffee': {
    id: 'different-coffee-001',
    client: 'Differente Coffee',
    title: 'Rediseño Web y Estrategia de Growth para Differente Coffee',
    brandDescription: 'Differente Coffee es una marca de café de especialidad que busca ofrecer una experiencia única y de alta calidad a sus clientes, enfocándose en la excelencia del grano y la sofisticación de su preparación.',
    situation: 'La marca contaba con una presencia digital que no reflejaba la calidad premium de sus productos, con campañas poco optimizadas y un crecimiento estancado.',
    task: 'Rediseñar el sitio web para mejorar la experiencia de usuario y la tasa de conversión, optimizar las campañas de pauta digital y aplicar estrategias de growth marketing para impulsar el crecimiento mensual.',
    action: 'Realizamos un rediseño integral del sitio web, enfocándonos en una estética premium y minimalista. Optimizamos las campañas de Meta y Google Ads con inversiones bajas pero altamente segmentadas, e implementamos diversas tácticas de growth marketing para fidelizar clientes y aumentar la recurrencia.',
    results: [
      { label: 'Crecimiento Mensual', value: '15', suffix: '%' },
      { label: 'Optimización de Pauta', value: 'Alta', suffix: '' },
      { label: 'Experiencia de Usuario', value: 'Premium', suffix: '' },
      { label: 'Retorno de Inversión', value: 'Máximo', suffix: '' },
    ],
    projectDetails: {
      year: '2024',
      duration: 'Continuo',
      services: ['Web Redesign', 'Growth Marketing', 'Ads Optimization', 'E-commerce'],
      team: [
        { role: 'Growth Strategist', name: 'Abra Team' },
        { role: 'Lead Designer', name: 'Abra Team' }
      ]
    },
    // English translations
    titleEn: 'Web Redesign and Growth Strategy for Differente Coffee',
    brandDescriptionEn: 'Differente Coffee is a specialty coffee brand that seeks to offer a unique and high-quality experience to its customers, focusing on grain excellence and the sophistication of its preparation.',
    situationEn: 'The brand had a digital presence that did not reflect the premium quality of its products, with poorly optimized campaigns and stagnant growth.',
    taskEn: 'Redesign the website to improve user experience and conversion rate, optimize digital advertising campaigns, and apply growth marketing strategies to boost monthly growth.',
    actionEn: 'We carried out a comprehensive redesign of the website, focusing on a premium and minimalist aesthetic. We optimized Meta and Google Ads campaigns with low but highly segmented investments, and implemented various growth marketing tactics to build customer loyalty and increase recurrence.',
    resultsEn: [
      { label: 'Monthly Growth', value: '15', suffix: '%' },
      { label: 'Ad Optimization', value: 'High', suffix: '' },
      { label: 'User Experience', value: 'Premium', suffix: '' },
      { label: 'ROI', value: 'Maximum', suffix: '' },
    ],
    projectDetailsEn: {
      services: ['Web Redesign', 'Growth Marketing', 'Ads Optimization', 'E-commerce'],
      team: [
        { role: 'Growth Strategist', name: 'Abra Team' },
        { role: 'Lead Designer', name: 'Abra Team' }
      ]
    },
    heroImage: '/differente-coffee/Differente Home.jpg',
    images: [
      '/differente-coffee/Differente-mock.png',
      '/differente-coffee/Differente Coffee mobile.png',
      '/differente-coffee/Differente Tienda.jpg',
      '/differente-coffee/Differente Producto.jpg',
      '/differente-coffee/Differente Coffee negocios.jpg',
      '/differente-coffee/Differente Coffee nosotros.jpg'
    ]
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
  },
  'monyte': {
    id: 'monyte-case-001',
    client: 'Monyte',
    title: 'Plataforma Unificada para Arbitraje de Criptoactivos',
    brandDescription: 'Monyte es una consultora que provee una solución integral para los árbitros de cripto-activos en LATAM. Ayuda desde la creación de la empresa en una jurisdicción Crypto-friendly hasta un sistema de KYC/AML y la debida diligencia que le permitirá enfocarse en su negocio.',
    situation: 'Los árbitros de criptoactivos en LATAM necesitaban una solución que les permitiera gestionar operaciones tanto en cripto como en fiat de manera eficiente. La falta de una plataforma unificada generaba ineficiencias operativas y dificultaba el control centralizado de las operaciones.',
    task: 'Crear un dashboard que permita al usuario crear operaciones tanto crypto como fiat en un solo lugar de manera automatizada y controlarla desde un administrador.',
    action: 'Desarrollamos una solución completa que incluye Branding, diseño de experiencia de usuario, diseño web, Diseño de interfaz de usuario, desarrollo front-end y back-end. Desarrollo e integración, Consultoría en Crypto, Capacitación y Soporte.',
    results: [
      { label: 'Operaciones Unificadas', value: '100', suffix: '%' },
      { label: 'Tiempo de Procesamiento', value: '-75', suffix: '%' },
      { label: 'Cumplimiento Normativo', value: '100', suffix: '%' },
      { label: 'Satisfacción del Cliente', value: '9.5', suffix: '/10' },
    ],
    projectDetails: {
      services: ['Branding', 'Diseño de Experiencia de Usuario', 'Diseño Web', 'Diseño de Interfaz de Usuario', 'Desarrollo Front-end y Back-end', 'Desarrollo e Integración', 'Consultoría en Crypto', 'Capacitación y Soporte'],
      team: []
    },
    // English translations
    titleEn: 'Unified Platform for Cryptocurrency Arbitrage',
    brandDescriptionEn: 'Monyte is a consulting firm that provides a comprehensive solution for cryptocurrency arbitrageurs in LATAM. It helps from company formation in a Crypto-friendly jurisdiction to a KYC/AML system and due diligence that will allow them to focus on their business.',
    situationEn: 'Cryptocurrency arbitrageurs in LATAM needed a solution that would allow them to manage operations in both crypto and fiat efficiently. The lack of a unified platform generated operational inefficiencies and made centralized control of operations difficult.',
    taskEn: 'Create a dashboard that allows users to create both crypto and fiat operations in one place in an automated manner and control it from an administrator.',
    actionEn: 'We developed a complete solution that includes Branding, user experience design, web design, User interface design, front-end and back-end development. Development and integration, Crypto Consulting, Training and Support.',
    resultsEn: [
      { label: 'Unified Operations', value: '100', suffix: '%' },
      { label: 'Processing Time', value: '-75', suffix: '%' },
      { label: 'Regulatory Compliance', value: '100', suffix: '%' },
      { label: 'Client Satisfaction', value: '9.5', suffix: '/10' },
    ],
    projectDetailsEn: {
      services: ['Branding', 'User Experience Design', 'Web Design', 'User Interface Design', 'Front-end and Back-end Development', 'Development and Integration', 'Crypto Consulting', 'Training and Support'],
      team: []
    },
    heroImage: '/monyte/Monyte Banner.png',
    images: [
      '/monyte/monyte-mobile-1.png',
      '/monyte/mobile-2.png',
      '/monyte/mobile-3.png'
    ]
  },
  'securitas': {
    id: 'securitas-case-001',
    client: 'Securitas',
    title: 'Transformación Digital para Seguridad Aeroportuaria',
    brandDescription: 'Securitas es una empresa global de servicios de seguridad con más de 300.000 empleados en 53 países. Proporciona a sus clientes soluciones de seguridad confiables, adaptadas a sus necesidades individuales. La División Aérea de Securitas ofrece servicios de seguridad de aviación que incluyen controles, perfiles de pasajeros y carga, programas de policía aéreo y consultoría de seguridad.',
    situation: 'Securitas buscaba una transformación digital para optimizar todos los procesos y agregar valor a las actividades de seguridad aeroportuaria a través de la tecnología. Los procesos de control, gestión, revisión y seguimiento de la operación necesitaban modernización para crear un área de operación más eficiente y con mayor capacidad productiva.',
    task: 'Re-diseñar la experiencia de usuario, diseño de interfaz de usuario, diseño web, desarrollo front-end y Back-end, pruebas con usuario, entrenamiento y soporte para transformar digitalmente las operaciones de seguridad aeroportuaria.',
    action: 'Desarrollamos una solución completa que incluye re-diseño de la experiencia de usuario, diseño de interfaz de usuario, diseño web, desarrollo front-end y Back-end. Implementamos pruebas con usuario, entrenamiento del equipo y soporte continuo para garantizar una transición exitosa hacia la transformación digital.',
    results: [
      { label: 'Optimización de Procesos', value: '100', suffix: '%' },
      { label: 'Eficiencia Operativa', value: '+60', suffix: '%' },
      { label: 'Capacidad Productiva', value: '+45', suffix: '%' },
      { label: 'Satisfacción del Usuario', value: '9.2', suffix: '/10' },
    ],
    projectDetails: {
      services: ['Re-diseño de Experiencia de Usuario', 'Diseño de Interfaz de Usuario', 'Diseño Web', 'Desarrollo Front-end', 'Desarrollo Back-end', 'Pruebas con Usuario', 'Entrenamiento', 'Soporte'],
      team: []
    },
    // English translations
    titleEn: 'Digital Transformation for Airport Security',
    brandDescriptionEn: 'Securitas is a global security services company with over 300,000 employees in 53 countries. It provides clients with reliable security solutions tailored to their individual needs. Securitas Air Division offers aviation security services including controls, passenger and cargo profiling, air police programs, and security consulting.',
    situationEn: 'Securitas sought a digital transformation to optimize all processes and add value to airport security activities through technology. Control, management, review, and operation tracking processes needed modernization to create a more efficient operational area with greater productive capacity.',
    taskEn: 'Re-design user experience, user interface design, web design, front-end and back-end development, user testing, training and support to digitally transform airport security operations.',
    actionEn: 'We developed a complete solution that includes user experience re-design, user interface design, web design, front-end and back-end development. We implemented user testing, team training, and ongoing support to ensure a successful transition to digital transformation.',
    resultsEn: [
      { label: 'Process Optimization', value: '100', suffix: '%' },
      { label: 'Operational Efficiency', value: '+60', suffix: '%' },
      { label: 'Productive Capacity', value: '+45', suffix: '%' },
      { label: 'User Satisfaction', value: '9.2', suffix: '/10' },
    ],
    projectDetailsEn: {
      services: ['User Experience Re-design', 'User Interface Design', 'Web Design', 'Front-end Development', 'Back-end Development', 'User Testing', 'Training', 'Support'],
      team: []
    },
    heroImage: '/Securitas/Mockup dashboard.png',
    images: [
      '/Securitas/Mobile pantallas.png'
    ]
  },
  'rac': {
    id: 'rac-case-001',
    client: 'RealArt Crypto',
    title: 'Plataforma de Inversión en Arte con Blockchain y Web3',
    brandDescription: 'RealArt Crypto es una plataforma que permite invertir en activos tangibles de arte, bajo los principios de Fragmentación, Democratización y Vehículos de inversión, para de esta forma llevar una trazabilidad de la adquisición de valor de los bienes.',
    situation: 'El mercado del arte tradicionalmente ha sido exclusivo y de difícil acceso para la mayoría de las personas. RealArt Crypto necesitaba crear una plataforma que democratizara el acceso a piezas de arte curadas, permitiendo inversión fragmentada y trazabilidad mediante tecnología blockchain.',
    task: 'Crear una dinámica comercial y de disfrute de piezas curadas de arte democratizando y haciéndolo accesible a todo el mundo a través de un desarrollo tecnológico basado en NFT\'s, Blockchain y Web3.',
    action: 'Desarrollamos una solución completa que incluye Discovery, diseño de la experiencia de usuario y diseño de interfaz de usuario. En esta oportunidad nos convertimos en el consultor principal para las tecnologías Blockchain y Crypto, guiando la estrategia técnica y de producto.',
    results: [
      { label: 'Democratización del Arte', value: '100', suffix: '%' },
      { label: 'Trazabilidad Blockchain', value: '100', suffix: '%' },
      { label: 'Accesibilidad', value: '+85', suffix: '%' },
      { label: 'Satisfacción del Usuario', value: '9.0', suffix: '/10' },
    ],
    projectDetails: {
      services: ['Discovery', 'Diseño de Experiencia de Usuario', 'Diseño de Interfaz de Usuario', 'Consultoría Blockchain', 'Consultoría Crypto', 'Consultoría Web3'],
      team: []
    },
    // English translations
    titleEn: 'Art Investment Platform with Blockchain and Web3',
    brandDescriptionEn: 'RealArt Crypto is a platform that allows investing in tangible art assets, under the principles of Fragmentation, Democratization and Investment Vehicles, to track the value acquisition of assets.',
    situationEn: 'The art market has traditionally been exclusive and difficult to access for most people. RealArt Crypto needed to create a platform that would democratize access to curated art pieces, enabling fragmented investment and traceability through blockchain technology.',
    taskEn: 'Create a commercial dynamic and enjoyment of curated art pieces by democratizing and making it accessible to everyone through technological development based on NFTs, Blockchain and Web3.',
    actionEn: 'We developed a complete solution that includes Discovery, user experience design and user interface design. On this occasion, we became the principal consultant for Blockchain and Crypto technologies, guiding the technical and product strategy.',
    resultsEn: [
      { label: 'Art Democratization', value: '100', suffix: '%' },
      { label: 'Blockchain Traceability', value: '100', suffix: '%' },
      { label: 'Accessibility', value: '+85', suffix: '%' },
      { label: 'User Satisfaction', value: '9.0', suffix: '/10' },
    ],
    projectDetailsEn: {
      services: ['Discovery', 'User Experience Design', 'User Interface Design', 'Blockchain Consulting', 'Crypto Consulting', 'Web3 Consulting'],
      team: []
    },
    heroImage: '/RAC/Mockup Website.png',
    images: [
      '/RAC/Pantallas 1.png',
      '/RAC/Pantallas 2.png'
    ]
  },
  'invia': {
    id: 'invia-case-001',
    client: 'Invia 1912',
    title: 'E-commerce para Maquinaria Industrial de Bebidas y Alimentos',
    brandDescription: 'Invia 1912 es una empresa con más de 100 años de experiencia que se dedica a la fabricación, distribución y venta de maquinaria, equipos y consumibles para la industria de bebidas y alimentos, especializándose en vino, cava, aceite, cerveza y licores. Ofrecen soluciones completas, desde la planificación y montaje de bodegas y almazaras (proyectos llave en mano) hasta maquinaria para vendimia, prensado, filtración, embotellado, limpieza, control ambiental y automatización, incluyendo también productos enológicos y asesoramiento técnico.',
    situation: 'Tradicionalmente su venta ha sido por compra directa en su fábrica, pero en los últimos años se han visto en la necesidad de digitalizar el proceso comercial para responder a la demanda de productores vitivinícolas en todo Europa.',
    task: 'Diseñar y desarrollar un E-commerce capaz de comercializar sus más de 1500 productos, respondiendo a las necesidades de múltiples países europeos con una experiencia clara y atractiva.',
    action: 'Desarrollamos el diseño de experiencia de compra y el desarrollo de sitio web en WordPress, CMS que facilita la actualización y gestión de los múltiples productos, el cual se realizaron múltiples personalizaciones para cumplir las exigencias de sus clientes y comunicar la diversidad de productos de forma clara.',
    results: [
      { label: 'Productos Catalogados', value: '1500', suffix: '+' },
      { label: 'Países Atendidos', value: '15', suffix: '+' },
      { label: 'Conversión E-commerce', value: '+45', suffix: '%' },
      { label: 'Satisfacción del Cliente', value: '9.1', suffix: '/10' },
    ],
    projectDetails: {
      logo: '/Invia/Logo- tienda invia.png',
      services: ['Diseño de Experiencia de Usuario', 'Diseño Web', 'Diseño de Interfaz de Usuario', 'Desarrollo en WordPress', 'Desarrollo e Integración'],
      team: []
    },
    // English translations
    titleEn: 'E-commerce for Industrial Beverage and Food Machinery',
    brandDescriptionEn: 'Invia 1912 is a company with over 100 years of experience dedicated to manufacturing, distribution and sale of machinery, equipment and consumables for the beverage and food industry, specializing in wine, cava, oil, beer and spirits. They offer complete solutions, from planning and installation of wineries and olive mills (turnkey projects) to machinery for harvest, pressing, filtration, bottling, cleaning, environmental control and automation, including also oenological products and technical advice.',
    situationEn: 'Traditionally their sales have been through direct purchase at their factory, but in recent years they have found it necessary to digitize the commercial process to respond to the demand of wine producers throughout Europe.',
    taskEn: 'Design and develop an E-commerce capable of commercializing their more than 1500 products, responding to the needs of multiple European countries with a clear and attractive experience.',
    actionEn: 'We developed the purchase experience design and website development in WordPress, a CMS that facilitates the update and management of multiple products, for which multiple customizations were made to meet their clients\' requirements and communicate the diversity of products clearly.',
    resultsEn: [
      { label: 'Cataloged Products', value: '1500', suffix: '+' },
      { label: 'Countries Served', value: '15', suffix: '+' },
      { label: 'E-commerce Conversion', value: '+45', suffix: '%' },
      { label: 'Client Satisfaction', value: '9.1', suffix: '/10' },
    ],
    projectDetailsEn: {
      logo: '/Invia/Logo- tienda invia.png',
      services: ['User Experience Design', 'Web Design', 'User Interface Design', 'WordPress Development', 'Development and Integration'],
      team: []
    },
    heroImage: '/Invia/Hero - Tienda Invia.png',
    images: [
      '/Invia/visuales del proyecto - Tienda invia.png'
    ]
  },
  'bestune': {
    id: 'bestune-case-001',
    client: 'Bestune',
    template: 'audiovisual',
    partner: {
      name: 'MTM Marca tu Marca',
      logo: '/Bestune/MTM-Marca-tu-marca-brand.jpeg'
    },
    title: 'Electrificando el Futuro: Producción Publicitaria para Bestune',
    brandDescription: 'Bestune es una marca automotriz de vanguardia enfocada en la movilidad eléctrica sostenible. Con un diseño audaz y tecnología de punta, Bestune busca transformar la relación entre el conductor y el medio ambiente, ofreciendo vehículos de lujo que no comprometen la potencia ni el planeta.',
    situation: 'La marca necesitaba una presencia visual impactante para el lanzamiento de su nueva línea de vehículos eléctricos. El desafío era comunicar tanto la sofisticación tecnológica como la potencia dinámica de los autos Bestune a través de piezas audiovisuales de alta calidad.',
    task: 'Producir una serie de piezas publicitarias en video que capturen la esencia de la marca Bestune. La misión fue resaltar la aerodinámica, el interior tecnológico y la experiencia de conducción silenciosa y potente.',
    action: 'En colaboración con nuestro partner estratégico MTM Marca tu Marca, realizamos una producción publicitaria integral. Esto incluyó el rodaje en estudio con equipos de iluminación de cine, cámaras de alta velocidad y post-producción avanzada para lograr un look futurista y premium que define la identidad de Bestune.',
    results: [
      { label: 'Impacto Visual', value: '100', suffix: '%' },
      { label: 'Alcance de Campaña', value: '+1.5', suffix: 'M' },
      { label: 'Retención de Video', value: '85', suffix: '%' },
      { label: 'Satisfacción de Marca', value: '9.8', suffix: '/10' },
    ],
    videos: [
      { url: 'https://www.youtube.com/watch?v=z6sWxXGpqz4', title: 'Bestune: Poder Eléctrico', titleEn: 'Bestune: Electric Power' },
      { url: 'https://www.youtube.com/watch?v=0ZCmdY0Nduk', title: 'Diseño Aerodinámico', titleEn: 'Aerodynamic Design' },
      { url: 'https://www.youtube.com/watch?v=AXFLg8_bqjk', title: 'Tecnología de Vanguardia', titleEn: 'State-of-the-Art Technology' }
    ],
    projectDetails: {
      year: '2025',
      duration: '3 Meses',
      services: ['Producción Audiovisual', 'Estrategia de Marca', 'Dirección de Arte', 'Post-producción'],
      team: [
        { role: 'Partner de Producción', name: 'MTM Marca tu Marca' }
      ]
    },
    // English translations
    titleEn: 'Electrifying the Future: Advertising Production for Bestune',
    brandDescriptionEn: 'Bestune is a cutting-edge automotive brand focused on sustainable electric mobility. With bold design and state-of-the-art technology, Bestune seeks to transform the relationship between the driver and the environment, offering luxury vehicles that compromise neither power nor the planet.',
    situationEn: 'The brand needed an impactful visual presence for the launch of its new line of electric vehicles. The challenge was to communicate both the technological sophistication and the dynamic power of Bestune cars through high-quality audiovisual pieces.',
    taskEn: 'Produce a series of video advertising pieces that capture the essence of the Bestune brand. The mission was to highlight aerodynamics, technological interior, and the silent yet powerful driving experience.',
    actionEn: 'In collaboration with our strategic partner MTM Marca tu Marca, we carried out a comprehensive advertising production. This included studio shooting with cinema lighting equipment, high-speed cameras, and advanced post-production to achieve a futuristic and premium look that defines Bestune\'s identity.',
    resultsEn: [
      { label: 'Visual Impact', value: '100', suffix: '%' },
      { label: 'Campaign Reach', value: '+1.5', suffix: 'M' },
      { label: 'Video Retention', value: '85', suffix: '%' },
      { label: 'Brand Satisfaction', value: '9.8', suffix: '/10' },
    ],
    projectDetailsEn: {
      services: ['Audiovisual Production', 'Brand Strategy', 'Art Direction', 'Post-production'],
      team: [
        { role: 'Production Partner', name: 'MTM Marca tu Marca' }
      ]
    },
    heroImage: '/Bestune/Bestune-01.jpg',
    images: [
      '/Bestune/Bestune-02.jpg',
      '/Bestune/Bestune-03.jpg',
      '/Bestune/Bestune-04.jpg'
    ]
  }
};
