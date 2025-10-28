import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const PROJECTS_FILE = path.join(process.cwd(), 'public', 'data', 'projects.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(PROJECTS_FILE, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading projects:', error);
    return NextResponse.json(
      { error: 'Error reading projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projects } = body;

    // Validate data
    if (!projects || !Array.isArray(projects)) {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      );
    }

    // Write to file
    await fs.writeFile(
      PROJECTS_FILE,
      JSON.stringify({ projects }, null, 2),
      'utf8'
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving projects:', error);
    return NextResponse.json(
      { error: 'Error saving projects' },
      { status: 500 }
    );
  }
}

