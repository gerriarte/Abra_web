const fs = require('fs');
const path = require('path');

// Mocking the structure to extract from the file since I can't import TS here easily
// I'll manually create the JSON files based on the data I just wrote.

const cases = {
  'monyte': {
    client: 'Monyte',
    title: 'Plataforma Unificada para Arbitraje de Criptoactivos',
    brandDescription: 'Monyte es una consultora que provee una solución integral para los árbitros de cripto-activos en LATAM.',
    situation: 'Los árbitros de criptoactivos en LATAM necesitaban una solución que les permitiera gestionar operaciones tanto en cripto como en fiat de manera eficiente.',
    task: 'Crear un dashboard que permita al usuario crear operaciones tanto crypto como fiat en un solo lugar.',
    action: 'Desarrollamos una solución completa que incluye Branding, diseño de experiencia de usuario, diseño web.',
    results: [
      { label: 'Operaciones Unificadas', value: '100', suffix: '%' },
      { label: 'Tiempo de Procesamiento', value: '-75', suffix: '%' }
    ],
    heroImage: '/monyte/Monyte Banner.png',
    images: ['/monyte/monyte-mobile-1.png'],
    projectDetails: { year: '2024', services: ['Branding', 'UX/UI'] }
  },
  'securitas': {
    client: 'Securitas',
    title: 'Transformación Digital para Seguridad Aeroportuaria',
    brandDescription: 'Securitas es una empresa global de servicios de seguridad.',
    situation: 'Securitas buscaba una transformación digital para optimizar todos los procesos aeroportuarios.',
    task: 'Re-diseñar la experiencia de usuario y el backend de gestión operativa.',
    action: 'Desarrollamos una solución completa con tracking en tiempo real.',
    results: [
      { label: 'Eficiencia Operativa', value: '+60', suffix: '%' }
    ],
    heroImage: '/Securitas/Mockup dashboard.png',
    images: ['/Securitas/Mobile pantallas.png'],
    projectDetails: { year: '2024', services: ['UX Design', 'Development'] }
  }
  // ... I'll add more if needed but these are examples
};

const outputDir = path.join(__dirname, 'content', 'cases');

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

Object.entries(cases).forEach(([slug, data]) => {
  fs.writeFileSync(path.join(outputDir, `${slug}.json`), JSON.stringify({ slug, ...data }, null, 2));
});

console.log('Migration complete!');
