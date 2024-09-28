import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetOrderQuery } from '@/store/services/orders';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Card from './Card';
import { currencyFormatter } from '@/utils/formatting';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const { orderId } = useParams();

  const { data } = useGetOrderQuery(orderId, {
    skip: !orderId,
  });
  const order = data?.order || {};

  return (
    <div>
      <Header />

      <section className='bg-[#eeeeee]'>
        <div className='w-[90%] mx-auto py-16 mt-4'>
          <div className='flex flex-wrap'>
            <div className='w-full lg:w-7/12'>
              <div className='pr-0 lg:pr-2'>
                <div className='flex flex-wrap'>
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === 'card' ? 'bg-white' : 'bg-slate-100'
                    }`}
                  >
                    <div className='flex flex-col gap-[3px] justify-center items-center'>
                      <img src='/images/logo.png' alt='Card payment method' />
                    </div>
                    <span className='text-slate-600'>Card</span>
                  </div>
                  <div
                    onClick={() => setPaymentMethod('cash')}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === 'cash' ? 'bg-white' : 'bg-slate-100'
                    }`}
                  >
                    <div className='flex flex-col gap-[3px] justify-center items-center'>
                      <img src='/images/logo.png' alt='Cash payment method' />
                    </div>
                    <span className='text-slate-600'>Cash</span>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div>
                    <Card />
                  </div>
                )}
                {paymentMethod === 'cash' && (
                  <div className='w-full px-4 py-8 bg-white shadow-sm'>
                    <button className='px-10 py-[6px] rounded-sm hover:shadow-green-500/20 hover:shadow-lg bg-[#059473] text-white'>
                      Pay Now
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className='w-full lg:w-5/12'>
              <div className='pl-0 lg:pl-2 lg:mb-0 mt-5 lg:mt-0'>
                <div className='bg-white shadow p-5 text-slate-600 flex flex-col gap-3'>
                  <h2 className='font-bold text-lg'>Order Summary</h2>
                  <div className='flex justify-between items-center'>
                    <span>3 Items and Shipping Fee Included</span>
                    <span>{currencyFormatter(order.totalPrice)}</span>
                  </div>
                  <div className='flex justify-between items-center font-semibold'>
                    <span>Total Amount</span>
                    <span className='text-lg text-green-600'>
                      {currencyFormatter(order.totalPrice)}
                    </span>
                  </div>
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

export default Payment;
