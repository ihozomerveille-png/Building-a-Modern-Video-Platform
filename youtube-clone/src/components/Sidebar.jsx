const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ['New', 'Coding', 'Music', 'Gaming', 'React', 'JavaScript', 'Python', 'Comedy'];

  return (
    <div className="w-64 bg-gray-900 text-white p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`cursor-pointer p-2 rounded mb-1 hover:bg-gray-700 ${
              selectedCategory === category ? 'bg-gray-700' : ''
            }`}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;