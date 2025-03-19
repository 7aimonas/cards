import React from "react";

function Pagination({ currentPage, totalPages, handlePageChange }) {
  const getPageNumbers = () => {
    let pages = [];
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    if (startPage > 2) pages.push("...");
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < totalPages - 1) pages.push("...");

    return pages;
  };

  return (
    <div className="pagination">
      
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
      {`<`}
      </button>
      <button onClick={() => handlePageChange(1)} className={currentPage === 1 ? "active" : ""}>
        1
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && handlePageChange(page)}
          className={currentPage === page ? "active" : ""}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}
      {totalPages > 1 && (
        <button onClick={() => handlePageChange(totalPages)} className={currentPage === totalPages ? "active" : ""}>
          {totalPages}
        </button>
      )}
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        >
      </button>
    </div>
  );
}

export default Pagination;
