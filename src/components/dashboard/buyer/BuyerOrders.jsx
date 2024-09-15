import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';

import Pagination from '../../common/Pagination';
import Search from '../../common/Search';

const BuyerOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(5);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7'>
        <div className='flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>11</h2>
            <span className='text-md font-medium'>Orders</span>
          </div>

          <div className='w-[40px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl'>
            <FaCartShopping className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>

        <div className='flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>3</h2>
            <span className='text-md font-medium'>Pending Orders</span>
          </div>

          <div className='w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl'>
            <FaCartShopping className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>

        <div className='flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>1</h2>
            <span className='text-md font-medium'>Cancelled Orders</span>
          </div>

          <div className='w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl'>
            <FaCartShopping className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>
      </div>

      <h1 className='text-[#000000] font-semibold text-lg my-3'>Orders</h1>

      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        {/* redesign the page selection to be next to the pagination? */}
        <Search
          setPerPage={setPerPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />

        <div className='mt-3'>
          <select className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'>
            <option value='pending'>Pending</option>
            <option value='completed'>Completed</option>
            <option value='cancelled'>Cancelled</option>
          </select>
        </div>

        <div className='relative overflow-x-auto mt-5'>
          <table className='w-full text-sm text-left text-[#d0d2d6]'>
            <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
              <tr>
                <th scope='col' className='py-3 px-4'>
                  Order Id
                </th>
                <th scope='col' className='py-3 px-4'>
                  Price
                </th>
                <th scope='col' className='py-3 px-4'>
                  Payment Status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Order Status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4, 5].map((d, i) => (
                <tr key={i}>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    #5455
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    $455
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    pending
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    pending
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    <div className='flex justify-start items-center gap-4'>
                      <Link>
                        <span className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded'>
                          View
                        </span>
                      </Link>
                      <Link>
                        <span className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded'>
                          Pay Now
                        </span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            perPage={perPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default BuyerOrders;
