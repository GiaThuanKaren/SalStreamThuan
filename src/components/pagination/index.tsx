import React, { useState } from "react";

interface Props {
  totalPages: number;
  currentPage: number;
}

const Pagination: React.FC<Props> = ({ totalPages, currentPage }) => {
  const [selectedPage, setSelectedPage] = useState(currentPage);

  const handlePageChange = (page: number) => {
    setSelectedPage(page);
  };

  return (
    <div className="text-white flex justify-between items-center py-2">
      <button
        className={`w-12 h-12 p-2 rounded-full border border-gray-300 ${
          selectedPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={selectedPage === 1}
        onClick={() => handlePageChange(selectedPage - 1)}
      >
        Previous
      </button>
      <div className="text-center text-white">
        {selectedPage} / {totalPages}
      </div>
      <button
        className={`w-12 h-12 p-2 rounded-full border border-gray-300 ${
          selectedPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={selectedPage === totalPages}
        onClick={() => handlePageChange(selectedPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
