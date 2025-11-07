import { promises as fs } from 'fs';
import path from 'path';
import { logEvent } from '../utils/logger';

const moduleName = 'lib/repositories/heroRepository';
const HERO_FILE = path.join(process.cwd(), 'public', 'data', 'hero.json');

export type HeroMediaType = 'image' | 'video';

export interface HeroSlide {
  id: number;
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  mediaType: HeroMediaType;
  mediaUrl: string;
  ctaLabelEs?: string;
  ctaLabelEn?: string;
  ctaHref?: string;
}

// Legacy slide structure for migration
interface LegacyHeroSlide {
  id: number;
  title?: string;
  titleEs?: string;
  titleEn?: string;
  description?: string;
  descriptionEs?: string;
  descriptionEn?: string;
  mediaType: HeroMediaType;
  mediaUrl: string;
  ctaLabel?: string;
  ctaLabelEs?: string;
  ctaLabelEn?: string;
  ctaHref?: string;
}

interface HeroFileShape {
  slides: HeroSlide[] | LegacyHeroSlide[];
}

function migrateLegacySlide(slide: LegacyHeroSlide): HeroSlide {
  // If already in new format, return as is
  if (slide.titleEs && slide.titleEn && slide.descriptionEs && slide.descriptionEn) {
    return slide as HeroSlide;
  }

  // Migrate from old format
  return {
    id: slide.id,
    titleEs: slide.titleEs || slide.title || '',
    titleEn: slide.titleEn || slide.title || '',
    descriptionEs: slide.descriptionEs || slide.description || '',
    descriptionEn: slide.descriptionEn || slide.description || '',
    mediaType: slide.mediaType,
    mediaUrl: slide.mediaUrl,
    ctaLabelEs: slide.ctaLabelEs || slide.ctaLabel,
    ctaLabelEn: slide.ctaLabelEn || slide.ctaLabel,
    ctaHref: slide.ctaHref,
  };
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    await ensureFileExists();
    const fileContents = await fs.readFile(HERO_FILE, 'utf8');
    const parsed: HeroFileShape = JSON.parse(fileContents);
    const rawSlides = parsed.slides || [];
    
    // Migrate legacy slides if needed
    const migratedSlides = rawSlides.map(migrateLegacySlide);
    
    // If migration happened, save the migrated version
    if (rawSlides.length > 0 && (!rawSlides[0].titleEs || !rawSlides[0].titleEn)) {
      await saveHeroSlides(migratedSlides);
    }
    
    return migratedSlides;
  } catch (error) {
    logEvent({
      level: 'error',
      module: moduleName,
      functionName: 'getHeroSlides',
      message: 'Failed to read hero slides',
      metadata: { error: error instanceof Error ? error.message : 'Unknown error' },
    });
    throw new Error('Unable to load hero configuration');
  }
}

export async function saveHeroSlides(slides: HeroSlide[]): Promise<void> {
  // Check if we're in a read-only filesystem (production/Vercel)
  const isReadOnly = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
  
  if (isReadOnly) {
    logEvent({
      level: 'warn',
      module: moduleName,
      functionName: 'saveHeroSlides',
      message: 'Attempted to save hero slides in read-only environment',
      metadata: { environment: process.env.VERCEL ? 'vercel' : 'production' },
    });
    throw new Error('Cannot save hero slides in production. Changes must be made via Git commit. Please update public/data/hero.json locally and commit to GitHub.');
  }

  try {
    const payload: HeroFileShape = { slides };
    await fs.writeFile(HERO_FILE, JSON.stringify(payload, null, 2), 'utf8');
    logEvent({
      level: 'info',
      module: moduleName,
      functionName: 'saveHeroSlides',
      message: 'Hero slides updated',
      metadata: { count: slides.length },
    });
  } catch (error) {
    logEvent({
      level: 'error',
      module: moduleName,
      functionName: 'saveHeroSlides',
      message: 'Failed to save hero slides',
      metadata: { error: error instanceof Error ? error.message : 'Unknown error' },
    });
    throw new Error('Unable to save hero configuration');
  }
}

async function ensureFileExists() {
  try {
    await fs.access(HERO_FILE);
  } catch {
    const defaultPayload: HeroFileShape = {
      slides: [],
    };
    await fs.mkdir(path.dirname(HERO_FILE), { recursive: true });
    await fs.writeFile(HERO_FILE, JSON.stringify(defaultPayload, null, 2), 'utf8');
    logEvent({
      level: 'info',
      module: moduleName,
      functionName: 'ensureFileExists',
      message: 'Created hero configuration file with defaults',
    });
  }
}

