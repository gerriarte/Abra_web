import { NextRequest, NextResponse } from 'next/server';
import { getHeroSlides, saveHeroSlides } from '@/lib/repositories/heroRepository';
import { logEvent } from '@/lib/utils/logger';

const moduleName = 'api/admin/hero';

export async function GET() {
  try {
    const slides = await getHeroSlides();
    return NextResponse.json({ slides });
  } catch (error) {
    logEvent({
      level: 'error',
      module: moduleName,
      functionName: 'GET',
      message: 'Failed to load hero slides',
      metadata: { error: error instanceof Error ? error.message : 'Unknown error' },
    });
    return NextResponse.json({ error: 'Error reading hero configuration' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slides } = body;

    if (!Array.isArray(slides)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    await saveHeroSlides(slides);

    return NextResponse.json({ success: true });
  } catch (error) {
    logEvent({
      level: 'error',
      module: moduleName,
      functionName: 'POST',
      message: 'Failed to save hero slides',
      metadata: { error: error instanceof Error ? error.message : 'Unknown error' },
    });
    return NextResponse.json({ error: 'Error saving hero configuration' }, { status: 500 });
  }
}

