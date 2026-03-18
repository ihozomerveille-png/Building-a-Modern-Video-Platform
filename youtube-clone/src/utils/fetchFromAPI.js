// Mock YouTube video data for frontend learning
const mockVideos = [
  {
    kind: "youtube#searchResult",
    etag: "1",
    id: { kind: "youtube#video", videoId: "dQw4w9WgXcQ" },
    snippet: {
      publishedAt: "2024-01-15T10:30:00Z",
      title: "React Tutorial - Build a Complete App",
      description: "Learn React from scratch with this comprehensive tutorial",
      thumbnails: {
        default: { url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg", width: 120, height: 90 },
        medium: { url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg", width: 320, height: 180 },
        high: { url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg", width: 480, height: 360 },
      },
      channelTitle: "Code Academy",
      liveBroadcastContent: "none",
    },
    statistics: { viewCount: "1500000", likeCount: "35000", commentCount: "2500" },
  },
  {
    kind: "youtube#searchResult",
    etag: "2",
    id: { kind: "youtube#video", videoId: "9bZkp7q19f0" },
    snippet: {
      publishedAt: "2024-01-14T09:15:00Z",
      title: "JavaScript ES6 Features Explained",
      description: "Master modern JavaScript with ES6 syntax and features",
      thumbnails: {
        default: { url: "https://i.ytimg.com/vi/9bZkp7q19f0/default.jpg", width: 120, height: 90 },
        medium: { url: "https://i.ytimg.com/vi/9bZkp7q19f0/mqdefault.jpg", width: 320, height: 180 },
        high: { url: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg", width: 480, height: 360 },
      },
      channelTitle: "Dev Tips",
      liveBroadcastContent: "none",
    },
    statistics: { viewCount: "2100000", likeCount: "45000", commentCount: "3200" },
  },
  {
    kind: "youtube#searchResult",
    etag: "3",
    id: { kind: "youtube#video", videoId: "PkZNo7MFNFg" },
    snippet: {
      publishedAt: "2024-01-13T14:45:00Z",
      title: "CSS Grid & Flexbox Mastery",
      description: "Create responsive layouts with CSS Grid and Flexbox",
      thumbnails: {
        default: { url: "https://i.ytimg.com/vi/PkZNo7MFNFg/default.jpg", width: 120, height: 90 },
        medium: { url: "https://i.ytimg.com/vi/PkZNo7MFNFg/mqdefault.jpg", width: 320, height: 180 },
        high: { url: "https://i.ytimg.com/vi/PkZNo7MFNFg/hqdefault.jpg", width: 480, height: 360 },
      },
      channelTitle: "Web Dev Simplified",
      liveBroadcastContent: "none",
    },
    statistics: { viewCount: "980000", likeCount: "22000", commentCount: "1800" },
  },
  {
    kind: "youtube#searchResult",
    etag: "4",
    id: { kind: "youtube#video", videoId: "jS4aFq5-91M" },
    snippet: {
      publishedAt: "2024-01-12T16:20:00Z",
      title: "Web APIs You Need to Know",
      description: "Essential Web APIs for modern web development",
      thumbnails: {
        default: { url: "https://i.ytimg.com/vi/jS4aFq5-91M/default.jpg", width: 120, height: 90 },
        medium: { url: "https://i.ytimg.com/vi/jS4aFq5-91M/mqdefault.jpg", width: 320, height: 180 },
        high: { url: "https://i.ytimg.com/vi/jS4aFq5-91M/hqdefault.jpg", width: 480, height: 360 },
      },
      channelTitle: "JavaScript Mastery",
      liveBroadcastContent: "none",
    },
    statistics: { viewCount: "750000", likeCount: "18000", commentCount: "1200" },
  },
  {
    kind: "youtube#searchResult",
    etag: "5",
    id: { kind: "youtube#video", videoId: "reuLqpLrxfY" },
    snippet: {
      publishedAt: "2024-01-11T11:30:00Z",
      title: "Node.js Backend Development Course",
      description: "Build scalable backend applications with Node.js",
      thumbnails: {
        default: { url: "https://i.ytimg.com/vi/reuLqpLrxfY/default.jpg", width: 120, height: 90 },
        medium: { url: "https://i.ytimg.com/vi/reuLqpLrxfY/mqdefault.jpg", width: 320, height: 180 },
        high: { url: "https://i.ytimg.com/vi/reuLqpLrxfY/hqdefault.jpg", width: 480, height: 360 },
      },
      channelTitle: "Programming Hub",
      liveBroadcastContent: "none",
    },
    statistics: { viewCount: "1200000", likeCount: "28000", commentCount: "2100" },
  },
  {
    kind: "youtube#searchResult",
    etag: "6",
    id: { kind: "youtube#video", videoId: "wIyHSOugGGw" },
    snippet: {
      publishedAt: "2024-01-10T13:45:00Z",
      title: "React Hooks Deep Dive",
      description: "Master React Hooks for functional components",
      thumbnails: {
        default: { url: "https://i.ytimg.com/vi/wIyHSOugGGw/default.jpg", width: 120, height: 90 },
        medium: { url: "https://i.ytimg.com/vi/wIyHSOugGGw/mqdefault.jpg", width: 320, height: 180 },
        high: { url: "https://i.ytimg.com/vi/wIyHSOugGGw/hqdefault.jpg", width: 480, height: 360 },
      },
      channelTitle: "React Experts",
      liveBroadcastContent: "none",
    },
    statistics: { viewCount: "890000", likeCount: "19500", commentCount: "1650" },
  },
];

// Simulate API call with mock data for frontend learning
export const fetchFromAPI = async (url) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log('📦 Using mock video data for frontend learning');
  console.log('Requested endpoint:', url);

  // Return mock data for all requests
  const response = {
    items: mockVideos,
    pageInfo: {
      totalResults: mockVideos.length,
      resultsPerPage: mockVideos.length,
    },
  };

  console.log('✅ Mock data returned - Items:', response.items.length);
  return response;
};