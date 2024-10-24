import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useGetSellersQuery } from '@/store/services/users';
import Pagination from '@/components/common/Pagination';
import Search from '../common/Search';
import { EyeIcon } from '@/components/common/icons/Icons';

const AdminSellerRequest = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');

  const { data } = useGetSellersQuery({
    page,
    perPage,
    searchText,
    status: 'pending',
  });

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[20px] font-bold mb-3'>Sellers Requests</h1>
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
                  &#8470;
                </th>
                <th scope='col' className='py-3 px-4'>
                  Name
                </th>
                <th scope='col' className='py-3 px-4'>
                  Email
                </th>
                <th scope='col' className='py-3 px-4'>
                  Status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Payment Status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.sellers.map((seller, index) => {
                return (
                  <tr className='border-b border-slate-700' key={seller._id}>
                    <td
                      scope='row'
                      className='py-2 px-4 font-medium whitespace-nowrap'
                    >
                      {index + 1 + (page - 1) * perPage}
                    </td>
                    <td
                      scope='row'
                      className='py-2 px-4 font-medium whitespace-nowrap'
                    >
                      {seller.username}
                    </td>
                    <td
                      scope='row'
                      className='py-2 px-4 font-medium whitespace-nowrap'
                    >
                      {seller.email}
                    </td>
                    <td
                      scope='row'
                      className='py-2 px-4 font-medium whitespace-nowrap'
                    >
                      <span>{seller.sellerInfo.status}</span>
                    </td>
                    <td
                      scope='row'
                      className='py-2 px-4 font-medium whitespace-nowrap'
                    >
                      <span>{seller.sellerInfo.payment}</span>
                    </td>
                    <td
                      scope='row'
                      className='py-2 px-4 font-medium whitespace-nowrap'
                    >
                      <div className='flex justify-start items-center gap-4'>
                        <Link
                          to={`/admin/sellers/${seller._id}`}
                          className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'
                        >
                          <EyeIcon />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {data?.totalCount > perPage && (
          <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
            <Pagination
              pageNumber={page}
              setPageNumber={setPage}
              totalItem={data.totalCount}
              perPage={perPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSellerRequest;
