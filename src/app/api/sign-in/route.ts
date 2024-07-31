import { NextResponse } from 'next/server';

import { signIn } from '@/server/actions/auth-actions';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await signIn(formData);

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
