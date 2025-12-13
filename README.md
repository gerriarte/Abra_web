# A:BRA Website

Strategic Digital Engineering Agency - Bilingual Website (EN/ES)

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit: `http://localhost:3000`

### Environment Variables

Configure the following variables in `.env.local`:

**Required for contact form:**
```
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CONTACT_FROM_EMAIL=
CONTACT_RECIPIENT_EMAIL=
```

**Optional for analytics:**
```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

All secrets must be provided via environment variables—never commit credentials to the repository.

## 📋 Features

- ✅ **Next.js 16** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS v4** for styling
- ✅ **next-intl** for bilingual support (EN/ES)
- ✅ **Material Design** principles
- ✅ **Security Validations** (Rate limiting, XSS protection, Zod validation)
- ✅ **Responsive Design** with mobile-first approach
- ✅ **Scroll Animations** and micro-interactions
- ✅ **Dynamic Header** with scroll-based color transition
- ✅ **Projects Carousel** with draggable functionality
- ✅ **Contact Form** with multiple service selection and custom inquiry
- ✅ **Complete SEO** (Open Graph, Twitter Cards, JSON-LD schemas, Sitemap, Robots)
- ✅ **Google Tag Manager** integration

## 📁 Project Structure

```
├── app/
│   ├── [locale]/          # Locale-specific pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/
│   ├── analytics/         # Google Tag Manager
│   ├── layout/            # Header, Footer
│   ├── sections/          # Hero, Problem, Method, Result, Projects, Contact
│   └── ui/                # Reusable UI components
├── lib/
│   ├── i18n/              # i18n configuration
│   ├── utils/             # Utility functions (rate limiting, sanitization)
│   └── validation/        # Zod schemas
├── hooks/                 # Custom React hooks
├── messages/              # Translation files (en.json, es.json)
└── public/                # Static assets
```

## 🌐 Internationalization

The website is fully bilingual (English/Spanish) using `next-intl`:
- **English**: `/en/*`
- **Spanish**: `/es/*` (default)

Translation files are in `messages/en.json` and `messages/es.json`.

## 🔒 Security Features

- ✅ **Client-side**: Honeypot field, Zod validation, HTML5 validation
- ✅ **Server-side**: Rate limiting (5 req/15min), input sanitization, Zod validation
- ✅ **XSS Protection**: Input sanitization removes HTML tags and scripts
- ✅ **Privacy**: Checkbox acceptance of terms and privacy policy

## 🚀 Deployment

Para instrucciones completas de despliegue, configuración de variables de entorno y setup, consulta la [Documentación Completa](./docs/README.md).

### Quick Start:

1. **Go to [Vercel](https://vercel.com)**
2. **Import from GitHub**: Select `gerriarte/Abra_web`
3. **Configure Environment Variables** (ver [docs/setup/README.md](./docs/setup/README.md))
4. **Deploy**

**Documentación completa**: [docs/README.md](./docs/README.md)

## 📝 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📄 License

© 2025 A:BRA - Strategic Digital Engineering

## 🔗 Links

- [GitHub Repository](https://github.com/gerriarte/Abra_web)
- [Live Site](https://abra-web.vercel.app)
