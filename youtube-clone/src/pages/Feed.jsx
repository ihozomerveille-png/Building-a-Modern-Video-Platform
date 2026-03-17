import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New');

  const { data, isLoading, isError } = useQuery({
    queryKey: ["videos", selectedCategory],
    queryFn: () => {
      if (selectedCategory === 'New') {
        return fetchFromAPI("videos?part=snippet,statistics&chart=mostPopular&regionCode=US");
      } else {
        return fetchFromAPI(`search?part=snippet&q=${selectedCategory}`);
      }
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-white text-center mt-10">Error fetching videos</p>;

  const categories = ['New', 'Coding', 'Music', 'Gaming', 'React', 'JavaScript', 'Python', 'Comedy'];

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <div className="flex-1 p-5">
        <h2 className="text-2xl font-bold mb-4 text-white">{selectedCategory} Videos</h2>
        <div className="flex overflow-x-auto mb-4 space-x-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data?.items?.map((video) => (
            <VideoCard key={video.id.videoId || video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;