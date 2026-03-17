import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="bg-black text-white p-4 flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-xl font-bold">Video Platform</h1>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="px-4 py-2 rounded-l bg-gray-800 text-white border-none focus:outline-none"
        />
        <button type="submit" className="px-4 py-2 bg-gray-700 rounded-r hover:bg-gray-600">
          Search
        </button>
      </form>
    </div>
  );
}

export default Navbar;