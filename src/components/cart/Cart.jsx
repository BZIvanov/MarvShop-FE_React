import { Link, useNavigate } from 'react-router-dom';

import Header from '../common/Header';
import Footer from '../common/Footer';
import BreadcrumbsBanner from '../common/BreadcrumbsBanner';

const Cart = () => {
  const navigate = useNavigate();

  const cartProducts = [1, 2];
  const outOfStockProducts = [1, 2];

  const redirect = () => {
    navigate('/shipping', {
      state: {
        products: [],
        price: 500,
        shippingFee: 40,
        items: 2,
      },
    });
  };

  return (
    <div>
      <Header />

      <BreadcrumbsBanner pageName='Cart' />

      <section className='bg-[#eeeeee] py-16'>
        <div className='w-[90%] md:w-[85%] lg:w-[80%] mx-auto'>
          {cartProducts.length > 0 || outOfStockProducts > 0 ? (
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-[67%]'>
                <div className='pr-0 lg:pr-3'>
                  <div className='flex flex-col gap-3'>
                    <div className='bg-white p-4'>
                      <h2 className='text-md text-green-500 font-semibold'>
                        Stock Products {cartProducts.length}
                      </h2>
                    </div>

                    {cartProducts.map((p, i) => (
                      <div key={i} className='flex bg-white p-4 flex-col gap-2'>
                        <div className='flex justify-start items-center'>
                          <h2 className='text-md text-slate-600 font-bold'>
                            Marv Shop
                          </h2>
                        </div>

                        {[1, 2].map((p, j) => (
                          <div key={j} className='w-full flex flex-wrap'>
                            <div className='w-full sm:w-7/12 flex gap-2'>
                              <div className='flex gap-2 justify-start items-center'>
                                <img
                                  className='w-[80px] h-[80px]'
                                  src='/images/logo.png'
                                  alt='Product preview'
                                />
                                <div className='pr-4 text-slate-600'>
                                  <h2 className='text-md font-semibold'>
                                    Product Name
                                  </h2>
                                  <span className='text-sm'>
                                    Brand: TestBrand
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className='w-full sm:w-5/12 flex justify-between mt-3 sm:mt-0'>
                              <div className='pl-0 sm:pl-4'>
                                <h2 className='text-lg text-orange-500'>
                                  $240
                                </h2>
                                <p className='line-through'>$300</p>
                                <p>-15%</p>
                              </div>
                              <div className='flex gap-2 flex-col'>
                                <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
                                  <div className='px-3 cursor-pointer'>-</div>
                                  <div className='px-3'>2</div>
                                  <div className='px-3 cursor-pointer'>+</div>
                                </div>
                                <button className='px-5 py-[3px] bg-red-500 text-white'>
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}

                    {outOfStockProducts.length > 0 && (
                      <div className='flex flex-col gap-3'>
                        <div className='bg-white p-4'>
                          <h2 className='text-md text-red-500 font-semibold'>
                            Out of Stock {outOfStockProducts.length}
                          </h2>
                        </div>

                        <div className='bg-white p-4'>
                          {[1].map((p, i) => (
                            <div key={i} className='w-full flex flex-wrap'>
                              <div className='w-full sm:w-7/12 flex gap-2'>
                                <div className='flex gap-2 justify-start items-center'>
                                  <img
                                    className='w-[80px] h-[80px]'
                                    src='/images/logo.png'
                                    alt='Product preview'
                                  />
                                  <div className='pr-4 text-slate-600'>
                                    <h2 className='text-md font-semibold'>
                                      Product Name
                                    </h2>
                                    <span className='text-sm'>
                                      Brand: TestBrand
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className='w-full sm:w-5/12 flex justify-between mt-3 sm:mt-0'>
                                <div className='pl-0 sm:pl-4'>
                                  <h2 className='text-lg text-orange-500'>
                                    $240
                                  </h2>
                                  <p className='line-through'>$300</p>
                                  <p>-15%</p>
                                </div>
                                <div className='flex gap-2 flex-col'>
                                  <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
                                    <div className='px-3 cursor-pointer'>-</div>
                                    <div className='px-3'>2</div>
                                    <div className='px-3 cursor-pointer'>+</div>
                                  </div>
                                  <button className='px-5 py-[3px] bg-red-500 text-white'>
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='w-full lg:w-[33%]'>
                <div className='pl-0 lg:pl-3 mt-5 lg:mt-0'>
                  {cartProducts.length > 0 && (
                    <div className='bg-white p-3 text-slate-600 flex flex-col gap-3'>
                      <h2 className='text-xl font-bold'>Order Summary</h2>
                      <div className='flex justify-between items-center'>
                        <span>2 Items</span>
                        <span>$343</span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span>Shipping Fee</span>
                        <span>$40</span>
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
                        <span className='text-lg text-[#059473]'>$430</span>
                      </div>
                      <button
                        onClick={redirect}
                        className='px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-red-500 text-sm text-white uppercase'
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link className='px-4 py-1 bg-indigo-500 text-white' to='/shop'>
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;
