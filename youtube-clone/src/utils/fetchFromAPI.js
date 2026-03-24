import axios from "axios";

const BASE_URL = "https://youtube-v311.p.rapidapi.com";

const options = {
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
    "x-rapidapi-host": "youtube-v311.p.rapidapi.com",
  },
};

// ── Mock fallback data (Google API shape) ─────────────────────────────────────

const mockVideos = [
  {
    kind: "youtube#video",
    id: { kind: "youtube#video", videoId: "dQw4w9WgXcQ" },
    snippet: {
      publishedAt: "2024-01-15T10:30:00Z",
      title: "React Tutorial - Build a Complete App",
      description: "Learn React from scratch with this comprehensive tutorial.",
      channelTitle: "Code Academy",
      channelId: "UC-code-academy",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg" },
        high:   { url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg" },
      },
    },
    statistics: { viewCount: "1500000", likeCount: "35000", commentCount: "2500" },
  },
  {
    kind: "youtube#video",
    id: { kind: "youtube#video", videoId: "9bZkp7q19f0" },
    snippet: {
      publishedAt: "2024-01-14T09:15:00Z",
      title: "JavaScript ES6 Features Explained",
      description: "Master modern JavaScript with ES6 syntax and features.",
      channelTitle: "Dev Tips",
      channelId: "UC-dev-tips",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/9bZkp7q19f0/mqdefault.jpg" },
        high:   { url: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg" },
      },
    },
    statistics: { viewCount: "2100000", likeCount: "45000", commentCount: "3200" },
  },
  {
    kind: "youtube#video",
    id: { kind: "youtube#video", videoId: "PkZNo7MFNFg" },
    snippet: {
      publishedAt: "2024-01-13T14:45:00Z",
      title: "CSS Grid & Flexbox Mastery",
      description: "Create responsive layouts with CSS Grid and Flexbox.",
      channelTitle: "Web Dev Simplified",
      channelId: "UC-webdev",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/PkZNo7MFNFg/mqdefault.jpg" },
        high:   { url: "https://i.ytimg.com/vi/PkZNo7MFNFg/hqdefault.jpg" },
      },
    },
    statistics: { viewCount: "980000", likeCount: "22000", commentCount: "1800" },
  },
  {
    kind: "youtube#video",
    id: { kind: "youtube#video", videoId: "jS4aFq5-91M" },
    snippet: {
      publishedAt: "2024-01-12T16:20:00Z",
      title: "Web APIs You Need to Know",
      description: "Essential Web APIs for modern web development.",
      channelTitle: "JavaScript Mastery",
      channelId: "UC-jsmastery",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/jS4aFq5-91M/mqdefault.jpg" },
        high:   { url: "https://i.ytimg.com/vi/jS4aFq5-91M/hqdefault.jpg" },
      },
    },
    statistics: { viewCount: "750000", likeCount: "18000", commentCount: "1200" },
  },
  {
    kind: "youtube#video",
    id: { kind: "youtube#video", videoId: "reuLqpLrxfY" },
    snippet: {
      publishedAt: "2024-01-11T11:30:00Z",
      title: "Node.js Backend Development Course",
      description: "Build scalable backend applications with Node.js.",
      channelTitle: "Programming Hub",
      channelId: "UC-programminghub",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/reuLqpLrxfY/mqdefault.jpg" },
        high:   { url: "https://i.ytimg.com/vi/reuLqpLrxfY/hqdefault.jpg" },
      },
    },
    statistics: { viewCount: "1200000", likeCount: "28000", commentCount: "2100" },
  },
  {
    kind: "youtube#video",
    id: { kind: "youtube#video", videoId: "wIyHSOugGGw" },
    snippet: {
      publishedAt: "2024-01-10T13:45:00Z",
      title: "React Hooks Deep Dive",
      description: "Master React Hooks for functional components.",
      channelTitle: "React Experts",
      channelId: "UC-reactexperts",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/wIyHSOugGGw/mqdefault.jpg" },
        high:   { url: "https://i.ytimg.com/vi/wIyHSOugGGw/hqdefault.jpg" },
      },
    },
    statistics: { viewCount: "890000", likeCount: "19500", commentCount: "1650" },
  },
  {
    kind: "youtube#video",
    id: { kind: "youtube#video", videoId: "Ke90Tje7VS0" },
    snippet: {
      publishedAt: "2024-01-09T08:00:00Z",
      title: "Python for Beginners - Full Course",
      description: "Learn Python programming from scratch.",
      channelTitle: "Programming with Mosh",
      channelId: "UC-mosh",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/Ke90Tje7VS0/mqdefault.jpg" },
        high:   { url: "https://i.ytimg.com/vi/Ke90Tje7VS0/hqdefault.jpg" },
      },
    },
    statistics: { viewCount: "5000000", likeCount: "120000", commentCount: "8500" },
  },
  {
    kind: "youtube#video",
    id: { kind: "youtube#video", videoId: "W6NZfCO5SIk" },
    snippet: {
      publishedAt: "2024-01-08T10:00:00Z",
      title: "JavaScript Full Course for Beginners",
      description: "Complete JavaScript course for absolute beginners.",
      channelTitle: "Programming with Mosh",
      channelId: "UC-mosh",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/W6NZfCO5SIk/mqdefault.jpg" },
        high:   { url: "https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg" },
      },
    },
    statistics: { viewCount: "3200000", likeCount: "85000", commentCount: "6200" },
  },
  {
    kind: "youtube#video",
    id: { kind: "youtube#video", videoId: "fis26HvvDII" },
    snippet: {
      publishedAt: "2024-01-07T12:00:00Z",
      title: "Next.js 14 Full Course",
      description: "Build full-stack apps with Next.js 14 and React.",
      channelTitle: "Traversy Media",
      channelId: "UC-traversy",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/fis26HvvDII/mqdefault.jpg" },
        high:   { url: "https://i.ytimg.com/vi/fis26HvvDII/hqdefault.jpg" },
      },
    },
    statistics: { viewCount: "1800000", likeCount: "42000", commentCount: "3100" },
  },
  {
    kind: "youtube#video",
    id: { kind: "youtube#video", videoId: "SqcY0GlETPk" },
    snippet: {
      publishedAt: "2024-01-06T09:00:00Z",
      title: "React TypeScript Tutorial",
      description: "Learn how to use TypeScript with React.",
      channelTitle: "The Net Ninja",
      channelId: "UC-netninja",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/SqcY0GlETPk/mqdefault.jpg" },
        high:   { url: "https://i.ytimg.com/vi/SqcY0GlETPk/hqdefault.jpg" },
      },
    },
    statistics: { viewCount: "670000", likeCount: "15000", commentCount: "980" },
  },
];

const getMockResponse = (url) => {
  if (url.includes("videos/") && url.includes("id=")) {
    const idMatch = url.match(/id=([^&]+)/);
    const videoId = idMatch?.[1];
    const found = mockVideos.find((v) => v.id.videoId === videoId) || mockVideos[0];
    return { items: [found] };
  }
  if (url.includes("relatedToVideoId") || url.includes("search/")) {
    return { items: mockVideos.slice(0, 8) };
  }
  if (url.includes("channels/")) {
    return {
      items: [{
        id: "UC-mock",
        snippet: {
          title: "Mock Channel",
          description: "This is a mock channel for development.",
          thumbnails: { high: { url: "https://via.placeholder.com/240x240?text=Channel" } },
        },
        statistics: { subscriberCount: "100000", videoCount: "50" },
      }],
    };
  }
  return { items: mockVideos };
};

// ── Main fetch function ───────────────────────────────────────────────────────

export const fetchFromAPI = async (url) => {
  console.log("🌐 Fetching:", `${BASE_URL}/${url}`);

  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    console.log("✅ API response received");
    return data;
  } catch (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || error.message;
    console.warn("⚠️ API error:", status, message);
    console.log("📦 Falling back to mock data");
    return getMockResponse(url);
  }
};
