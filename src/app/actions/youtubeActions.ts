import axios from "axios";

const YOUTUBE_CHANNEL_FINDER_URL =
  "https://aitoolapi-g8gacphyfyhzgdbp.southeastasia-01.azurewebsites.net/api/Auth/YoutubeChannelFinder";

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

export const fetchYoutubeChannels = async (
  query: string
): Promise<ChannelData[]> => {
  try {
    const response = await axios.post(YOUTUBE_CHANNEL_FINDER_URL, { query });
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error(`Error: ${response.status}`);
  } catch (error) {
    console.error("Failed to fetch YouTube channels", error);
    throw error;
  }
};
