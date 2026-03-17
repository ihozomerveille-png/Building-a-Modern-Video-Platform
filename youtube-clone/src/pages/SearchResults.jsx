import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", q],
    queryFn: () => fetchFromAPI(`search.list?part=snippet&q=${q}&maxResults=50&type=video`),
    enabled: !!q,
    staleTime: 1000 * 60 * 5,
  });

  if (!q) {
    return (
      <div className="p-8 text-center min-h-[calc(100vh-65px)] bg-gray-900">
        <p className="text-gray-400 text-lg">Enter a search query</p>
      </div>
    );
  }

  if (isLoading) return <Loader />;
  
  if (isError) {
    const isQuotaError = error?.message?.includes('Quota');
    return (
      <div className="p-8 bg-gray-900 min-h-[calc(100vh-65px)]">
        <div className={`text-white p-4 rounded-lg ${isQuotaError ? 'bg-orange-900' : 'bg-red-900'}`}>
          <h3 className="font-bold">{isQuotaError ? '⚠️ API Quota Limit Reached' : 'Error fetching search results'}</h3>
          <p className="text-sm mt-2">{error?.message || "Something went wrong"}</p>
          {isQuotaError && (
            <p className="text-sm mt-2">
              💡 Free tier limit reached. Try again tomorrow when the quota resets.
            </p>
          )}
        </div>
      </div>
    );
  }

  const videos = data?.items || [];

  return (
    <div className="p-6 md:p-8 bg-gray-900 min-h-[calc(100vh-65px)]">
      <h2 className="text-3xl font-bold mb-6 text-white">
        Search Results for <span className="text-red-600">"{q}"</span>
      </h2>
      
      {videos.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <p className="text-lg">No videos found. Try another search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {videos.map((video) => (
            <VideoCard key={video.id.videoId || video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;