import { NextResponse } from 'next/server';
import { sessionService } from '@/features/session/session.service';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const summaryData = sessionService.getSessionSummary(sessionId);

    return NextResponse.json(summaryData, { status: 200 });
  } catch (error: any) {
    if (error.message === 'Session not found') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
