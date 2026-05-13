export default async function TrackPage({ params }: { params: Promise<{ trackId: string }> }) {
  const { trackId } = await params;
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Track View</h1>
      <p>Details for track: {trackId}</p>
    </div>
  );
}
