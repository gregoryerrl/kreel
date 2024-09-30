import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar } from "./ui/avatar";
import { fetchYoutubeChannels } from "@/app/actions/youtubeActions";

interface ChannelData {
  channelName: string;
  channelUrl: string;
  channelThumbnail: string;
  channelLocation: string;
  channelDescription: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
}

export default function YouTubeChannelFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ChannelData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const data = await fetchYoutubeChannels(searchQuery);
      setSearchResults(data);
    } catch (err) {
      setError("Failed to fetch channels. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">YouTube Channel Finder</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-white">Find Channels</h3>
        <p className="text-gray-400 mb-4">
          Discover YouTube channels based on keywords or topics.
        </p>
        <div className="flex space-x-2">
          <Input
            placeholder="Enter keywords or topics"
            className="flex-grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search
              </>
            )}
          </Button>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Search Results
          </h3>
          <div className="space-y-4">
            {searchResults.map((channel, index) => (
              <div
                key={index}
                className="bg-gray-700 p-4 rounded-lg flex items-start space-x-4"
              >
                <Avatar className="w-16 h-16">
                  <img
                    src={channel.channelThumbnail}
                    alt={channel.channelName}
                    className="rounded-full"
                  />
                </Avatar>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white">
                    <a
                      href={channel.channelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {channel.channelName}
                    </a>
                  </h4>
                  <p className="text-sm text-gray-400 mb-2">
                    {channel.channelDescription}
                  </p>
                  <div className="flex space-x-4 text-sm text-gray-400">
                    <span>
                      {channel.subscriberCount.toLocaleString()} subscribers
                    </span>
                    <span>{channel.videoCount.toLocaleString()} videos</span>
                    <span>{channel.viewCount.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
