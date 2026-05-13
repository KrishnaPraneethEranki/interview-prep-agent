import { NextResponse } from 'next/server';
import { sessionService } from '@/features/session/session.service';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const body = await request.json();
    const { questionId, answer } = body;

    if (!questionId || typeof answer !== 'string') {
      return NextResponse.json(
        { error: 'questionId and answer are required' },
        { status: 400 }
      );
    }

    const evaluatedQuestion = sessionService.submitAnswer(sessionId, questionId, answer);

    return NextResponse.json(evaluatedQuestion, { status: 200 });
  } catch (error: any) {
    if (error.message === 'Session question not found') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
