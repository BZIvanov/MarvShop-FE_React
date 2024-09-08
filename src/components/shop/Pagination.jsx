import PropTypes from 'prop-types';
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';

const Pagination = ({
  pageNumber,
  setPageNumber,
  totalItem,
  perPage,
  showItem,
}) => {
  let totalPage = Math.ceil(totalItem / perPage);

  let startPage = pageNumber - Math.floor(showItem / 2);
  let endPage = pageNumber + Math.floor(showItem / 2);

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(showItem, totalPage);
  }

  if (endPage > totalPage) {
    endPage = totalPage;
    startPage = Math.max(1, totalPage - showItem + 1);
  }

  const createBtns = () => {
    const btns = [];
    for (let i = startPage; i <= endPage; i++) {
      btns.push(
        <li
          key={i}
          onClick={() => setPageNumber(i)}
          className={`${
            pageNumber === i
              ? 'bg-green-700 shadow-lg shadow-indigo-300/50 text-white'
              : 'bg-slate-600 hover:bg-green-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]'
          } w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer `}
        >
          {i}
        </li>
      );
    }
    return btns;
  };

  return (
    <ul className='flex gap-3'>
      {pageNumber > 1 && (
        <li
          onClick={() => setPageNumber((prevState) => prevState - 1)}
          className='w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer'
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </li>
      )}
      {createBtns()}
      {pageNumber < totalPage && (
        <li
          onClick={() => setPageNumber((prevState) => prevState + 1)}
          className='w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer'
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </li>
      )}
    </ul>
  );
};

Pagination.propTypes = {
  pageNumber: PropTypes.number,
  setPageNumber: PropTypes.func,
  totalItem: PropTypes.number,
  perPage: PropTypes.number,
  showItem: PropTypes.number,
};

export default Pagination;
