import { NextResponse } from 'next/server';

import { signUp } from '@/server/actions/auth-actions';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await signUp(formData);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
