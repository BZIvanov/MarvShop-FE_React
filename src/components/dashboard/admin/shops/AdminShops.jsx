import { useState } from 'react';

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
import ShopsTable from './ShopsTable';

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

        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-5'>
          <ShopsTable shops={data?.shops} />
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
