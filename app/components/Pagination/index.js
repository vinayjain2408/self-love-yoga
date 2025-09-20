import React from 'react';
import PropTypes from 'prop-types';
import { reactIcons } from '@/utils/icon';

const Pagination = ({
  handleNextPage,
  handlePrevPage,
  pageValue,
  totalPages,
}) => {
  return (
    <div className="mt-[28px] pb-[30px] flex items-center justify-end gap-3">
      <button
        className={`p-3 bg-white text-[12px] rounded-[8px] text-[#344054] ${
          pageValue === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={handlePrevPage}
        disabled={pageValue === 1}
      >
        {reactIcons.leftarrow}
      </button>
      <p>{pageValue}</p>
      <button
        // className={
        //   'p-3 rounded-[8px] text-12 bg-gradient-to-l from-[#DFB11E] via-[#FEF888] to-[#F0CF4E] text-[#344054] cursor-pointer'
        // }
        // className={
        //   'p-3 bg-white text-[12px] rounded-[8px] text-[#344054]  cursor-pointer '
        // }
        className={`p-3 text-[12px] rounded-[8px] text-[#344054] ${
          pageValue === totalPages
            ? 'bg-gray-300 cursor-not-allowed opacity-50'
            : 'bg-white cursor-pointer'
        }`}
        onClick={handleNextPage}
        disabled={pageValue === totalPages}
      >
        {reactIcons.rightarroww}
      </button>
    </div>
  );
};

Pagination.propTypes = {
  pageValue: PropTypes.number.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
  // setSkip: PropTypes.func.isRequired,
  // postPerPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Pagination;
