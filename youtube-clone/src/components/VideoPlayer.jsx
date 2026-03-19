import ReactPlayer from "react-player";

const VideoPlayer = ({ videoId }) => {
  if (!videoId) return null;

  return (
    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        className="absolute top-0 left-0"
        width="100%"
        height="100%"
        controls
        playing
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
              modestbranding: 1,
              rel: 0,
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
