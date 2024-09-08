import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Range } from 'react-range';
import { IoIosArrowForward } from 'react-icons/io';
import { AiFillStar } from 'react-icons/ai';
import { CiStar } from 'react-icons/ci';
import { BsFillGridFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';

import { useGetCategoriesQuery } from '../../store/services/categories';
import Header from './Header';
import Footer from './Footer';
import RecommendedProducts from './RecommendedProducts';
import ProductsList from './ProductsList';
import Pagination from './Pagination';

const Shop = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [filter, setFilter] = useState(false);
  const [filterRange, setFilterRange] = useState({ values: [50, 1500] });
  const [rating, setRating] = useState('');
  const [productsDisplayType, setProductsDisplayType] = useState('grid');

  const { data } = useGetCategoriesQuery();

  return (
    <div>
      <Header />

      <section className='bg-[url("/images/shop-banner.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
          <div className='w-[85%] sm:w-[90%] md:w-[80%] lg:w-[90%] h-full mx-auto'>
            <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
              <h2 className='text-3xl font-bold'>Shop Page</h2>
              <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                <Link to='/'>Home</Link>
                <span className='pt-1'>
                  <IoIosArrowForward />
                </span>
                <span>Shop</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16'>
        <div className='w-[90%] md:w-[85%] lg:w-[80%] h-full mx-auto'>
          <div className={`md:hidden ${filter ? 'mb-6' : 'mb-0'}`}>
            <button
              onClick={() => setFilter((prevState) => !prevState)}
              className='text-center w-full py-2 px-3 bg-indigo-500 text-white'
            >
              Filter Products
            </button>
          </div>

          <div className='w-full flex flex-wrap'>
            <div
              className={`w-full md:w-3/12 pr-8 ${
                filter
                  ? 'h-auto overflow-auto mb-0'
                  : 'h-0 overflow-hidden mb-6 md:h-auto md:overflow-auto md:mb-0'
              }`}
            >
              <div className='py-2 flex flex-col gap-5'>
                <h2 className='text-3xl font-bold mb-3 text-slate-600'>
                  Categories
                </h2>
                <div className='flex flex-col'>
                  {data?.categories.map((category) => {
                    return (
                      <div
                        key={category._id}
                        className='flex justify-start items-center gap-2 py-1'
                      >
                        <input type='checkbox' id={category._id} />
                        <label
                          htmlFor={category._id}
                          className='text-slate-600 block cursor-pointer'
                        >
                          {category.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className='py-2 flex flex-col gap-5'>
                <h2 className='text-3xl font-bold mb-3 text-slate-600'>
                  Price
                </h2>

                <div className='pl-2'>
                  <Range
                    step={5}
                    min={50}
                    max={1500}
                    values={filterRange.values}
                    onChange={(values) => setFilterRange({ values })}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        className='w-full h-[6px] bg-slate-200 rounded-full cursor-pointer'
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        className='w-[15px] h-[15px] bg-[#059473] rounded-full'
                      />
                    )}
                  />
                </div>
                <div>
                  <span className='text-slate-800 font-bold text-lg'>
                    ${Math.floor(filterRange.values[0])} - $
                    {Math.floor(filterRange.values[1])}
                  </span>
                </div>
              </div>

              <div className='py-3 flex flex-col gap-4'>
                <h2 className='text-3xl font-bold mb-3 text-slate-600'>
                  Rating
                </h2>
                <div className='flex flex-col gap-3'>
                  <div
                    onClick={() => setRating(5)}
                    className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                  </div>

                  <div
                    onClick={() => setRating(4)}
                    className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>

                  <div
                    onClick={() => setRating(3)}
                    className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>

                  <div
                    onClick={() => setRating(2)}
                    className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>

                  <div
                    onClick={() => setRating(1)}
                    className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>

                  <div className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>
                </div>
              </div>

              <div className='hidden lg:flex py-5 flex-col gap-4'>
                <RecommendedProducts title='Latest Product' />
              </div>
            </div>

            <div className='w-full md:w-9/12'>
              <div className='pl-0 md:pl-8'>
                <div className='py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border'>
                  <h2 className='text-lg font-medium text-slate-600'>
                    14 Products
                  </h2>
                  <div className='flex justify-center items-center gap-3'>
                    <select
                      name='priceSort'
                      className='p-1 border outline-0 text-slate-600 font-semibold'
                    >
                      <option value=''>Sort By</option>
                      <option value='low-to-high'>Low to High Price</option>
                      <option value='high-to-low'>High to Low Price</option>
                    </select>
                    <div className='hidden lg:flex justify-center items-start gap-4'>
                      <div
                        onClick={() => setProductsDisplayType('grid')}
                        className={`p-2 ${
                          productsDisplayType === 'grid' && 'bg-slate-300'
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
                      >
                        <BsFillGridFill />
                      </div>
                      <div
                        onClick={() => setProductsDisplayType('list')}
                        className={`p-2 ${
                          productsDisplayType === 'list' && 'bg-slate-300'
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
                      >
                        <FaThList />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='pb-8'>
                  <ProductsList productsDisplayType={productsDisplayType} />
                </div>

                <div>
                  <Pagination
                    pageNumber={page}
                    setPageNumber={setPage}
                    totalItem={10}
                    perPage={perPage}
                    showItem={Math.floor(10 / 3)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
