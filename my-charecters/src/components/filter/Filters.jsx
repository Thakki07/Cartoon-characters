import React from 'react';

const Filters = ({ onChange, values }) => {
  return (
    <div className="space-y-4 p-4 bg-white rounded-xl shadow-lg">
      <div>
        <label className="block font-medium">Status:</label>
        <select
          value={values.status}
          onChange={(e) => onChange("status", e.target.value)}
          className="w-full mb-1 px-2 py-2 bg-slate-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Species:</label>
        <select
          value={values.species}
          onChange={(e) => onChange("species", e.target.value)}
          className="w-full mb-1 px-2 py-2 bg-slate-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="robot">Robot</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Gender:</label>
        <select
          value={values.gender}
          onChange={(e) => onChange("gender", e.target.value)}
          className="w-full mb-1 px-2 py-2 bg-slate-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <button
        onClick={() => onChange("reset", "")}
        className="bg-red-500 text-white py-2 px-4 rounded mt-1 hover:bg-green-600 w-full"
      >
        Reset Filters
      </button>
    </div>
  );
};


export default Filters;
