import type { Locale } from '@/lib/i18n/config';

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  title: string;
  updatedLabel: string;
  updated: string;
  intro?: string;
  sections: LegalSection[];
}

type LegalContent = Record<Locale, LegalDocument>;

export const privacyPolicy: LegalContent = {
  es: {
    title: 'Política de Privacidad',
    updatedLabel: 'Última actualización',
    updated: '17 de junio de 2026',
    intro: 'A:BRA Latam',
    sections: [
      {
        heading: '1. Información general',
        blocks: [
          {
            type: 'p',
            text: 'A:BRA Latam (en adelante "nosotros" o "la Plataforma") es una herramienta de automatización de gestión de redes sociales operada desde Colombia. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos la información de los usuarios que acceden a nuestros servicios a través de redes.abralatam.com.',
          },
        ],
      },
      {
        heading: '2. Información que recopilamos',
        blocks: [
          {
            type: 'p',
            text: 'Al conectar sus cuentas de redes sociales a nuestra plataforma, recopilamos únicamente la información necesaria para el funcionamiento del servicio, incluyendo:',
          },
          {
            type: 'list',
            items: [
              'Tokens de acceso OAuth de plataformas sociales autorizadas (TikTok, Instagram, Facebook, YouTube, entre otras).',
              'Información básica del perfil público de dichas cuentas (nombre de usuario, foto de perfil, ID de cuenta).',
              'Datos de contenido generados o programados por el usuario dentro de la plataforma.',
              'Información de inicio de sesión en la plataforma (correo electrónico y contraseña cifrada).',
            ],
          },
          {
            type: 'p',
            text: 'No recopilamos datos financieros, documentos de identidad ni información sensible de carácter personal.',
          },
        ],
      },
      {
        heading: '3. Uso de la información',
        blocks: [
          { type: 'p', text: 'La información recopilada se utiliza exclusivamente para:' },
          {
            type: 'list',
            items: [
              'Permitir la conexión y gestión de cuentas de redes sociales vinculadas.',
              'Publicar, programar y gestionar contenido en nombre del usuario en las plataformas autorizadas.',
              'Proveer analíticas e informes sobre el rendimiento del contenido publicado.',
              'Garantizar la seguridad y el correcto funcionamiento de la plataforma.',
            ],
          },
          {
            type: 'p',
            text: 'No vendemos, alquilamos ni compartimos su información personal con terceros con fines comerciales.',
          },
        ],
      },
      {
        heading: '4. Acceso a plataformas de terceros (TikTok y otras redes sociales)',
        blocks: [
          {
            type: 'p',
            text: 'Al conectar su cuenta de TikTok u otras redes sociales, usted autoriza expresamente a A:BRA Latam a acceder a los permisos que indique durante el proceso de autenticación. Estos permisos se utilizan únicamente para publicar y gestionar contenido en su nombre. Puede revocar estos permisos en cualquier momento desde la configuración de su cuenta en cada plataforma.',
          },
        ],
      },
      {
        heading: '5. Almacenamiento y seguridad',
        blocks: [
          {
            type: 'p',
            text: 'Los datos son almacenados en servidores con acceso restringido. Utilizamos cifrado en tránsito (HTTPS/TLS) para proteger la información. Los tokens de acceso de redes sociales son almacenados de forma segura y nunca son expuestos a terceros.',
          },
        ],
      },
      {
        heading: '6. Derechos del usuario',
        blocks: [
          {
            type: 'p',
            text: 'De conformidad con la Ley 1581 de 2012 de Colombia (Ley de Protección de Datos Personales), usted tiene derecho a:',
          },
          {
            type: 'list',
            items: [
              'Conocer, actualizar y rectificar sus datos personales.',
              'Solicitar la eliminación de sus datos de nuestra plataforma.',
              'Revocar la autorización otorgada para el tratamiento de sus datos.',
            ],
          },
          {
            type: 'p',
            text: 'Para ejercer estos derechos, contáctenos en: legal@abralatam.com',
          },
        ],
      },
      {
        heading: '7. Retención de datos',
        blocks: [
          {
            type: 'p',
            text: 'Los datos serán conservados mientras el usuario mantenga una cuenta activa en la plataforma. Al solicitar la eliminación de la cuenta, los datos serán eliminados en un plazo máximo de 30 días.',
          },
        ],
      },
      {
        heading: '8. Cambios a esta política',
        blocks: [
          {
            type: 'p',
            text: 'Nos reservamos el derecho de actualizar esta Política de Privacidad. Notificaremos los cambios relevantes a través de la plataforma o por correo electrónico.',
          },
        ],
      },
      {
        heading: '9. Contacto',
        blocks: [
          {
            type: 'list',
            items: [
              'A:BRA Latam',
              'Colombia',
              'Correo electrónico: legal@abralatam.com',
              'Sitio web: https://abralatam.com',
            ],
          },
        ],
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    updatedLabel: 'Last updated',
    updated: 'June 17, 2026',
    intro: 'A:BRA Latam',
    sections: [
      {
        heading: '1. General information',
        blocks: [
          {
            type: 'p',
            text: 'A:BRA Latam (hereinafter "we" or "the Platform") is a social media management automation tool operated from Colombia. This Privacy Policy describes how we collect, use, and protect the information of users who access our services through redes.abralatam.com.',
          },
        ],
      },
      {
        heading: '2. Information we collect',
        blocks: [
          {
            type: 'p',
            text: 'When you connect your social media accounts to our platform, we collect only the information necessary for the service to function, including:',
          },
          {
            type: 'list',
            items: [
              'OAuth access tokens from authorized social platforms (TikTok, Instagram, Facebook, YouTube, among others).',
              'Basic public profile information from those accounts (username, profile picture, account ID).',
              'Content data created or scheduled by the user within the platform.',
              'Platform login information (email address and encrypted password).',
            ],
          },
          {
            type: 'p',
            text: 'We do not collect financial data, identity documents, or sensitive personal information.',
          },
        ],
      },
      {
        heading: '3. Use of information',
        blocks: [
          { type: 'p', text: 'The information collected is used exclusively to:' },
          {
            type: 'list',
            items: [
              'Enable the connection and management of linked social media accounts.',
              'Publish, schedule, and manage content on behalf of the user on authorized platforms.',
              'Provide analytics and reports on the performance of published content.',
              'Ensure the security and proper functioning of the platform.',
            ],
          },
          {
            type: 'p',
            text: 'We do not sell, rent, or share your personal information with third parties for commercial purposes.',
          },
        ],
      },
      {
        heading: '4. Access to third-party platforms (TikTok and other social networks)',
        blocks: [
          {
            type: 'p',
            text: 'By connecting your TikTok account or other social networks, you expressly authorize A:BRA Latam to access the permissions you indicate during the authentication process. These permissions are used solely to publish and manage content on your behalf. You may revoke these permissions at any time from your account settings on each platform.',
          },
        ],
      },
      {
        heading: '5. Storage and security',
        blocks: [
          {
            type: 'p',
            text: 'Data is stored on servers with restricted access. We use in-transit encryption (HTTPS/TLS) to protect information. Social media access tokens are stored securely and are never exposed to third parties.',
          },
        ],
      },
      {
        heading: '6. User rights',
        blocks: [
          {
            type: 'p',
            text: 'In accordance with Colombian Law 1581 of 2012 (Personal Data Protection Law), you have the right to:',
          },
          {
            type: 'list',
            items: [
              'Access, update, and rectify your personal data.',
              'Request the deletion of your data from our platform.',
              'Revoke the authorization granted for the processing of your data.',
            ],
          },
          {
            type: 'p',
            text: 'To exercise these rights, contact us at: legal@abralatam.com',
          },
        ],
      },
      {
        heading: '7. Data retention',
        blocks: [
          {
            type: 'p',
            text: 'Data will be retained as long as the user maintains an active account on the platform. Upon requesting account deletion, data will be deleted within a maximum of 30 days.',
          },
        ],
      },
      {
        heading: '8. Changes to this policy',
        blocks: [
          {
            type: 'p',
            text: 'We reserve the right to update this Privacy Policy. We will notify relevant changes through the platform or by email.',
          },
        ],
      },
      {
        heading: '9. Contact',
        blocks: [
          {
            type: 'list',
            items: [
              'A:BRA Latam',
              'Colombia',
              'Email: legal@abralatam.com',
              'Website: https://abralatam.com',
            ],
          },
        ],
      },
    ],
  },
};

export const termsOfService: LegalContent = {
  es: {
    title: 'Términos de Servicio',
    updatedLabel: 'Última actualización',
    updated: '17 de junio de 2026',
    intro: 'A:BRA Latam',
    sections: [
      {
        heading: '1. Aceptación de los términos',
        blocks: [
          {
            type: 'p',
            text: 'Al acceder y utilizar la plataforma de A:BRA Latam disponible en redes.abralatam.com, usted acepta quedar vinculado por estos Términos de Servicio. Si no está de acuerdo con alguno de estos términos, le pedimos que no utilice el servicio.',
          },
        ],
      },
      {
        heading: '2. Descripción del servicio',
        blocks: [
          {
            type: 'p',
            text: 'A:BRA Latam es una plataforma de automatización para la gestión y programación de contenido en redes sociales. El servicio permite a los usuarios conectar sus cuentas de plataformas sociales (incluyendo TikTok, Instagram, Facebook, YouTube y otras) para programar publicaciones, gestionar contenido y visualizar métricas desde un único panel de control.',
          },
        ],
      },
      {
        heading: '3. Uso del servicio',
        blocks: [
          {
            type: 'p',
            text: 'El usuario se compromete a utilizar la plataforma de manera lícita y conforme a los términos de uso de cada plataforma de redes sociales conectada. Queda expresamente prohibido utilizar A:BRA Latam para:',
          },
          {
            type: 'list',
            items: [
              'Publicar contenido que infrinja derechos de autor, marcas registradas u otros derechos de propiedad intelectual.',
              'Difundir contenido ilegal, difamatorio, fraudulento o que incite al odio.',
              'Realizar cualquier actividad que viole los términos de servicio de las plataformas de redes sociales conectadas.',
              'Intentar acceder de forma no autorizada a los sistemas de la plataforma.',
            ],
          },
        ],
      },
      {
        heading: '4. Cuentas de usuario',
        blocks: [
          {
            type: 'p',
            text: 'El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso. A:BRA Latam no se hace responsable por accesos no autorizados derivados del incumplimiento de esta obligación por parte del usuario.',
          },
        ],
      },
      {
        heading: '5. Propiedad intelectual',
        blocks: [
          {
            type: 'p',
            text: 'Todo el contenido, diseño, código y materiales de la plataforma son propiedad exclusiva de A:BRA Latam y están protegidos por las leyes de propiedad intelectual aplicables. El usuario retiene todos los derechos sobre el contenido que publique a través de la plataforma.',
          },
        ],
      },
      {
        heading: '6. Disponibilidad del servicio',
        blocks: [
          {
            type: 'p',
            text: 'A:BRA Latam no garantiza la disponibilidad ininterrumpida del servicio. Nos reservamos el derecho de suspender temporalmente el acceso por razones de mantenimiento, seguridad o causas de fuerza mayor, sin que esto genere derecho a compensación alguna.',
          },
        ],
      },
      {
        heading: '7. Integración con plataformas de terceros',
        blocks: [
          {
            type: 'p',
            text: 'La plataforma se conecta con servicios de terceros (TikTok, Meta, Google, etc.) mediante sus APIs oficiales. A:BRA Latam no es responsable por cambios, restricciones o interrupciones en dichas APIs que puedan afectar el funcionamiento del servicio.',
          },
        ],
      },
      {
        heading: '8. Limitación de responsabilidad',
        blocks: [
          {
            type: 'p',
            text: 'A:BRA Latam no será responsable por daños indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso del servicio, incluyendo la pérdida de datos o la interrupción de la actividad comercial.',
          },
        ],
      },
      {
        heading: '9. Modificaciones al servicio',
        blocks: [
          {
            type: 'p',
            text: 'Nos reservamos el derecho de modificar, suspender o discontinuar el servicio o cualquiera de sus funciones en cualquier momento, con o sin previo aviso.',
          },
        ],
      },
      {
        heading: '10. Legislación aplicable',
        blocks: [
          {
            type: 'p',
            text: 'Estos Términos de Servicio se rigen por las leyes de la República de Colombia. Cualquier disputa será sometida a la jurisdicción de los tribunales competentes de Colombia.',
          },
        ],
      },
      {
        heading: '11. Contacto',
        blocks: [
          {
            type: 'list',
            items: [
              'A:BRA Latam',
              'Colombia',
              'Correo electrónico: legal@abralatam.com',
              'Sitio web: https://abralatam.com',
            ],
          },
        ],
      },
    ],
  },
  en: {
    title: 'Terms of Service',
    updatedLabel: 'Last updated',
    updated: 'June 17, 2026',
    intro: 'A:BRA Latam',
    sections: [
      {
        heading: '1. Acceptance of terms',
        blocks: [
          {
            type: 'p',
            text: 'By accessing and using the A:BRA Latam platform available at redes.abralatam.com, you agree to be bound by these Terms of Service. If you do not agree with any of these terms, we ask that you not use the service.',
          },
        ],
      },
      {
        heading: '2. Service description',
        blocks: [
          {
            type: 'p',
            text: 'A:BRA Latam is an automation platform for managing and scheduling content on social media. The service allows users to connect their social platform accounts (including TikTok, Instagram, Facebook, YouTube, and others) to schedule posts, manage content, and view metrics from a single control panel.',
          },
        ],
      },
      {
        heading: '3. Use of the service',
        blocks: [
          {
            type: 'p',
            text: 'The user agrees to use the platform lawfully and in accordance with the terms of use of each connected social media platform. It is expressly prohibited to use A:BRA Latam to:',
          },
          {
            type: 'list',
            items: [
              'Publish content that infringes copyrights, trademarks, or other intellectual property rights.',
              'Distribute illegal, defamatory, fraudulent, or hate-inciting content.',
              'Carry out any activity that violates the terms of service of the connected social media platforms.',
              'Attempt to gain unauthorized access to the platform’s systems.',
            ],
          },
        ],
      },
      {
        heading: '4. User accounts',
        blocks: [
          {
            type: 'p',
            text: 'The user is responsible for maintaining the confidentiality of their access credentials. A:BRA Latam is not responsible for unauthorized access resulting from the user’s failure to comply with this obligation.',
          },
        ],
      },
      {
        heading: '5. Intellectual property',
        blocks: [
          {
            type: 'p',
            text: 'All content, design, code, and materials of the platform are the exclusive property of A:BRA Latam and are protected by applicable intellectual property laws. The user retains all rights to the content they publish through the platform.',
          },
        ],
      },
      {
        heading: '6. Service availability',
        blocks: [
          {
            type: 'p',
            text: 'A:BRA Latam does not guarantee uninterrupted availability of the service. We reserve the right to temporarily suspend access for maintenance, security, or force majeure reasons, without this giving rise to any right to compensation.',
          },
        ],
      },
      {
        heading: '7. Integration with third-party platforms',
        blocks: [
          {
            type: 'p',
            text: 'The platform connects with third-party services (TikTok, Meta, Google, etc.) through their official APIs. A:BRA Latam is not responsible for changes, restrictions, or interruptions in those APIs that may affect the operation of the service.',
          },
        ],
      },
      {
        heading: '8. Limitation of liability',
        blocks: [
          {
            type: 'p',
            text: 'A:BRA Latam shall not be liable for indirect, incidental, or consequential damages arising from the use or inability to use the service, including loss of data or interruption of business activity.',
          },
        ],
      },
      {
        heading: '9. Service modifications',
        blocks: [
          {
            type: 'p',
            text: 'We reserve the right to modify, suspend, or discontinue the service or any of its features at any time, with or without prior notice.',
          },
        ],
      },
      {
        heading: '10. Governing law',
        blocks: [
          {
            type: 'p',
            text: 'These Terms of Service are governed by the laws of the Republic of Colombia. Any dispute shall be submitted to the jurisdiction of the competent courts of Colombia.',
          },
        ],
      },
      {
        heading: '11. Contact',
        blocks: [
          {
            type: 'list',
            items: [
              'A:BRA Latam',
              'Colombia',
              'Email: legal@abralatam.com',
              'Website: https://abralatam.com',
            ],
          },
        ],
      },
    ],
  },
};
