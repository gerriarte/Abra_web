import { promises as fs } from 'fs';
import path from 'path';
import { logEvent } from '../utils/logger';

const moduleName = 'lib/repositories/heroRepository';
const HERO_FILE = path.join(process.cwd(), 'public', 'data', 'hero.json');

export type HeroMediaType = 'image' | 'video';

export interface HeroSlide {
  id: number;
  title: string;
  description: string;
  mediaType: HeroMediaType;
  mediaUrl: string;
  ctaLabel?: string;
  ctaHref?: string;
}

interface HeroFileShape {
  slides: HeroSlide[];
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    await ensureFileExists();
    const fileContents = await fs.readFile(HERO_FILE, 'utf8');
    const parsed: HeroFileShape = JSON.parse(fileContents);
    return parsed.slides || [];
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

