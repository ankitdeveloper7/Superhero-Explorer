import React from "react";

export function MovieCard({ item, tab, openModal }) {
  const getImage = (item) => {
    if (item.thumbnail && item.thumbnail.path) {
      return item.thumbnail.path + "." + item.thumbnail.extension;
    }
    return "https://via.placeholder.com/300x450";
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer border border-gray-200"
      onClick={() => openModal(item)}
    >
      <div className="relative">
        <img
          src={getImage(item)}
          alt={item.title}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x450";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg">
            {item.title}
          </h3>
          <p className="text-white/80 text-sm">
            Year: {item.startYear || "Unknown"}
          </p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2">
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {item.description || "No description available"}
        </p>
        <div className="flex justify-between items-center">
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
            {tab === "movies" ? "Movie" : "Comic"}
          </span>
          <span className="text-gray-500 text-sm">
            Year: {item.startYear || "Unknown"}
          </span>
        </div>
      </div>
    </div>
  );
}
