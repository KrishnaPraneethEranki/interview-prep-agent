import { NextResponse } from 'next/server';
import { sessionService } from '@/features/session/session.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId = 'mockUser', trackId, categoryId } = body;

    if (!trackId || !categoryId) {
      return NextResponse.json(
        { error: 'trackId and categoryId are required' },
        { status: 400 }
      );
    }

    const newSession = sessionService.createSession(userId, trackId, categoryId);

    return NextResponse.json(newSession, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
