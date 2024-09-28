import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateOrderMutation } from '@/store/services/orders';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import BreadcrumbsBanner from '../common/BreadcrumbsBanner';
import { currencyFormatter } from '../../utils/formatting';
import { useCartSummary } from './hooks/useCartSummary';
import { SHIPPING_FEE } from './constants';

const Shipping = () => {
  const navigate = useNavigate();

  const { cart, cartProductsCount, cartTotalPrice, cartSellersCount } =
    useCartSummary();

  const [createOrder] = useCreateOrderMutation();

  const shippingFee = cartSellersCount * SHIPPING_FEE;

  const [isAddressProvided, setIsAddressProvided] = useState(false);

  const [shippingInfoFormValues, setShippingInfoFormValues] = useState({
    fullName: '',
    phone: '',
    postalCode: '',
    country: '',
    city: '',
    street: '',
  });

  const [coupon, setCoupon] = useState('');

  const handleShippingInfoInputChange = (event) => {
    setShippingInfoFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleShippingInfoSubmit = (event) => {
    event.preventDefault();

    const { fullName, phone, postalCode, country, city, street } =
      shippingInfoFormValues;
    if (fullName && phone && postalCode && country && city && street) {
      setIsAddressProvided(true);
    }
  };

  const handleCouponSubmit = (event) => {
    event.preventDefault();
  };

  const placeOrder = async () => {
    const cartProducts = Object.keys(cart).map((cartProductId) => {
      return {
        count: cart[cartProductId].count,
        product: cart[cartProductId].product._id,
        seller: cart[cartProductId].product.seller,
      };
    });

    const result = await createOrder({
      addressInfo: shippingInfoFormValues,
      coupon,
      cart: cartProducts,
    });

    if (!('error' in result)) {
      setShippingInfoFormValues({
        fullName: '',
        phone: '',
        postalCode: '',
        country: '',
        city: '',
        street: '',
      });
      setCoupon('');

      navigate(`/payment/${result.data.order._id}`);
    }
  };

  return (
    <div>
      <Header />

      <BreadcrumbsBanner pageName='Shipping' />

      <section className='bg-[#eeeeee] py-16'>
        <div className='w-[90%] md:w-[85%] lg:w-[80%] mx-auto'>
          <div className='w-full flex flex-wrap'>
            <div className='w-full lg:w-[67%]'>
              <div className='flex flex-col gap-3'>
                <div className='bg-white p-6 shadow-sm rounded-md'>
                  <h2 className='text-slate-600 font-bold pb-3'>
                    Shipping Information
                  </h2>
                  {!isAddressProvided && (
                    <form onSubmit={handleShippingInfoSubmit}>
                      <div className='flex flex-col md:flex-row gap-2 md:gap-5 w-full text-slate-600'>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor='full-name'>Full Name</label>
                          <input
                            name='fullName'
                            value={shippingInfoFormValues.name}
                            onChange={handleShippingInfoInputChange}
                            type='text'
                            id='full-name'
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-sm'
                            placeholder='Full Name'
                          />
                        </div>

                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor='phone'>Phone</label>
                          <input
                            name='phone'
                            value={shippingInfoFormValues.phone}
                            onChange={handleShippingInfoInputChange}
                            type='text'
                            id='phone'
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-sm'
                            placeholder='Phone'
                          />
                        </div>
                      </div>

                      <div className='flex flex-col md:flex-row gap-2 md:gap-5 w-full text-slate-600'>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor='postal-code'>Postal Code</label>
                          <input
                            name='postalCode'
                            value={shippingInfoFormValues.post}
                            onChange={handleShippingInfoInputChange}
                            type='text'
                            id='postal-code'
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-sm'
                            placeholder='Postal Code'
                          />
                        </div>

                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor='country'>Country</label>
                          <input
                            name='country'
                            value={shippingInfoFormValues.province}
                            onChange={handleShippingInfoInputChange}
                            type='text'
                            id='country'
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-sm'
                            placeholder='Country'
                          />
                        </div>
                      </div>

                      <div className='flex flex-col md:flex-row gap-2 md:gap-5 w-full text-slate-600'>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor='city'>City</label>
                          <input
                            name='city'
                            value={shippingInfoFormValues.city}
                            onChange={handleShippingInfoInputChange}
                            type='text'
                            id='city'
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-sm'
                            placeholder='City'
                          />
                        </div>

                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor='street'>Street</label>
                          <input
                            name='street'
                            value={shippingInfoFormValues.area}
                            onChange={handleShippingInfoInputChange}
                            type='text'
                            id='street'
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-sm'
                            placeholder='Street'
                          />
                        </div>
                      </div>

                      <div className='flex flex-col md:flex-row gap-2 md:gap-5 w-full text-slate-600'>
                        <div className='flex flex-col gap-1 mt-7 mb-2 w-full'>
                          <button className='px-3 py-[9px] rounded-sm hover:shadow-green-500/50 hover:shadow-lg bg-green-500 text-white'>
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {isAddressProvided && (
                    <div className='flex flex-col gap-1'>
                      <h2 className='text-slate-600 font-semibold pb-2'>
                        Deliver To {shippingInfoFormValues.name}
                      </h2>
                      <p>
                        <span className='bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded'>
                          Home
                        </span>
                        <span>
                          {shippingInfoFormValues.phone}{' '}
                          {shippingInfoFormValues.address}{' '}
                          {shippingInfoFormValues.province}{' '}
                          {shippingInfoFormValues.city}{' '}
                          {shippingInfoFormValues.area}
                        </span>
                        <span
                          onClick={() => setIsAddressProvided(false)}
                          className='text-indigo-500 cursor-pointer'
                        >
                          Change
                        </span>
                      </p>
                      <p className='text-slate-600 text-sm'>
                        Email To user@mail.com
                      </p>
                    </div>
                  )}
                </div>

                <div className='bg-white p-6 shadow-sm rounded-md'>
                  <h2 className='text-slate-600 font-bold pb-3'>Got Coupon?</h2>
                  <form onSubmit={handleCouponSubmit}>
                    <div className='flex flex-col md:flex-row gap-2 md:gap-5 text-slate-600'>
                      <input
                        name='coupon'
                        value={coupon}
                        onChange={(event) => setCoupon(event.target.value)}
                        type='text'
                        className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-sm'
                        placeholder='Your Coupon'
                      />

                      <button className='w-full md:w-auto px-5 py-[9px] uppercase rounded-sm hover:shadow-green-500/50 hover:shadow-lg bg-green-500 text-white'>
                        Apply
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className='w-full lg:w-[33%]'>
              <div className='pl-0 lg:pl-3 mt-5 lg:mt-0'>
                <div className='bg-white p-3 text-slate-600 flex flex-col gap-3'>
                  <h2 className='text-xl font-bold'>Order Summary</h2>
                  <div className='flex justify-between items-center'>
                    <span>Products ({cartProductsCount})</span>
                    <span>{currencyFormatter(cartTotalPrice)}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span>Shipping Fee</span>
                    <span>{currencyFormatter(shippingFee)}</span>
                  </div>

                  {!coupon && (
                    <div className='flex justify-between items-center'>
                      <span>Total Price</span>
                      <span className='text-lg text-[#059473]'>
                        {currencyFormatter(cartTotalPrice + shippingFee)}
                      </span>
                    </div>
                  )}

                  {coupon && (
                    <>
                      <div className='flex justify-between items-center'>
                        <span>Coupon</span>
                        <span>-20%</span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span>Total Price with Coupon</span>
                        <span className='text-lg text-[#059473]'>$490</span>
                      </div>
                    </>
                  )}

                  <button
                    onClick={placeOrder}
                    disabled={!isAddressProvided}
                    className={`px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg ${
                      isAddressProvided ? 'bg-red-500' : 'bg-red-300'
                    }  text-sm text-white uppercase`}
                  >
                    Place Order
                  </button>
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

export default Shipping;
