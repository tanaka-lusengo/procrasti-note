import { NextRequest, NextResponse } from 'next/server';

import { SESSION_REFRESH_TIME } from '@/utils';

import { decrypt, encrypt } from './actions/helpers';

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('access_token')?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + SESSION_REFRESH_TIME);
  const res = NextResponse.next();

  res.cookies.set({
    name: 'access_token',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires as number | Date,
  });
  return res;
}
