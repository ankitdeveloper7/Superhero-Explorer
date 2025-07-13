import React from "react";

export function TabButtons({ tab, showMovies, showComics }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-gray-100 rounded-lg p-1">
        <button
          className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
            tab === "movies"
              ? "bg-red-600 text-white shadow-lg"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          onClick={showMovies}
        >
          Movies
        </button>
        <button
          className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
            tab === "comics"
              ? "bg-red-600 text-white shadow-lg"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          onClick={showComics}
        >
          Comics
        </button>
      </div>
    </div>
  );
} 