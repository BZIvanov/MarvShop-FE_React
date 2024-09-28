import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { useGetProductsQuery } from '@/store/services/products';
import { currencyFormatter } from '@/utils/formatting';

const ButtonGroup = ({ title, next, previous }) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='text-xl font-bold text-slate-600'>{title}</div>
      <div className='flex justify-center items-center gap-3 text-slate-600'>
        <button
          onClick={previous}
          className='w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200'
        >
          <IoIosArrowBack />
        </button>
        <button
          onClick={next}
          className='w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200'
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

ButtonGroup.propTypes = {
  title: PropTypes.string,
  next: PropTypes.func,
  previous: PropTypes.func,
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const RecommendedProducts = ({ title, sortColumn }) => {
  const { data } = useGetProductsQuery({
    page: 1,
    perPage: 9,
    sortColumn,
  });

  // create 3x3 products grid
  const productsGrid = useMemo(() => {
    const products = data?.products || [];

    return products.reduce((acc, _, i) => {
      if (i % 3 === 0) {
        acc.push(products.slice(i, i + 3));
      }
      return acc;
    }, []);
  }, [data]);

  return (
    <div className='flex gap-8 flex-col-reverse'>
      <Carousel
        autoPlay={false}
        infinite={false}
        arrows={false}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup title={title} />}
      >
        {productsGrid.map((gridRow, index) => {
          return (
            <div key={index} className='flex flex-col justify-start gap-2'>
              {gridRow.map((product) => (
                <Link
                  key={product._id}
                  to='/'
                  className='flex justify-start items-start'
                >
                  <img
                    className='w-[110px] h-[110px]'
                    src={product.images[0].imageUrl}
                    alt='Product preview'
                  />
                  <div className='px-3 flex justify-start items-start gap-1 flex-col text-slate-600'>
                    <h2>{product.name}</h2>
                    <span className='text-lg font-bold'>
                      {currencyFormatter(product.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

RecommendedProducts.propTypes = {
  title: PropTypes.string,
  sortColumn: PropTypes.string,
};

export default RecommendedProducts;
