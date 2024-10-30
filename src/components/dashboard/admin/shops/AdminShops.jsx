import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useGetShopsQuery } from '@/store/services/shops';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Pagination from '@/components/common/Pagination';
import Search from '@/components/common/Search';
import { EyeIcon } from '@/components/common/icons/Icons';

const AdminSellers = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [activitystatus, setActivitystatus] = useState('pending');

  const { data } = useGetShopsQuery({
    page,
    perPage,
    activitystatus,
  });

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[20px] font-bold mb-3'>Shops</h1>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <Search
          perPage={perPage}
          setPerPage={setPerPage}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <div className='mt-2'>
          <Select
            value={activitystatus}
            onValueChange={(newValue) => {
              setActivitystatus(newValue);
            }}
          >
            <SelectTrigger className='w-[140px]'>
              <SelectValue placeholder='Activity status' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Shop activity status</SelectLabel>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='active'>Active</SelectItem>
                <SelectItem value='deactive'>Deactive</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='relative overflow-x-auto'>
          <table className='w-full text-sm text-left text-[#d0d2d6]'>
            <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
              <tr>
                <th scope='col' className='py-3 px-4'>
                  Activity status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Payment status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Owner name
                </th>
                <th scope='col' className='py-3 px-4'>
                  Owner email
                </th>
                <th scope='col' className='py-3 px-4'>
                  Shop name
                </th>
                <th scope='col' className='py-3 px-4'>
                  Country
                </th>
                <th scope='col' className='py-3 px-4'>
                  City
                </th>
                <th scope='col' className='py-3 px-4'>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.shops.map((shop) => (
                <tr key={shop._id}>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    {shop.activitystatus}
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    {shop.paymentStatus}
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    {shop.user.username}
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    {shop.user.email}
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    {shop.shopInfo?.name}
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    {shop.shopInfo?.country}
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    {shop.shopInfo?.city}
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    <div className='flex justify-start items-center gap-4'>
                      <Link
                        to={`/admin/shops/${shop._id}`}
                        className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'
                      >
                        <EyeIcon />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
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

export default AdminSellers;
