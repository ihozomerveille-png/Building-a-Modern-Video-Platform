import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import VideoPlayer from "../components/VideoPlayer";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";

const formatCount = (num) => {
  if (!num) return "N/A";
  const n = parseInt(num);
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString();
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
};

const StatBadge = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
    <span className="text-lg">{icon}</span>
    <div>
      <p className="text-white font-bold text-sm leading-none">{value}</p>
      <p className="text-gray-400 text-xs">{label}</p>
    </div>
  </div>
);

const DescriptionBox = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = description?.length > 200;
  return (
    <div className="bg-gray-800 rounded-xl p-4 mt-4">
      <p className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">
        {expanded || !isLong ? description : `${description.slice(0, 200)}...`}
      </p>
      {isLong && (
        <button onClick={() => setExpanded((v) => !v)}
          className="text-red-400 text-xs mt-2 hover:text-red-300 font-semibold">
          {expanded ? "Show less ▲" : "Show more ▼"}
        </button>
      )}
    </div>
  );
};

const VideoDetails = () => {
  const { id: videoId } = useParams();

  const { data: videoData, isLoading: videoLoading } = useQuery({
    queryKey: ["videoDetails", videoId],
    queryFn: () => fetchFromAPI(`video/details/?id=${videoId}&hl=en&gl=US`),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const { data: relatedData, isLoading: relatedLoading } = useQuery({
    queryKey: ["relatedVideos", videoId],
    queryFn: () => fetchFromAPI(`video/related-contents/?id=${videoId}&hl=en&gl=US`),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  if (videoLoading) return <Loader />;

  // RapidAPI YouTube138 response shape
  const title        = videoData?.title || "Video Title";
  const description  = videoData?.description || "";
  const channelTitle = videoData?.author?.title || videoData?.channelTitle || "Unknown Channel";
  const channelId    = videoData?.author?.channelId || videoData?.channelId || "unknown";
  const publishedAt  = videoData?.publishDate || videoData?.publishedAt || "";
  const viewCount    = videoData?.stats?.views || videoData?.statistics?.viewCount || null;
  const likeCount    = videoData?.stats?.likes || videoData?.statistics?.likeCount || null;
  const commentCount = videoData?.stats?.comments || videoData?.statistics?.commentCount || null;

  const relatedRaw = relatedData?.contents || relatedData?.items || [];
  const relatedVideos = relatedRaw
    .filter((item) => item?.type === "video" || item?.video || item?.id?.videoId)
    .map((item) => item?.video || item)
    .filter((v) => v?.videoId || v?.id?.videoId)
    .slice(0, 15);

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">

        {/* Left: Player + Info */}
        <div className="flex-1 min-w-0">
          <div className="rounded-xl overflow-hidden bg-black shadow-2xl">
            <VideoPlayer videoId={videoId} />
          </div>

          <h1 className="text-white text-xl font-bold mt-4 leading-snug">{title}</h1>

          <div className="flex flex-wrap gap-3 mt-4">
            <StatBadge icon="👁️" label="Views"     value={formatCount(viewCount)} />
            <StatBadge icon="👍" label="Likes"     value={formatCount(likeCount)} />
            <StatBadge icon="💬" label="Comments"  value={formatCount(commentCount)} />
            <StatBadge icon="📅" label="Published" value={formatDate(publishedAt)} />
          </div>

          <Link to={`/channel/${channelId}`} className="flex items-center gap-3 mt-5 group w-fit">
            <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 group-hover:bg-red-500 transition">
              {channelTitle?.[0]?.toUpperCase() || "?"}
            </div>
            <div>
              <p className="text-white font-semibold group-hover:text-red-400 transition">{channelTitle}</p>
              <p className="text-gray-400 text-xs">View channel →</p>
            </div>
          </Link>

          {description && <DescriptionBox description={description} />}

          <div className="mt-6 bg-gray-800 rounded-xl p-5">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              💬 Comments
              <span className="text-gray-400 font-normal text-sm">({formatCount(commentCount)})</span>
            </h3>
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-600 flex-shrink-0 flex items-center justify-center text-gray-300 text-sm font-bold">U</div>
              <div className="flex-1 bg-gray-700 rounded-lg px-4 py-3 text-gray-400 text-sm cursor-not-allowed select-none">
                Comments coming soon…
              </div>
            </div>
          </div>
        </div>

        {/* Right: Related Videos */}
        <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0">
          <h2 className="text-white font-bold text-lg mb-4">🎬 Related Videos</h2>
          {relatedLoading ? <Loader /> : relatedVideos.length === 0 ? (
            <p className="text-gray-400 text-sm">No related videos found.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {relatedVideos.map((video) => {
                const id     = video?.videoId || video?.id?.videoId;
                const thumb  = video?.thumbnails?.[0]?.url || video?.snippet?.thumbnails?.medium?.url;
                const vtitle = video?.title || video?.snippet?.title || "Untitled";
                const channel= video?.channelName || video?.author?.title || video?.snippet?.channelTitle || "";
                const views  = video?.stats?.views || video?.statistics?.viewCount || null;
                return (
                  <Link key={id} to={`/video/${id}`}
                    className="flex gap-3 group hover:bg-gray-800 rounded-xl p-2 transition">
                    <div className="w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-700">
                      <img src={thumb} alt={vtitle}
                        className="w-full h-full object-cover group-hover:brightness-75 transition"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/160x90?text=No+Image"; }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-semibold line-clamp-2 group-hover:text-red-400 transition leading-snug">{vtitle}</p>
                      <p className="text-gray-400 text-xs mt-1 truncate">{channel}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{formatCount(views)} views</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default VideoDetails;
