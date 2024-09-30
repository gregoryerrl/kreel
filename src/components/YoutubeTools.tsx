import { Button } from "./ui/button";

export default function YoutubeTool({
  setFinderPage,
}: {
  setFinderPage: () => void;
}): JSX.Element {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">YouTube Tools</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Youtube Channel Finder
          </h3>
          <p className="text-gray-400">
            Discover YouTube channels based on keywords or topics.
          </p>
          <Button onClick={setFinderPage} className="mt-4">
            Find Channel
          </Button>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Thumbnail Creator
          </h3>
          <p className="text-gray-400">Create eye-catching thumbnails.</p>
          <Button className="mt-4">Create Thumbnail</Button>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Trend Analyzer
          </h3>
          <p className="text-gray-400">Analyze current YouTube trends.</p>
          <Button className="mt-4">Analyze Trends</Button>
        </div>
      </div>
    </div>
  );
}
