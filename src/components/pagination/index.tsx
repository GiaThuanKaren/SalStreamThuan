import { useRouter } from "next/router";
import React, { useState } from "react";

interface Props {
  totalPages?: number;
  currentPage: number;
  href: string;
}

const Pagination: React.FC<Props> = ({ totalPages, currentPage, href }) => {
  const [selectedPage, setSelectedPage] = useState<number>(currentPage);
  console.log("Page number pagination ", selectedPage, currentPage);
  const { push } = useRouter();
  const handlePageChange = (page: number) => {
    // setSelectedPage(page);
    push(`${href}?page=${page}`);
  };

  return (
    <div className="text-white flex justify-between items-center py-2">
      <button
        className={`min-w-[100px] h-12 p-2 rounded-full border border-gray-300 ${
          currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      <div className="text-center text-white">
        {currentPage} / {totalPages}
      </div>

      <button
        className={`min-w-[100px] h-12 p-2 rounded-full border border-gray-300 ${
          currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
