import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../utils/fetchFromAPI";

function Feed() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["videos"],
    queryFn: () => fetchFromAPI("search?part=snippet&q=react"),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching videos</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Video Feed
      </h2>

      {data.items.map((video) => (
        <p key={video.id.videoId} className="text-white">
          {video.snippet.title}
        </p>
      ))}

    </div>
  );
}

export default Feed;