# A:BRA Website

Bilingual (EN/ES) corporate website for A:BRA Strategic Digital Engineering Agency.

## Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Internationalization:** next-intl
- **Forms:** React Hook Form + Zod validation
- **Hosting:** Vercel (recommended)

## Project Structure

```
abra-website/
├── app/
│   ├── [locale]/              # Language-specific routes
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/                    # API routes
│   ├── layout.tsx             # Root layout
│   └── globals.css
├── components/                 # React components
│   ├── sections/              # Page sections
│   ├── layout/                # Layout components
│   ├── ui/                    # UI components
│   └── forms/                 # Form components
├── lib/                       # Utilities and configs
│   ├── i18n/                  # i18n configuration
│   └── routing.ts             # Routing config
├── messages/                  # Translation files
│   ├── en.json
│   └── es.json
└── public/                    # Static assets
    ├── abra-blanco.png
    └── abra-negro.png
```

## Color System

- **Primary:** `#04213B` - Main brand color
- **Accent Cyan:** `#00FFFF` - CTAs and highlights
- **Accent Green:** `#39FF14` - Data highlights
- **Background:** `#FFFFFF` / `#F5F5F5`

## Getting Started

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

## Development

The project is organized by features and follows the App Router pattern:

- `/app/[locale]/` - Locale-aware pages
- `/messages/` - Translation strings (JSON)
- `/components/` - Reusable React components

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

Private - A:BRA Agency
