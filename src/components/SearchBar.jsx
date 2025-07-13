import React from "react";

export function SearchBar({ search, setSearch, sortBy, handleSort, sortOrder, setSortOrder, handleSearch }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search for movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-red-400 transition-all duration-300"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-medium"
        >
          Search
        </button>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-medium">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-red-400"
          >
            <option value="title">Title</option>
            <option value="year">Year</option>
          </select>
          <button
            onClick={() => {
              if (sortOrder === "asc") {
                setSortOrder("desc");
              } else {
                setSortOrder("asc");
              }
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300"
          >
            {sortOrder === "asc" ? "A to Z" : "Z to A"}
          </button>
        </div>
      </div>
    </div>
  );
} 