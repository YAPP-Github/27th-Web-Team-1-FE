import { NextResponse } from 'next/server';
import type { GreetingResponse } from '@repo/api-client';

export async function GET() {
  const payload: GreetingResponse = {
    message: 'Welcome to the monorepo powered by TanStack Query.',
  };

  return NextResponse.json(payload, { status: 200 });
}
