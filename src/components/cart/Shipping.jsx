import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

import Header from '../shop/Header';
import Footer from '../shop/Footer';

const Shipping = () => {
  const [res, setRes] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    address: '',
    phone: '',
    post: '',
    province: '',
    city: '',
    area: '',
  });

  const handleInputChange = (event) => {
    setFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, address, phone, post, province, city, area } = formValues;
    if (name && address && phone && post && province && city && area) {
      setRes(true);
    }
  };

  return (
    <div>
      <Header />

      <section className='bg-[url("/images/shop-banner.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
          <div className='w-[85%] sm:w-[90%] md:w-[80%] lg:w-[90%] h-full mx-auto'>
            <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
              <h2 className='text-3xl font-bold'>Shipping Page</h2>
              <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                <Link to='/'>Home</Link>
                <span className='pt-1'>
                  <IoIosArrowForward />
                </span>
                <span>Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-[#eeeeee] py-16'>
        <div className='w-[90%] md:w-[85%] lg:w-[80%] mx-auto'>
          <div className='w-full flex flex-wrap'>
            <div className='w-full lg:w-[67%]'>
              <div className='flex flex-col gap-3'>
                <div className='bg-white p-6 shadow-sm rounded-md'>
                  <h2 className='text-slate-600 font-bold pb-3'>
                    Shipping Information
                  </h2>
                  {!res && (
                    <form onSubmit={handleSubmit}>
                      <div className='flex flex-col md:flex-row gap-2 md:gap-5 w-full text-slate-600'>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor='name'>Name</label>
                          <input
                            name='name'
                            value={formValues.name}
                            onChange={handleInputChange}
                            type='text'
                            id='name'
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            placeholder='Name'
                          />
                        </div>

                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor='address'>Address</label>
                          <input
                            name='address'
                            value={formValues.address}
                            onChange={handleInputChange}
                            type='text'
                            id='address'
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            placeholder='Address'
                          />
                        </div>
                      </div>

                      <div className='flex flex-col md:flex-row gap-2 md:gap-5 w-full text-slate-600'>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor='phone'>Phone</label>
                          <input
                            name='phone'
                            value={formValues.phone}
                            onChange={handleInputChange}
                            type='text'
                            id='phone'
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            placeholder='Phone'
                          />
                        </div>

                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor='post'>Post</label>
                          <input
                            name='post'
                            value={formValues.post}
                            onChange={handleInputChange}
                            type='text'
                            id='post'
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            placeholder='Post'
                          />
                        </div>
                      </div>

                      <div className='flex flex-col md:flex-row gap-2 md:gap-5 w-full text-slate-600'>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor='province'>Province</label>
                          <input
                            name='province'
                            value={formValues.province}
                            onChange={handleInputChange}
                            type='text'
                            id='province'
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            placeholder='Province'
                          />
                        </div>

                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor='city'>City</label>
                          <input
                            name='city'
                            value={formValues.city}
                            onChange={handleInputChange}
                            type='text'
                            id='city'
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            placeholder='City'
                          />
                        </div>
                      </div>

                      <div className='flex flex-col md:flex-row gap-2 md:gap-5 w-full text-slate-600'>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor='area'>Area</label>
                          <input
                            name='area'
                            value={formValues.area}
                            onChange={handleInputChange}
                            type='text'
                            id='area'
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                            placeholder='Area'
                          />
                        </div>

                        <div className='flex flex-col gap-1 mt-7 mb-2 w-full'>
                          <button className='px-3 py-[6px] rounded-sm hover:shadow-green-500/50 hover:shadow-lg bg-green-500 text-white'>
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {res && (
                    <div className='flex flex-col gap-1'>
                      <h2 className='text-slate-600 font-semibold pb-2'>
                        Deliver To {formValues.name}
                      </h2>
                      <p>
                        <span className='bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded'>
                          Home
                        </span>
                        <span>
                          {formValues.phone} {formValues.address}{' '}
                          {formValues.province} {formValues.city}{' '}
                          {formValues.area}
                        </span>
                        <span
                          onClick={() => setRes(false)}
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

                {[1, 2].map((p, i) => (
                  <div key={i} className='flex bg-white p-4 flex-col gap-2'>
                    <div className='flex justify-start items-center'>
                      <h2 className='text-md text-slate-600 font-bold'>
                        Marv Shop
                      </h2>
                    </div>

                    {[1, 2].map((k, j) => (
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
                              <span className='text-sm'>Brand: TestBrand</span>
                            </div>
                          </div>
                        </div>

                        <div className='w-full sm:w-5/12 flex justify-between mt-3 sm:mt-0'>
                          <div className='pl-0 sm:pl-4'>
                            <h2 className='text-lg text-orange-500'>$240</h2>
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
              </div>
            </div>

            <div className='w-full lg:w-[33%]'>
              <div className='pl-0 lg:pl-3 mt-5 lg:mt-0'>
                <div className='bg-white p-3 text-slate-600 flex flex-col gap-3'>
                  <h2 className='text-xl font-bold'>Order Summary</h2>
                  <div className='flex justify-between items-center'>
                    <span>Items Total (5) </span>
                    <span>$343 </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span>Delivery Fee </span>
                    <span>$40 </span>
                  </div>

                  <div className='flex justify-between items-center'>
                    <span>Total Payment </span>
                    <span>$450 </span>
                  </div>

                  <div className='flex justify-between items-center'>
                    <span>Total</span>
                    <span className='text-lg text-[#059473]'>$490 </span>
                  </div>
                  <button
                    disabled={!res}
                    className={`px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg ${
                      res ? 'bg-red-500' : 'bg-red-300'
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
