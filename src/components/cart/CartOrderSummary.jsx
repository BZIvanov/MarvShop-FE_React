import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from '../../store/store';
import { selectCart } from '../../store/features/cart/cartSlice';
import { currencyFormatter } from '../../utils/formatting';

const CartOrderSummary = () => {
  const navigate = useNavigate();

  const cart = useSelector(selectCart);

  const cartProductsIds = useMemo(() => Object.keys(cart), [cart]);
  const cartItemsCount = cartProductsIds.length;

  const totalPrice = useMemo(() => {
    return cartProductsIds
      .map((cartProductId) => {
        const {
          product: { price, discount },
          count,
        } = cart[cartProductId];

        return (price - price * discount) * count;
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }, [cart, cartProductsIds]);

  const sellersCount = useMemo(() => {
    return cartProductsIds
      .map((cartProductId) => {
        const {
          product: { sellerId },
        } = cart[cartProductId];

        return sellerId;
      })
      .reduce(
        (accumulator, currentValue) => accumulator.add(currentValue),
        new Set()
      ).size;
  }, [cart, cartProductsIds]);

  const shippingFee = sellersCount * 20;

  const handleToCheckout = () => {
    navigate('/shipping', {
      state: {
        totalPrice,
        shippingFee,
        productsCount: cartItemsCount,
      },
    });
  };

  return (
    <div className='bg-white p-3 text-slate-600 flex flex-col gap-3'>
      <h2 className='text-xl font-bold'>Order Summary</h2>
      <div className='flex justify-between items-center'>
        <span>({cartItemsCount}) Products</span>
        <span>{currencyFormatter(totalPrice)}</span>
      </div>
      <div className='flex justify-between items-center'>
        <span>Shipping Fee</span>
        {/* 20 for each seller, maybe refactor the shop to be included? */}
        <span>{currencyFormatter(shippingFee)}</span>
      </div>
      <div className='flex gap-2'>
        <input
          type='text'
          className='w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm'
          placeholder='Your Coupon'
        />
        <button className='px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-sm'>
          Apply
        </button>
      </div>

      <div className='flex justify-between items-center'>
        <span>Total</span>
        <span className='text-lg text-[#059473]'>
          {currencyFormatter(totalPrice + shippingFee)}
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
