# A:BRA Website - Strategic Digital Engineering

Bilingual (EN/ES) website for A:BRA agency built with Next.js 16, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
cd abra-website
npm install
npm run dev
```

Visit: `http://localhost:3000`

## 📋 Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **next-intl** - Internationalization (EN/ES)
- **Zod** - Form validation
- **Material Design** - UI/UX principles

## 🌐 Features

- ✅ Fully bilingual (English/Spanish)
- ✅ Minimalist design with scrolling animations
- ✅ Security validations (rate limiting, XSS protection)
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Contact form with validations
- ✅ Dynamic header with scroll effects
- ✅ Projects showcase carousel

## 📁 Project Structure

```
abra-website/          # Next.js application
├── app/              # App Router pages
├── components/       # React components
├── lib/              # Utilities and configs
├── messages/         # Translation files
└── public/           # Static assets
```

## 🚀 Deployment on Vercel

### Step-by-Step Setup:

1. **Go to [Vercel Dashboard](https://vercel.com)**
2. **Click "Add New" → "Project"**
3. **Import from GitHub:**
   - Select repository: `gerriarte/Abra_web`
   - Click "Import"

4. **Configure Project Settings:**
   - **Framework Preset:** Next.js
   - **Root Directory:** Click "Override" → Type: `abra-website`
   - **Build Command:** Leave empty (auto)
   - **Output Directory:** Leave empty (auto)
   - **Install Command:** Leave empty (auto)

5. **Environment Variables:**
   - None required for this project
   - Click "Deploy"

### Alternative: Using Vercel CLI

```bash
npm i -g vercel
cd abra-website
vercel
```

When prompted:
- Set root directory: `abra-website`
- Framework: Next.js
- Deploy

### ⚠️ Important Vercel Settings

Make sure these settings are configured in your Vercel project:

1. Go to **Project Settings** → **General**
2. Set **Root Directory** to: `abra-website`
3. Framework should be auto-detected as **Next.js**

## 📝 Development

```bash
# Install dependencies
cd abra-website
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
- [Live Site](https://your-project.vercel.app)
