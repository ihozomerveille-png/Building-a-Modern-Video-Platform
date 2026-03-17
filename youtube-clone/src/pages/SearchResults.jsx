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
    queryFn: () => fetchFromAPI(`search?part=snippet&q=${q}`),
    enabled: !!q,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-white text-center mt-10">Error fetching videos</p>;

  return (
    <div className="p-5 bg-black min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-white">Search Results for "{q}"</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.items?.map((video) => (
          <VideoCard key={video.id.videoId || video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;