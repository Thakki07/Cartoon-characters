import './App.css';
import { useState } from 'react';
import Filters from './components/filter/Filters';
import CharacterList from './components/cards/Cards';
import Search from './components/SearchBar/Search';

function App() {
  const [filters, setFilters] = useState({ status: "", species: "", gender: "" });
  const [searchItem, setSearchTerm] = useState('');

  const handleFilterChange = (key, value) => {
    if (key === "reset") {
      setFilters({ status: "", species: "", gender: "" });
    } else {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      {/* Header Section */}
      <div className="w-full bg-gradient-to-r from-blue-400 via-indigo-500 to-cyan-800 py-8 shadow-lg"
>
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-black drop-shadow-lg">
          Rick and Morty Character Cards
        </h1>
        <div className="w-full max-w-xl mx-auto mt-6 px-4">
          <Search onSearch={handleSearch} />
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full flex flex-col md:flex-row gap-6 px-4 py-8 md:px-12 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-950 min-h-screen text-cyan-900">
        {/* Sticky Sidebar */}
        <div className="md:w-1/4 sticky top-6 self-start bg-gradient-to-b from-gray-600 to-gray-800 p-4 rounded-xl shadow-md">
          <Filters onChange={handleFilterChange} values={filters} />
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <CharacterList filters={filters} searchItem={searchItem} />
        </div>
      </div>
    </>
  );
}


export default App;