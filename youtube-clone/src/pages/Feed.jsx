import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const categories = ['New', 'Coding', 'Music', 'Gaming', 'React', 'JavaScript', 'Python', 'Comedy', 'Trending', 'Live', 'Sports'];

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["videos", selectedCategory],
    queryFn: () => {
      let endpoint = '';
      if (selectedCategory === 'New') {
        // Google API endpoint for trending videos
        endpoint = "videos.list?part=snippet,statistics&chart=mostPopular&regionCode=US&maxResults=50";
      } else {
        // Google API endpoint for search
        endpoint = `search.list?part=snippet&q=${selectedCategory}&maxResults=50&type=video`;
      }
      
      console.log('Fetching endpoint:', endpoint);
      return fetchFromAPI(endpoint);
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <Loader />;
  
  if (isError) {
    const isQuotaError = error?.message?.includes('Quota');
    return (
      <div className="flex-1 p-8">
        <div className={`text-white p-4 rounded-lg ${isQuotaError ? 'bg-orange-900' : 'bg-red-900'}`}>
          <h3 className="font-bold">{isQuotaError ? '⚠️ API Quota Limit Reached' : 'Error fetching videos'}</h3>
          <p className="text-sm mt-2">{error?.message || "Please check your API key and try again."}</p>
          {isQuotaError && (
            <p className="text-sm mt-2">
              💡 Free tier limit reached. The app will use cached data. Limit resets daily at UTC midnight.
            </p>
          )}
          <details className="mt-2 text-xs">
            <summary>Error Details</summary>
            <pre className="mt-2 bg-black p-2 rounded overflow-auto">
              {JSON.stringify(error, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    );
  }

  const videos = data?.items || [];

  console.log('Feed - Selected Category:', selectedCategory);
  console.log('Feed - Data:', data);
  console.log('Feed - Videos:', videos);

  return (
    <div className="flex bg-gray-900 min-h-[calc(100vh-65px)]">
      {/* Sidebar */}
      <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      
      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8">
        {/* Category Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {selectedCategory === 'New' ? '🔥 Trending Now' : `${selectedCategory}`}
          </h1>
          
          {/* Category Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
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
            <p className="text-xs mt-2">📋 Open Browser Console (F12) to check API logs</p>
            <details className="mt-4 text-xs inline-block bg-gray-800 p-2 rounded">
              <summary className="cursor-pointer text-red-500 font-bold">⚠️ API Response Data</summary>
              <pre className="mt-2 text-left overflow-auto max-h-64 bg-black p-2 rounded text-xs">
                {JSON.stringify(data, null, 2)}
              </pre>
            </details>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {videos.map((video) => (
              <VideoCard key={video.id.videoId || video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;