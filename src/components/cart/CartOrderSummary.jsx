import { useNavigate } from 'react-router-dom';

import { currencyFormatter } from '../../utils/formatting';
import { useCartSummary } from './hooks/useCartSummary';
import { SHIPPING_FEE } from './constants';

const CartOrderSummary = () => {
  const navigate = useNavigate();

  const { cartProductsCount, cartTotalPrice, cartSellersCount } =
    useCartSummary();

  const shippingFee = cartSellersCount * SHIPPING_FEE;

  const handleToCheckout = () => {
    navigate('/shipping');
  };

  return (
    <div className='bg-white p-3 text-slate-600 flex flex-col gap-3'>
      <h2 className='text-xl font-bold'>Order Summary</h2>
      <div className='flex justify-between items-center'>
        <span>Products ({cartProductsCount})</span>
        <span>{currencyFormatter(cartTotalPrice)}</span>
      </div>
      <div className='flex justify-between items-center'>
        <span>Shipping Fee</span>
        {/* 20 for each seller, maybe refactor the shop to be included? */}
        <span>{currencyFormatter(shippingFee)}</span>
      </div>

      <div className='flex justify-between items-center'>
        <span>Total Price</span>
        <span className='text-lg text-[#059473]'>
          {currencyFormatter(cartTotalPrice + shippingFee)}
        </span>
      </div>
      <button
        onClick={handleToCheckout}
        className='px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-red-500 text-sm text-white uppercase'
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartOrderSummary;
