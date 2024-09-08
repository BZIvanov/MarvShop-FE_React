import PropTypes from 'prop-types';
import { FaEye, FaRegHeart } from 'react-icons/fa';
import { RiShoppingCartLine } from 'react-icons/ri';

import Rating from './Rating';

const ProductsList = ({ productsDisplayType }) => {
  return (
    <div
      className={`w-full grid ${
        productsDisplayType === 'grid'
          ? 'grid-cols-2 xl:grid-cols-3'
          : 'grid-cols-1 xl:grid-cols-2'
      } gap-3`}
    >
      {[1, 2, 3, 4, 5, 6].map((p, i) => (
        <div
          key={i}
          className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 ${
            productsDisplayType === 'grid'
              ? 'flex-col justify-start items-start'
              : 'flex-col lg:flex-row justify-start items-start lg:items-center'
          } w-full gap-4 bg-white p-1 rounded-md`}
        >
          <div
            className={
              productsDisplayType === 'grid'
                ? 'w-full relative group h-[170px] sm:h-[210px] md:h-[270px] overflow-hidden'
                : 'lg:w-full relative group h-[170px] sm:h-[210px] md:h-[270px] overflow-hidden'
            }
          >
            <img
              className='h-[170px] sm:h-[210px] md:h-[270px] rounded-md w-full object-cover'
              src={`/images/logo.png`}
              alt='Product preview'
            />

            <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
              <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                <FaRegHeart />
              </li>
              <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                <FaEye />
              </li>
              <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                <RiShoppingCartLine />
              </li>
            </ul>
          </div>

          <div className='flex justify-start items-start flex-col gap-1'>
            <h2 className='font-bold'>Product Name</h2>
            <div className='flex justify-start items-center gap-3'>
              <span className='text-md font-semibold'>$454</span>
              <div className='flex'>
                <Rating rating={4.5} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

ProductsList.propTypes = {
  productsDisplayType: PropTypes.string,
};

export default ProductsList;
