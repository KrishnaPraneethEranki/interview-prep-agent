import { SessionFlow } from '@/components/session/SessionFlow';

export default async function SessionPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SessionFlow sessionId={sessionId} />
    </div>
  );
}
