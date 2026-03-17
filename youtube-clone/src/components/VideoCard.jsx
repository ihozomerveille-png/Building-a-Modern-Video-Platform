import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  if (!video) {
    console.warn('VideoCard: No video prop provided');
    return null;
  }

  const { id, snippet, statistics } = video;
  
  // Handle different ID structures
  const videoId = id?.videoId || (typeof id === 'string' ? id : null);
  
  if (!videoId) {
    console.warn('VideoCard: No valid videoId found', { id });
    return null;
  }

  const thumbnail = snippet?.thumbnails?.medium?.url || snippet?.thumbnails?.high?.url || snippet?.thumbnails?.default?.url;
  const title = snippet?.title || "Untitled";
  const channelTitle = snippet?.channelTitle || "Unknown Channel";
  const viewCount = statistics?.viewCount ? parseInt(statistics.viewCount).toLocaleString() : "N/A";

  if (!thumbnail) {
    console.warn('VideoCard: No thumbnail found for', title);
  }

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
              e.target.src = 'https://via.placeholder.com/320x180?text=No+Image';
            }}
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-red-500 transition">
            {title}
          </h3>
          <p className="text-gray-400 text-xs mb-1 truncate">{channelTitle}</p>
          <p className="text-gray-500 text-xs">{viewCount} views</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;