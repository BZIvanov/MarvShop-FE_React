import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useGetOrdersQuery } from '@/store/services/orders';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EyeIcon } from '@/components/common/icons/Icons';
import Pagination from '@/components/common/Pagination';
import Search from '@/components/common/Search';
import { currencyFormatter } from '@/utils/formatting';

const BuyerOrders = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState('');

  const { data } = useGetOrdersQuery({
    page,
    perPage,
    deliveryStatus: selectedDeliveryStatus,
  });
  const orders = data?.orders || [];

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[#000000] font-semibold text-lg my-3'>Orders</h1>

      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        {/* redesign the page selection to be next to the pagination? */}
        <Search
          perPage={perPage}
          setPerPage={setPerPage}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <div className='mt-3'>
          <Select
            value={selectedDeliveryStatus}
            onValueChange={(newValue) => {
              setSelectedDeliveryStatus(newValue);
            }}
          >
            <SelectTrigger className='w-[140px]'>
              <SelectValue placeholder='Order status' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Order Status</SelectLabel>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='completed'>Completed</SelectItem>
                <SelectItem value='canceled'>Canceled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-2'>
          <Table className='min-w-full text-left text-sm'>
            <TableHeader>
              <TableRow className='bg-gray-700'>
                <TableHead className='px-4 py-3 text-stone-200 uppercase'>
                  Order ID
                </TableHead>
                <TableHead className='px-4 py-3 text-stone-200 uppercase'>
                  Price
                </TableHead>
                <TableHead className='px-4 py-3 text-stone-200 uppercase'>
                  Delivery Status
                </TableHead>
                <TableHead className='px-4 py-3 text-stone-200 uppercase'>
                  Payment Status
                </TableHead>
                <TableHead className='px-4 py-3 text-center text-stone-200 uppercase'>
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className='bg-gray-800'>
              {orders.map((order) => (
                <TableRow
                  key={order._id}
                  className='border-b border-gray-700 hover:bg-gray-700 transition-all'
                >
                  <TableCell className='px-4 py-2 text-stone-300'>
                    {order._id}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-stone-300'>
                    {currencyFormatter(order.totalPrice)}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-stone-300'>
                    {order.deliveryStatus}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-stone-300'>
                    {order.paymentStatus}
                  </TableCell>
                  <TableCell className='px-4 py-0 text-stone-300'>
                    <div className='flex justify-center items-center gap-4'>
                      <Link
                        to={`/buyer/orders/${order._id}`}
                        className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'
                      >
                        <EyeIcon />
                      </Link>
                      {order.paymentStatus === 'pending' && (
                        <Link
                          to={`/payment/${order._id}`}
                          className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded'
                        >
                          Pay Now
                        </Link>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

export default BuyerOrders;
