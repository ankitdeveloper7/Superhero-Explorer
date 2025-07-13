import React from "react";

export function Pagination({ page, totalPages, setPage, prevPage, nextPage }) {
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* Previous button */}
      <button
        onClick={prevPage}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          const shouldShow = 
            pageNumber === 1 || 
            pageNumber === totalPages || 
            (pageNumber >= page - 1 && pageNumber <= page + 1);

          if (shouldShow) {
            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                  page === pageNumber
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {pageNumber}
              </button>
            );
          } else if (
            pageNumber === page - 2 || 
            pageNumber === page + 2
          ) {
            return (
              <span key={pageNumber} className="px-2 py-2 text-gray-500">
                ...
              </span>
            );
          }
          return null;
        })}
      </div>

      {/* Next button */}
      <button
        onClick={nextPage}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
} 