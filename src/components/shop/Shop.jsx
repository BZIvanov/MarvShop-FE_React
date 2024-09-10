import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { CiStar } from 'react-icons/ci';
import { BsFillGridFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';

import { useSelector } from '../../store/store';
import { useGetCategoriesQuery } from '../../store/services/categories';
import { useGetProductsQuery } from '../../store/services/products';
import { selectFilters } from '../../store/features/productsFilters/productsFiltersSlice';
import Header from '../common/Header';
import Footer from '../common/Footer';
import BreadcrumbsBanner from '../common/BreadcrumbsBanner';
import RecommendedProducts from '../product/RecommendedProducts';
import ProductsList from '../product/ProductsList';
import Pagination from '../product/Pagination';
import PriceFilter from './PriceFilter';

const Shop = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  const [isFilterSectionExpanded, setIsFilterSectionExpanded] = useState(false);
  const [productsDisplayType, setProductsDisplayType] = useState('grid');

  const [rating, setRating] = useState('');

  const { price } = useSelector(selectFilters);

  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.categories || [];

  const { data: productsData } = useGetProductsQuery({
    page,
    perPage,
    price: price.join(','),
  });
  const products = productsData?.products || [];

  return (
    <div>
      <Header />

      <BreadcrumbsBanner pageName='Shop' />

      <section className='py-16'>
        <div className='w-[90%] md:w-[85%] lg:w-[80%] h-full mx-auto'>
          <div
            className={`md:hidden ${isFilterSectionExpanded ? 'mb-6' : 'mb-0'}`}
          >
            <button
              onClick={() =>
                setIsFilterSectionExpanded((prevState) => !prevState)
              }
              className='text-center w-full py-2 px-3 bg-indigo-500 text-white'
            >
              Filter Products
            </button>
          </div>

          <div className='w-full flex flex-wrap'>
            <div
              className={`w-full md:w-3/12 pr-8 ${
                isFilterSectionExpanded
                  ? 'h-auto overflow-auto mb-0'
                  : 'h-0 overflow-hidden mb-6 md:h-auto md:overflow-auto md:mb-0'
              }`}
            >
              <div className='py-2 flex flex-col gap-5'>
                <h2 className='text-3xl font-bold mb-3 text-slate-600'>
                  Categories
                </h2>
                <div className='flex flex-col'>
                  {categories.map((category) => {
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

              <PriceFilter />

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
                <RecommendedProducts
                  title='Latest Products'
                  sortColumn='createdAt'
                />
              </div>
            </div>

            <div className='w-full md:w-9/12'>
              <div className='pl-0 md:pl-8'>
                <div className='py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border'>
                  <h2 className='text-lg font-medium text-slate-600'>
                    {products.length} Products
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
                  <ProductsList
                    productsDisplayType={productsDisplayType}
                    products={products}
                  />
                </div>

                {productsData?.totalCount > perPage && (
                  <div>
                    <Pagination
                      pageNumber={page}
                      setPageNumber={setPage}
                      totalItem={productsData.totalCount}
                      perPage={perPage}
                      showItem={3}
                    />
                  </div>
                )}
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
