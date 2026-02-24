import { NextRequest, NextResponse } from 'next/server';
import { arrangeColors } from '@/lib/color-arrange';

interface ArrangeBody {
  colors: string[];
  arrange: {
    brightness: number;
    saturation: number;
    warmth: number;
  };
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as ArrangeBody;

  if (!Array.isArray(body.colors) || body.colors.length === 0) {
    return NextResponse.json({ message: 'colors is required' }, { status: 400 });
  }

  const result = arrangeColors(body.colors, body.arrange);
  return NextResponse.json({ colors: result });
}
