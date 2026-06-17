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
  sector?: string;
  sectorEn?: string;
  title: string;
  brandDescription: string;
  situation: string;
  task: string;
  action: string;
  results: Metric[];
  videos?: { url: string; title: string; titleEn: string }[];
  template?: 'standard' | 'audiovisual' | 'bespoke';
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
      year: '2025/2026',
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
      year: '2025/2026',
      services: ['Web Redesign', 'Growth Marketing', 'Ads Optimization', 'E-commerce'],
      team: [
        { role: 'Growth Strategist', name: 'Abra Team' },
        { role: 'Lead Designer', name: 'Abra Team' }
      ]
    },
    heroImage: '/differente-coffee/Differente-mock.webp',
    images: [
      '/differente-coffee/Differente Home.webp',
      '/differente-coffee/Differente Tienda.webp',
      '/differente-coffee/Differente Producto.webp',
      '/differente-coffee/Differente Coffee negocios.webp',
      '/differente-coffee/Differente Coffee nosotros.webp'
    ]
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
    heroImage: '/monyte/Monyte Banner.webp',
    images: [
      '/monyte/monyte-mobile-1.webp',
      '/monyte/mobile-2.webp',
      '/monyte/mobile-3.webp'
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
    heroImage: '/Securitas/Mockup dashboard.webp',
    images: [
      '/Securitas/Mobile pantallas.webp'
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
    heroImage: '/RAC/Mockup Website.webp',
    images: [
      '/RAC/Pantallas 1.webp',
      '/RAC/Pantallas 2.webp'
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
      logo: '/Invia/Logo- tienda invia.webp',
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
      logo: '/Invia/Logo- tienda invia.webp',
      services: ['User Experience Design', 'Web Design', 'User Interface Design', 'WordPress Development', 'Development and Integration'],
      team: []
    },
    heroImage: '/Invia/Hero - Tienda Invia.webp',
    images: [
      '/Invia/visuales del proyecto - Tienda invia.webp'
    ]
  },
  'bestune': {
    id: 'bestune-case-001',
    client: 'Bestune',
    template: 'audiovisual',
    partner: {
      name: 'MTM Marca tu Marca',
      logo: '/Bestune/MTM-Marca-tu-marca-brand.webp'
    },
    title: 'Electrificando el Futuro: Producción Publicitaria para Bestune',
    brandDescription: 'Bestune es una marca automotriz de vanguardia enfocada en la movilidad eléctrica sostenible. Con un diseño audaz y tecnología de punta.',
    situation: 'La marca necesitaba una presencia visual impactante para el lanzamiento de su nueva línea de vehículos eléctricos. El desafío era comunicar tanto la sofisticación tecnológica como la potencia dinámica.',
    task: 'Producir una serie de piezas publicitarias en video que capturen la esencia de la marca Bestune. La misión fue resaltar la aerodinámica y el interior tecnológico.',
    action: 'En colaboración con MTM Marca tu Marca, realizamos una producción publicitaria integral con equipos de iluminación de cine y post-producción avanzada.',
    results: [
      { label: 'Impacto Visual', value: '100', suffix: '%' },
      { label: 'Alcance de Campaña', value: '+1.5', suffix: 'M' },
      { label: 'Retención de Video', value: '85', suffix: '%' },
      { label: 'Satisfacción de Marca', value: '9.8', suffix: '/10' },
    ],
    heroImage: '/Bestune/Bestune-01.webp',
    images: ['/Bestune/Bestune-02.webp', '/Bestune/Bestune-03.webp', '/Bestune/Bestune-04.webp'],
    projectDetails: { year: '2025', services: ['Producción Audiovisual', 'Estrategia de Marca'], team: [] }
  },
  'ruta-teatro': {
    id: 'ruta-teatro-001',
    client: 'Ruta Teatro Bogotá',
    title: 'Digitalizando la Escena Teatral de Bogotá',
    brandDescription: 'La plataforma líder para descubrir y vivir el teatro en la capital, conectando audiencias con la oferta cultural más vibrante.',
    situation: 'La cartelera teatral de Bogotá estaba fragmentada. Los espectadores tenían dificultades para encontrar funciones en tiempo real y los teatros carecían de una plataforma centralizada para visibilizar sus obras.',
    task: 'Crear un ecosistema digital integrado que centralice la oferta teatral, optimice la experiencia de búsqueda y potencie la venta de boletería mediante ingeniería de datos.',
    action: 'Desarrollamos una plataforma web interactiva con mapas dinámicos, filtros inteligentes de cartelera y un sistema de recomendación personalizado, optimizado para una navegación fluida en dispositivos móviles.',
    results: [
      { label: 'Tráfico Web', value: '200', suffix: '%' },
      { label: 'Conversión Boletería', value: '45', suffix: '%' },
      { label: 'Usuarios Activos', value: '15', suffix: 'k+' },
      { label: 'Visibilidad Teatros', value: 'Alta', suffix: '' },
    ],
    heroImage: '/cases/Ruta Teatro Bogotá/rutateatro-home.webp',
    images: [
      '/cases/Ruta Teatro Bogotá/rutateatro-home.webp',
      '/cases/Ruta Teatro Bogotá/Rutateatro-cartelera.webp',
      '/cases/Ruta Teatro Bogotá/rutateatro-mapa.webp',
      '/cases/Ruta Teatro Bogotá/Rutateatro-obra.webp',
      '/cases/Ruta Teatro Bogotá/rutateatro-loquesevivio.webp',
      '/cases/Ruta Teatro Bogotá/rutateatro-grupoteatral.webp'
    ],
    projectDetails: { year: '2025', services: ['Estrategia Digital', 'Desarrollo Web'], team: [] },
    titleEn: 'Digitalizing Bogotá\'s Theater Scene',
    brandDescriptionEn: 'The leading platform to discover and experience theater in the capital, connecting audiences with the most vibrant cultural offerings.',
    situationEn: 'Bogotá\'s theater listings were fragmented. Spectators struggled to find shows in real-time, and theaters lacked a centralized platform to showcase their plays.',
    taskEn: 'Create an integrated digital ecosystem that centralizes theater offerings, optimizes the search experience, and boosts ticket sales through data engineering.',
    actionEn: 'We developed an interactive web platform with dynamic maps, smart listing filters, and a personalized recommendation system, optimized for smooth mobile navigation.',
    resultsEn: [
      { label: 'Web Traffic', value: '200', suffix: '%' },
      { label: 'Ticket Conversion', value: '45', suffix: '%' },
      { label: 'Active Users', value: '15', suffix: 'k+' },
      { label: 'Theater Visibility', value: 'High', suffix: '' },
    ]
  },
  'duvyclass': {
    id: 'duvyclass-001',
    client: 'DuvyClass',
    title: 'Optimización de CAC y Retención en Belleza Profesional',
    brandDescription: 'Marca premium de productos para el cuidado capilar profesional y salones de alta gama.',
    situation: 'DuvyClass enfrentaba un costo de adquisición (CAC) elevado y una baja recurrencia en su canal digital debido a una experiencia de usuario fragmentada.',
    task: 'Reducir el CAC mediante ingeniería de datos y aumentar el LTV (Life Time Value) del cliente profesional.',
    action: 'Rediseñamos el flujo de conversión y automatizamos el ciclo de recompra mediante CRM y segmentación avanzada por comportamiento de compra.',
    results: [
      { label: 'Reducción CAC', value: '40', suffix: '%' },
      { label: 'Aumento LTV', value: '25', suffix: '%' },
      { label: 'Conversión Web', value: '+55', suffix: '%' },
      { label: 'Recurrencia', value: 'High', suffix: '' },
    ],
    heroImage: '/cases/duvyclass.webp',
    images: ['/cases/duvyclass.webp'],
    projectDetails: { year: '2024', services: ['Data Engineering', 'Growth Marketing'], team: [] }
  },
  'gea-beauty': {
    id: 'gea-beauty-001',
    client: 'Gea Beauty',
    title: 'Ecosistema Digital para Clínicas de Bienestar',
    brandDescription: 'Clínica de medicina estética y bienestar integral con enfoque en resultados naturales y tecnología médica.',
    situation: 'La clínica operaba sin un sistema centralizado de captación, dependiendo excesivamente de referidos manuales y redes sociales efímeras.',
    task: 'Construir un activo digital propio que canalice la demanda y eduque al paciente sobre los procedimientos de alta gama.',
    action: 'Desarrollamos una plataforma de "Apertura" visual que comunica confianza médica y facilita el agendamiento inteligente integrado al CRM de la clínica.',
    results: [
      { label: 'Agendamientos', value: '200', suffix: '%' },
      { label: 'Costo por Lead', value: '-60', suffix: '%' },
      { label: 'Autoridad Marca', value: 'Elite', suffix: '' },
      { label: 'Retención', value: '95', suffix: '%' },
    ],
    heroImage: '/cases/gea-beauty.webp',
    images: ['/cases/gea-beauty.webp'],
    projectDetails: { year: '2025', services: ['UI/UX Design', 'Lead Generation'], team: [] }
  },
  'praxis-school': {
    id: 'praxis-001',
    client: 'Praxis School',
    title: 'Growth e Ingeniería para el Futuro de la Educación',
    brandDescription: 'Plataforma educativa enfocada en habilidades prácticas y formación técnica acelerada.',
    situation: 'Praxis necesitaba escalar su base de alumnos pero su plataforma actual no permitía el tracking preciso de la atribución de ventas.',
    task: 'Implementar un sistema de tracking "full-funnel" y optimizar la landing de ventas para maximizar la conversión en dispositivos móviles.',
    action: 'Auditoría técnica del funnel y rediseño de la arquitectura de información basada en psicología de conversión y optimización de velocidad.',
    results: [
      { label: 'Escalamiento', value: '3', suffix: 'x' },
      { label: 'Velocidad Carga', value: '-80', suffix: '%' },
      { label: 'Conversión Móvil', value: '+70', suffix: '%' },
      { label: 'Ventas Orgánicas', value: '+25', suffix: '%' },
    ],
    heroImage: '/cases/praxis-school.webp',
    images: ['/cases/praxis-school.webp'],
    projectDetails: { year: '2024', services: ['EdTech Engineering', 'Conversion Optimization'], team: [] }
  },
  'message-boutique': {
    id: 'message-001',
    client: 'Message Boutique',
    title: 'Fashion E-commerce: De Catálogo a Plataforma de Conversión',
    brandDescription: 'Boutique de moda femenina con curaduría exclusiva y enfoque en el mercado premium.',
    situation: 'El e-commerce funcionaba como un catálogo estático con procesos de pago complejos que causaban un abandono de carrito del 70%.',
    task: 'Reducir la fricción en el checkout y crear una narrativa visual que justifique el ticket promedio alto de la marca.',
    action: 'Simplificación total del flujo de pago (One-page checkout) y mejora de la performance visual mediante lazy-loading y WebP optimizado.',
    results: [
      { label: 'Abandono Carrito', value: '-50', suffix: '%' },
      { label: 'Ticket Promedio', value: '+30', suffix: '%' },
      { label: 'Ventas Mensuales', value: '+45', suffix: '%' },
      { label: 'Satisfacción', value: '4.9', suffix: '/5' },
    ],
    heroImage: '/cases/message-boutique.webp',
    images: ['/cases/message-boutique.webp'],
    projectDetails: { year: '2025', services: ['E-commerce', 'Visual Strategy'], team: [] }
  },
  'incap': {
    id: 'incap-case-001',
    client: 'Grupo INCAP',
    sector: 'MANUFACTURA · COLOMBIA',
    sectorEn: 'MANUFACTURING · COLOMBIA',
    template: 'bespoke',
    title: 'Modernización de Marca y Estrategia Comercial para Grupo INCAP',
    brandDescription: 'Grupo INCAP es una compañía colombiana que desde 1969 fabrica adhesivos industriales de alto rendimiento para los sectores de madera y muebles, colchones y espumas, calzado y marroquinería. Más de 56 años de maestría técnica al servicio de la industria, con asesoría especializada directamente en la planta del cliente y un compromiso real con la seguridad de los operarios.',
    situation: 'Una marca con más de medio siglo de trayectoria técnica necesitaba que su identidad, su comunicación y su narrativa comercial estuvieran a la altura del liderazgo que ya ejercía en planta. La percepción de marca no reflejaba la profundidad de su conocimiento ni la solidez de su propuesta de valor.',
    task: 'Modernizar y rediseñar la identidad de marca, ordenar la comunicación y construir una estrategia comercial que conectara la maestría técnica de INCAP con el lenguaje y las necesidades de sus clientes industriales.',
    action: 'Junto a MTM Marca tu Marca abordamos el proyecto de punta a punta: rediseño de identidad de marca, sistema de comunicación coherente y una estrategia comercial alineada al negocio. Un trabajo conjunto que recoge la trayectoria de INCAP y la proyecta hacia su próxima etapa de crecimiento.',
    results: [
      { label: 'Trayectoria', value: '56', suffix: '+ años' },
      { label: 'Identidad', value: 'Renovada' },
      { label: 'Comunicación', value: '360°' },
      { label: 'Estrategia Comercial', value: 'Activada' },
    ],
    partner: {
      name: 'MTM Marca tu Marca',
      logo: '/Bestune/MTM-Marca-tu-marca-brand.webp',
    },
    projectDetails: {
      year: '2025',
      services: ['Branding', 'Estrategia de Marca', 'Comunicación', 'Estrategia Comercial'],
      team: [],
    },
    // English translations
    titleEn: 'Brand Modernization and Commercial Strategy for Grupo INCAP',
    brandDescriptionEn: 'Grupo INCAP is a Colombian company that since 1969 has manufactured high-performance industrial adhesives for the wood and furniture, mattress and foam, footwear and leather goods sectors. Over 56 years of technical mastery serving the industry, with specialized advisory directly on the client\'s factory floor and a real commitment to operator safety.',
    situationEn: 'A brand with more than half a century of technical expertise needed its identity, communication, and commercial narrative to match the leadership it already exercised on the factory floor. Brand perception did not reflect the depth of its knowledge nor the strength of its value proposition.',
    taskEn: 'Modernize and redesign the brand identity, structure communication, and build a commercial strategy that connected INCAP\'s technical mastery with the language and needs of its industrial clients.',
    actionEn: 'Together with MTM Marca tu Marca, we approached the project end to end: brand identity redesign, a coherent communication system, and a commercial strategy aligned with the business. A joint effort that captures INCAP\'s legacy and projects it toward its next stage of growth.',
    resultsEn: [
      { label: 'Track Record', value: '56', suffix: '+ years' },
      { label: 'Identity', value: 'Renewed' },
      { label: 'Communication', value: '360°' },
      { label: 'Commercial Strategy', value: 'Activated' },
    ],
    projectDetailsEn: {
      year: '2025',
      services: ['Branding', 'Brand Strategy', 'Communication', 'Commercial Strategy'],
      team: [],
    },
    heroImage: '/incap/incap-hero.webp',
    images: ['/incap/incap-despues.webp', '/incap/incap-antes.webp'],
  }
};

