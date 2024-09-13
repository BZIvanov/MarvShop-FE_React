import PropTypes from 'prop-types';

import { useDispatch } from '../../store/store';
import { addToCart, removeFromCart } from '../../store/features/cart/cartSlice';
import { currencyFormatter, percentFormatter } from '../../utils/formatting';

const CartProductItem = ({ product, count }) => {
  const dispatch = useDispatch();

  return (
    <div key={product._id} className='w-full flex flex-wrap'>
      <div className='w-full sm:w-7/12 flex gap-2'>
        <div className='flex gap-2 justify-start items-center'>
          <img
            className='w-[80px] h-[80px]'
            src={product.images[0].imageUrl}
            alt='Product preview'
          />
          <div className='pr-4 text-slate-600'>
            <h2 className='text-md font-semibold'>{product.name}</h2>
            <span className='text-sm'>{product.brand}</span>
          </div>
        </div>
      </div>

      <div className='w-full sm:w-5/12 flex justify-between mt-3 sm:mt-0'>
        <div className='flex flex-col justify-center pl-0 sm:pl-4'>
          {product.discount > 0 ? (
            <>
              <h2 className='text-lg text-orange-500'>
                {currencyFormatter(
                  product.price - product.price * product.discount
                )}
              </h2>
              <p className='line-through'>{currencyFormatter(product.price)}</p>
              <p>-{percentFormatter(product.discount)}</p>
            </>
          ) : (
            <h2 className='text-lg'>{currencyFormatter(product.price)}</h2>
          )}
        </div>
        <div className='flex gap-2 flex-col justify-center min-w-28'>
          <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
            <div
              onClick={() => {
                if (count > 0) {
                  dispatch(addToCart({ product, count: count - 1 }));
                }
              }}
              className={`px-3 ${
                count <= 0 ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              -
            </div>
            <div className='px-3'>{count}</div>
            <div
              onClick={() => {
                if (count < product.stock) {
                  dispatch(addToCart({ product, count: count + 1 }));
                }
              }}
              className={`px-3 ${
                count >= product.stock ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              +
            </div>
          </div>
          <button
            onClick={() => dispatch(removeFromCart(product._id))}
            className='px-5 py-[3px] bg-red-500 text-white'
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

CartProductItem.propTypes = {
  product: PropTypes.object,
  count: PropTypes.number,
};

export default CartProductItem;
