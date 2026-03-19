import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const categories = [
    "New", "Coding", "Music", "Gaming", "React",
    "JavaScript", "Python", "Comedy", "Trending", "Live", "Sports",
  ];

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["videos", selectedCategory],
    queryFn: () => {
      const endpoint =
        selectedCategory === "New"
          ? "trending/?geo=US&hl=en&gl=US"
          : `search/?q=${encodeURIComponent(selectedCategory)}&hl=en&gl=US`;

      console.log("Fetching endpoint:", endpoint);
      return fetchFromAPI(endpoint);
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  if (isLoading) return <Loader />;

  if (isError) {
    const isQuotaError = error?.message?.includes("Quota") || error?.message?.includes("quota");
    return (
      <div className="flex-1 p-8">
        <div className={`text-white p-4 rounded-lg ${isQuotaError ? "bg-orange-900" : "bg-red-900"}`}>
          <h3 className="font-bold">
            {isQuotaError ? "⚠️ API Quota Limit Reached" : "❌ Error fetching videos"}
          </h3>
          <p className="text-sm mt-2">{error?.message || "Please check your API key."}</p>
          {isQuotaError && (
            <p className="text-sm mt-2">
              💡 Free tier limit reached. Limit resets daily. Check your RapidAPI dashboard.
            </p>
          )}
        </div>
      </div>
    );
  }

  // RapidAPI YouTube138 returns { contents: [...] } for search
  // and { videos: [...] } for trending
  const videos =
    data?.contents ||
    data?.videos ||
    data?.items ||
    [];

  console.log("Feed - Selected Category:", selectedCategory);
  console.log("Feed - Videos count:", videos.length);

  return (
    <div className="flex bg-gray-900 min-h-[calc(100vh-65px)]">
      {/* Sidebar */}
      <Sidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8">
        {/* Category Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {selectedCategory === "New" ? "🔥 Trending Now" : selectedCategory}
          </h1>

          {/* Category Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Videos Grid */}
        {videos.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="text-lg">No videos found. Try a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {videos.map((item) => {
              // RapidAPI wraps each video in a { video: {...} } object
              const video = item?.video || item;
              return (
                <VideoCard
                  key={video?.videoId || video?.id?.videoId || video?.etag}
                  video={video}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
