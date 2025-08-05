import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Character card
const CharacterCard = ({ character }) => {
  const [firstEpisode, setFirstEpisode] = useState("");

  useEffect(() => {
    const fetchFirstEpisode = async () => {
      try {
        const res = await axios.get(character.episode[0]);
        setFirstEpisode(res.data.name);
      } catch (err) {
        console.error("Failed to fetch first episode", err);
        setFirstEpisode("Unknown");
      }
    };
    fetchFirstEpisode();
  }, [character]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-72 m-3 hover:border-red-500 hover:border-2">
      <img
        src={character.image}
        alt={character.name}
        className="rounded-xl w-full h-60 object-cover"
      />
      <h2 className="text-lg font-bold mt-2">{character.name}</h2>
      <p className="text-sm text-gray-700">
        {character.status} - {character.species}
        {character.type ? ` - ${character.type}` : ""}
      </p>
      <div className="mt-2">
        <p className="text-xs text-gray-500">Last known location:</p>
        <p className="text-sm">{character.location.name}</p>
      </div>
      <div className="mt-2">
        <p className="text-xs text-gray-500">First seen in:</p>
        <p className="text-sm">{firstEpisode}</p>
      </div>
    </div>
  );
};

// Character list with filters
const CharacterList = ({ filters,searchItem }) => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [pageUrl, setPageUrl] = useState('https://rickandmortyapi.com/api/character');

  // Update page URL when filters change
  useEffect(() => {
    let url = 'https://rickandmortyapi.com/api/character/?';

    if (filters.status) url += `status=${filters.status}&`;
    if (filters.species) url += `species=${filters.species}&`;
    if (filters.gender) url += `gender=${filters.gender}&`;
    if (searchItem) url += `name=${searchItem}&`; 

    setPageUrl(url);
  }, [filters,searchItem]);

  // Fetch data whenever pageUrl changes
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const res = await axios.get(pageUrl);
        setCharacters(res.data.results);
        setInfo(res.data.info);
      } catch (err) {
        console.error("Failed to fetch characters", err);
        setCharacters([]); // Show empty state
        setInfo({});
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [pageUrl]);

  // Pagination
  const handlePrev = () => {
    if (info.prev) setPageUrl(info.prev);
  };

  const handleNext = () => {
    if (info.next) setPageUrl(info.next);
  };

  if (loading) return <p className="text-center mt-10 text-white text-2xl ">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-center">
        {characters.length > 0 ? (
          characters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))
        ) : (
          <p className="text-center text-xl text-red-500 font-semibold">No characters found</p>
        )}
      </div>

      {characters.length > 0 && (
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={handlePrev}
            disabled={!info.prev}
            className={`px-4 py-2 rounded-lg font-medium ${
              info.prev
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!info.next}
            className={`px-4 py-2 rounded-lg font-medium ${
              info.next
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterList;
