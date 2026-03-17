import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";
import VideoDetails from "./pages/VideoDetails";
import ChannelDetails from "./pages/ChannelDetails";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/video/:id" element={<VideoDetails />} />
        <Route path="/channel/:id" element={<ChannelDetails />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;