import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from '@/store/store';
import { selectCart } from '@/store/features/cart/cartSlice';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CartProductItem from './CartProductItem';
import CartOrderSummary from './CartOrderSummary';

const Cart = () => {
  const cart = useSelector(selectCart);

  const cartProductsIds = useMemo(() => Object.keys(cart), [cart]);
  const cartItemsCount = cartProductsIds.length;

  return (
    <div>
      <Breadcrumbs links={[{ linkTo: '/', label: 'Home' }]} label='Cart' />

      <section className='bg-[#eeeeee] py-16'>
        <div className='w-[90%] md:w-[85%] lg:w-[80%] mx-auto'>
          {cartItemsCount > 0 ? (
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-[67%]'>
                <div className='pr-0 lg:pr-3'>
                  <div className='flex flex-col gap-3'>
                    <div className='bg-white p-4'>
                      <h2 className='text-md text-green-500 font-semibold'>
                        Cart Products ({cartItemsCount})
                      </h2>
                    </div>

                    <div className='flex bg-white p-4 flex-col gap-3'>
                      {cartProductsIds.map((cartProductId) => {
                        const { product, count } = cart[cartProductId];

                        return (
                          <CartProductItem
                            key={product._id}
                            product={product}
                            count={count}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full lg:w-[33%]'>
                <div className='pl-0 lg:pl-3 mt-5 lg:mt-0'>
                  <CartOrderSummary />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className='text-mdfont-semibold mb-3'>Your cart is empty</h2>
              <Link to='/shop' className='px-4 py-1 bg-indigo-500 text-white'>
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
