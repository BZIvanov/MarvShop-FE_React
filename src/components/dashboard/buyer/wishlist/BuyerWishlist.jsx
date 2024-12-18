import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from '@/store/store';
import {
  useGetWishlistProductsQuery,
  useRemoveFromWishlistMutation,
} from '@/store/services/wishlist';
import { showNotification } from '@/store/features/notification/notificationSlice';
import Rating from '@/components/common/Rating';
import {
  RegHeartIcon,
  EyeIcon,
  ShoppingCartLineIcon,
} from '@/components/common/icons/Icons';
import { currencyFormatter, percentFormatter } from '@/utils/formatting';

const BuyerWishlist = () => {
  const dispatch = useDispatch();

  const { data } = useGetWishlistProductsQuery();
  const products = data?.products || [];

  const [removeFromWishlist, { isSuccess, isLoading }] =
    useRemoveFromWishlistMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showNotification({
          type: 'success',
          message: `Product removed`,
        })
      );
    }
  }, [dispatch, isSuccess]);

  return (
    <div className='m-4'>
      <h2 className='text-[#000000] font-semibold text-lg mb-3'>Wishlist</h2>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {products.map((product) => {
          return (
            <div
              key={product._id}
              className='border group transition-all duration-500 hover:shadow-md hover:-mt-3 bg-white'
            >
              <div className='relative overflow-hidden'>
                {product.discount > 0 && (
                  <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                    {percentFormatter(product.discount)}
                  </div>
                )}

                <img
                  className='w-full sm:w-auto h-[240px]'
                  src={product.images[0].imageUrl}
                  alt='Product preview'
                />

                <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                  <li
                    onClick={() => {
                      if (!isLoading) {
                        removeFromWishlist(product._id);
                      }
                    }}
                    className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'
                  >
                    <RegHeartIcon />
                  </li>
                  <li>
                    <Link
                      to={`/products/${product.slug}`}
                      className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'
                    >
                      <EyeIcon />
                    </Link>
                  </li>
                  <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                    <ShoppingCartLineIcon />
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
          );
        })}

        {products.length === 0 && <p>No wishlist products</p>}
      </div>
    </div>
  );
};

export default BuyerWishlist;
