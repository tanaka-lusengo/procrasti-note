import { NextRequest } from 'next/server';

import { updateSession } from '@/server/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ['/notes/:path*'],
};
