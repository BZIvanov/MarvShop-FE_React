import { Link } from 'react-router-dom';
import { FaEye, FaRegHeart } from 'react-icons/fa';
import { RiShoppingCartLine } from 'react-icons/ri';

import { useGetProductsQuery } from '../../store/services/products';
import Rating from '../common/Rating';
import { currencyFormatter, percentFormatter } from '../../utils/formatting';

const FeaturedProducts = () => {
  // it will be the latest products, maybe the query should be updated
  const { data } = useGetProductsQuery({
    page: 1,
    perPage: 12,
  });

  return (
    <div className='w-[85%] flex flex-wrap mx-auto py-[45px]'>
      <div className='w-full'>
        <div className='text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]'>
          <h2>Featured Products</h2>
          <div className='w-[100px] h-[2px] bg-[#059473] mt-4'></div>
        </div>
      </div>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {data?.products.map((product) => (
          <div
            key={product._id}
            className='border group transition-all duration-500 hover:shadow-md hover:-mt-3'
          >
            <div className='relative overflow-hidden'>
              {product.discount > 0 ? (
                <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                  {percentFormatter(product.discount)}
                </div>
              ) : null}

              <img
                className='w-full h-[240px]'
                src={product.images[0].imageUrl}
                alt='Product image'
              />

              <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                  <FaRegHeart />
                </li>
                <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                  <Link to={`/products/${product.slug}`}>
                    <FaEye />
                  </Link>
                </li>
                <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                  <RiShoppingCartLine />
                </li>
              </ul>
            </div>

            <div className='py-3 text-slate-600 px-2'>
              <h2 className='font-bold'>{product.name}</h2>
              <div className='flex justify-start items-center gap-3'>
                <span className='text-md font-semibold'>
                  {currencyFormatter(product.price)}
                </span>
                <div className='flex'>
                  <Rating rating={product.rating} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
