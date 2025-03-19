import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  const rangeArray = [];
  for (let i = from; i <= to; i += step) {
    rangeArray.push(i);
  }
  return rangeArray;
};

const Pagination = ({ totalRecords, pageLimit = 30, pageNeighbours = 0, onPageChanged = () => {} }) => {
  const totalPages = Math.ceil(totalRecords / pageLimit);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    gotoPage(1);
  }, []);

  const gotoPage = (page) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
    onPageChanged({ currentPage: newPage, totalPages, pageLimit, totalRecords });
  };

  const handleClick = (page) => {
    gotoPage(page);
  };

  const handleMoveLeft = () => {
    gotoPage(currentPage - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = () => {
    gotoPage(currentPage + pageNeighbours * 2 + 1);
  };

  const fetchPageNumbers = () => {
    if (totalPages <= 1) return [];
    
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];
      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);
      
      if (startPage > 2) pages.unshift(LEFT_PAGE);
      if (endPage < beforeLastPage) pages.push(RIGHT_PAGE);

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  if (!totalRecords || totalPages === 1) return null;

  const pages = fetchPageNumbers();

  return (
    <Fragment>
      <nav aria-label="Pagination">
        <div className="pagination">
          <button onClick={handleMoveLeft} disabled={currentPage === 1}>
            Previous
          </button>
          {pages.map((page, index) => (
            <button
              key={index}
              onClick={() => handleClick(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page === LEFT_PAGE ? "..." : page === RIGHT_PAGE ? "..." : page}
            </button>
          ))}
          <button onClick={handleMoveRight} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </nav>
    </Fragment>
  );
};

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default Pagination;
