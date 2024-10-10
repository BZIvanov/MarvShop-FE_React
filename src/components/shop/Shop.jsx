import { useEffect, useMemo, useState } from 'react';

import { useSelector } from '@/store/store';
import { useGetProductsQuery } from '@/store/services/products';
import { selectFilters } from '@/store/features/productsFilters/productsFiltersSlice';
import Footer from '../footer/Footer';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import RecommendedProducts from '../product/RecommendedProducts';
import ProductsList from '../product/ProductsList';
import Pagination from '../product/Pagination';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import RatingFilter from './RatingFilter';
import { FillGridIcon, ThListIcon } from '@/components/common/icons/Icons';

const perPage = 12;

const Shop = () => {
  const [page, setPage] = useState(1);
  const [priceSortOrder, setPriceSortOrder] = useState('0');

  const [isFilterSectionExpanded, setIsFilterSectionExpanded] = useState(false);
  const [productsDisplayType, setProductsDisplayType] = useState('grid');

  const { text, categories, price, rating } = useSelector(selectFilters);

  const params = useMemo(() => {
    return {
      sortColumn: priceSortOrder !== '0' ? 'price' : 'createdAt',
      order: priceSortOrder !== '0' ? priceSortOrder : '-1',
      page,
      perPage,
      searchText: text,
      categories: categories.join(','),
      price: price.join(','),
      rating: rating || '',
    };
  }, [priceSortOrder, page, text, categories, price, rating]);

  const [queryParams, setQueryParams] = useState(params);

  useEffect(() => {
    const throttle = setTimeout(() => {
      setQueryParams(params);
    }, 500);

    return () => clearTimeout(throttle);
  }, [params]);

  const { data: productsData } = useGetProductsQuery(queryParams);
  const products = productsData?.products || [];
  const totalCount = productsData?.totalCount || 0;

  return (
    <div>
      <Breadcrumbs links={[{ linkTo: '/', label: 'Home' }]} label='Shop' />

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
              <CategoryFilter />
              <PriceFilter />
              <RatingFilter />

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
                    ({totalCount}) Products
                  </h2>
                  <div className='flex justify-center items-center gap-3'>
                    <select
                      onChange={(event) =>
                        setPriceSortOrder(event.target.value)
                      }
                      className='p-1 border outline-0 text-slate-600 font-semibold'
                    >
                      <option value='0'>Sort By</option>
                      <option value='1'>Low to High Price</option>
                      <option value='-1'>High to Low Price</option>
                    </select>
                    <div className='hidden lg:flex justify-center items-start gap-4'>
                      <div
                        onClick={() => setProductsDisplayType('grid')}
                        className={`p-2 ${
                          productsDisplayType === 'grid' && 'bg-slate-300'
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
                      >
                        <FillGridIcon />
                      </div>
                      <div
                        onClick={() => setProductsDisplayType('list')}
                        className={`p-2 ${
                          productsDisplayType === 'list' && 'bg-slate-300'
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
                      >
                        <ThListIcon />
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

                {totalCount > perPage && (
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
