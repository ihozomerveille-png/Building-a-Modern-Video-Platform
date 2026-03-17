import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setQuery('');
    }
  };

  return (
    <nav className="bg-gray-950 text-white p-4 sticky top-0 z-50 shadow-lg border-b border-gray-800">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-red-600">▶ Video Platform</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos..."
            className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-600 w-96 transition"
          />
          <button 
            type="submit" 
            className="px-6 py-2 bg-red-600 rounded-full hover:bg-red-700 transition font-semibold"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;