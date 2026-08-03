import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    app: 'card-villa-cards',
    timestamp: new Date().toISOString(),
    version: '0.1.0',
  });
}
