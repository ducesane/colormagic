import { NextResponse } from 'next/server';
import { getRandomHexColor } from '@/lib/random-color';

export async function GET() {
  return NextResponse.json({ color: getRandomHexColor() });
}
