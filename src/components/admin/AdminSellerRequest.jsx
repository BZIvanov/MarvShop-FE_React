import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

import Pagination from '../common/Pagination';
import Search from '../common/Search';

const AdminSellerRequest = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[20px] font-bold mb-3'>Seller Request</h1>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <Search
          setPerPage={setPerPage}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <div className='relative overflow-x-auto'>
          <table className='w-full text-sm text-left text-[#d0d2d6]'>
            <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
              <tr>
                <th scope='col' className='py-3 px-4'>
                  No
                </th>
                <th scope='col' className='py-3 px-4'>
                  Name
                </th>
                <th scope='col' className='py-3 px-4'>
                  Email
                </th>
                <th scope='col' className='py-3 px-4'>
                  Payment Status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4, 5].map((d, i) => (
                <tr className='border-b border-slate-700' key={i}>
                  <td
                    scope='row'
                    className='py-2 px-4 font-medium whitespace-nowrap'
                  >
                    {d}
                  </td>
                  <td
                    scope='row'
                    className='py-2 px-4 font-medium whitespace-nowrap'
                  >
                    Biser Ivanov
                  </td>
                  <td
                    scope='row'
                    className='py-2 px-4 font-medium whitespace-nowrap'
                  >
                    someone@gmail.com
                  </td>
                  <td
                    scope='row'
                    className='py-2 px-4 font-medium whitespace-nowrap'
                  >
                    <span>Inactive</span>
                  </td>
                  <td
                    scope='row'
                    className='py-2 px-4 font-medium whitespace-nowrap'
                  >
                    <span>Pending</span>
                  </td>

                  <td
                    scope='row'
                    className='py-2 px-4 font-medium whitespace-nowrap'
                  >
                    <div className='flex justify-start items-center gap-4'>
                      <Link
                        to='/admin/sellers/2'
                        className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'
                      >
                        <FaEye />
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
            pageNumber={page}
            setPageNumber={setPage}
            totalItem={50}
            perPage={perPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSellerRequest;
