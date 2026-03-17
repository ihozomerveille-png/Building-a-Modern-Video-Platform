import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  const { id, snippet, statistics } = video;
  const videoId = id.videoId || id;

  return (
    <Link to={`/video/${videoId}`} className="block">
      <div className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
        <img
          src={snippet.thumbnails.medium.url}
          alt={snippet.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{snippet.title}</h3>
          <p className="text-gray-400 text-sm">{snippet.channelTitle}</p>
          <p className="text-gray-400 text-sm">{statistics?.viewCount ? `${statistics.viewCount} views` : ''}</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;