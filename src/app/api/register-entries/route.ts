import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    // Path to the dummy data file
    const jsonDirectory = path.join(process.cwd(), 'workingData');
    const fileContents = await fs.readFile(
      jsonDirectory + '/DUMMY_ENTRIES.json',
      'utf8'
    );
    
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading register entries:', error);
    return NextResponse.json(
      { error: 'Failed to load register entries' },
      { status: 500 }
    );
  }
}
