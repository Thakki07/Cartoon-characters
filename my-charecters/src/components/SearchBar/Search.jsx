import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search characters by name..."
        className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
         className="w-full sm:w-auto ml-3 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-green-600 transition-colors duration-300"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
