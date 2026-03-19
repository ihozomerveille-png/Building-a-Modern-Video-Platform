import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  if (!video) return null;

  // RapidAPI YouTube138 shape:  { videoId, title, thumbnails, channelName, stats }
  // Mock/Google API shape:      { id: { videoId }, snippet: { title, ... }, statistics }

  const videoId =
    video?.videoId ||           // RapidAPI
    video?.id?.videoId ||       // Google / mock
    (typeof video?.id === "string" ? video.id : null);

  if (!videoId) {
    console.warn("VideoCard: No valid videoId found", video);
    return null;
  }

  // Title
  const title =
    video?.title ||                     // RapidAPI
    video?.snippet?.title ||            // Google / mock
    "Untitled";

  // Thumbnail
  const thumbnail =
    video?.thumbnails?.[0]?.url ||                      // RapidAPI (array)
    video?.snippet?.thumbnails?.medium?.url ||          // Google / mock
    video?.snippet?.thumbnails?.high?.url ||
    video?.snippet?.thumbnails?.default?.url;

  // Channel name
  const channelTitle =
    video?.channelName ||               // RapidAPI
    video?.author?.title ||             // RapidAPI alt
    video?.snippet?.channelTitle ||     // Google / mock
    "Unknown Channel";

  // View count
  const viewCount =
    video?.stats?.views ||              // RapidAPI
    video?.statistics?.viewCount ||     // Google / mock
    null;

  const formattedViews = viewCount
    ? parseInt(viewCount).toLocaleString()
    : "N/A";

  return (
    <Link to={`/video/${videoId}`} className="block group cursor-pointer">
      <div className="bg-gray-800 text-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden bg-gray-700">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/320x180?text=No+Image";
            }}
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-red-500 transition">
            {title}
          </h3>
          <p className="text-gray-400 text-xs mb-1 truncate">{channelTitle}</p>
          <p className="text-gray-500 text-xs">{formattedViews} views</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
