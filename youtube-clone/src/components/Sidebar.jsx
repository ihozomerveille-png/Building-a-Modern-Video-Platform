import { useState } from "react";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ['New', 'Coding', 'Music', 'Gaming', 'React', 'JavaScript', 'Python', 'Comedy', 'Trending', 'Live', 'Sports'];
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden md:flex md:w-64 bg-gray-950 text-white flex-col border-r border-gray-800 h-[calc(100vh-65px)] overflow-y-auto p-4`}>
        <h2 className="text-lg font-bold mb-6 text-red-600">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`cursor-pointer px-4 py-2 rounded-lg transition font-medium ${
                selectedCategory === category 
                  ? 'bg-red-600 text-white' 
                  : 'hover:bg-gray-800 text-gray-300'
              }`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Sidebar Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg"
        >
          ☰
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden fixed left-0 top-16 right-0 bottom-0 bg-gray-950 text-white z-30 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4 text-red-600">Categories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer px-4 py-2 rounded-lg transition font-medium ${
                    selectedCategory === category 
                      ? 'bg-red-600 text-white' 
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;