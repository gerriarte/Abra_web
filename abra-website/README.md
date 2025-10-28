# A:BRA Website

Strategic Digital Engineering Agency - Bilingual Website (EN/ES)

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit: `http://localhost:3000`

## 📋 Features

- ✅ **Next.js 14+** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS v4** for styling
- ✅ **next-intl** for bilingual support (EN/ES)
- ✅ **Material Design** principles
- ✅ **Security Validations** (Rate limiting, XSS protection, Zod validation)
- ✅ **Responsive Design** with mobile-first approach

## 📁 Project Structure

```
abra-website/
├── app/
│   ├── [locale]/          # Locale-specific pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/
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

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Optional: Add any required environment variables
```

### Development

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

## 🎨 Design System

### Colors

```css
--color-primary: #04213B
--color-primary-light: #0a3a5f
--color-primary-dark: #03182f
--color-text-primary: #04213B
--color-text-secondary: #2f4f4f
--color-text-muted: #6b7a8a
```

### Typography

- **Headings**: Font weight 300 (light)
- **Body**: System font stack
- **Font sizes**: Fluid typography with responsive scaling

## 🌐 Internationalization

The website is fully bilingual (English/Spanish) using `next-intl`:

- **English**: `/en/*`
- **Spanish**: `/es/*` (default)

Translation files are located in `messages/en.json` and `messages/es.json`.

## 🔒 Security Features

### Form Validation

- ✅ **Client-side**: Honeypot field, Zod validation, HTML5 validation
- ✅ **Server-side**: Rate limiting (5 req/15min), input sanitization, Zod schema validation
- ✅ **XSS Protection**: Input sanitization removes HTML tags, scripts, and event handlers
- ✅ **Rate Limiting**: In-memory rate limiting (scalable to Redis)
- ✅ **Privacy**: Checkbox acceptance of terms and privacy policy

### Implementation

```typescript
// Rate limiting
lib/utils/rateLimit.ts

// Input sanitization
lib/utils/sanitize.ts

// Validation schema
lib/validation/contactSchema.ts
```

## 📱 Sections

### Hero
- Vimeo video background
- Scroll-based animations
- Large typographic headlines

### Problem
- Vertical layout with illustrative SVG icons
- Three main pain points

### Method
- Four pillars approach
- Card-based layout

### Projects
- Draggable carousel
- Navigation dots
- Project showcase

### Contact
- Minimalist form design
- Security validations
- Location and social links

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on Vercel
3. Automatic deployments on every push

### cPanel (Static Export)

```bash
# Build static export
npm run build:static

# Upload 'out' folder to cPanel public_html
```

## 📝 License

© 2025 A:BRA - Strategic Digital Engineering
