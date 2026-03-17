const Feed = () => {
  const dummyVideos = [
    { id: 1, title: "Video 1" },
    { id: 2, title: "Video 2" },
    { id: 3, title: "Video 3" },
  ];

  return (
    <div>
      <h1>Video Platform</h1>
      {dummyVideos.map((video) => (
        <p key={video.id}>{video.title}</p>
      ))}
    </div>
  );
};

export default Feed;