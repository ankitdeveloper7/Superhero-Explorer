import React from "react";

export function Modal({ showModal, selectedItem, closeModal, tab }) {
  const getImage = (item) => {
    if (item.thumbnail && item.thumbnail.path) {
      return item.thumbnail.path + "." + item.thumbnail.extension;
    }
    return "https://via.placeholder.com/300x450";
  };

  if (!showModal || !selectedItem) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={getImage(selectedItem)}
            alt={selectedItem.title}
            className="w-full h-64 object-cover rounded-t-lg"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x450";
            }}
          />
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-all duration-300"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{selectedItem.title}</h2>
          <div className="flex gap-4 mb-4">
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              {tab === "movies" ? "Movie" : "Comic"}
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Year: {selectedItem.startYear || "Unknown"}
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {selectedItem.description || "No description available"}
          </p>
        </div>
      </div>
    </div>
  );
} 