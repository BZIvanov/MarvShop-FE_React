import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { UnfoldVertical } from 'lucide-react';

import { useGetOrdersQuery } from '@/store/services/orders';
import Pagination from '@/components/common/Pagination';
import Search from '@/components/common/Search';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { currencyFormatter } from '@/utils/formatting';

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [areDetailsExpanded, setAreDetailsExpanded] = useState({});

  const { data } = useGetOrdersQuery({
    page,
    perPage,
  });
  const orders = data?.orders || [];

  const handleOrderDetailsExpansion = (orderId) => {
    setAreDetailsExpanded((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-6 bg-gradient-to-r from-[#6a5fdf] to-[#8475f5] rounded-lg shadow-lg'>
        <Search
          perPage={perPage}
          setPerPage={setPerPage}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-5'>
          <Table>
            <TableHeader>
              <TableRow className='bg-gray-700'>
                <TableHead className='py-3 text-stone-200 uppercase'>
                  Order ID
                </TableHead>
                <TableHead className='py-3 text-stone-200 uppercase'>
                  Price
                </TableHead>
                <TableHead className='py-3 text-stone-200 uppercase'>
                  Delivery Status
                </TableHead>
                <TableHead className='py-3 text-stone-200 uppercase'>
                  Payment Status
                </TableHead>
                <TableHead className='py-3 text-center text-stone-200 uppercase'>
                  Action
                </TableHead>
                <TableHead className='py-3 text-center text-stone-200'>
                  <UnfoldVertical className='h-5 w-5' />
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className='bg-gray-800'>
              {orders.map((order) => (
                <Fragment key={order._id}>
                  <TableRow className='border-b border-gray-700 hover:bg-gray-700 transition-all'>
                    <TableCell className='text-stone-300'>
                      {order._id}
                    </TableCell>
                    <TableCell className='text-stone-300'>
                      {currencyFormatter(order.totalPrice)}
                    </TableCell>
                    <TableCell className='text-stone-300'>
                      {order.deliveryStatus}
                    </TableCell>
                    <TableCell className='text-stone-300'>
                      {order.paymentStatus}
                    </TableCell>
                    <TableCell className='text-center text-stone-300'>
                      <Link
                        to={`/admin/orders/${order._id}`}
                        className='text-blue-500 hover:text-blue-400 hover:underline transition-all'
                      >
                        View
                      </Link>
                    </TableCell>
                    <TableCell
                      className='text-center text-stone-300 cursor-pointer'
                      onClick={() => handleOrderDetailsExpansion(order._id)}
                    >
                      <UnfoldVertical className='h-4 w-4' />
                    </TableCell>
                  </TableRow>

                  {areDetailsExpanded[order._id] && (
                    <>
                      {order.orderItems.map((orderItem) => (
                        <TableRow
                          key={orderItem._id}
                          className='border-b border-gray-700 bg-gray-500'
                        >
                          <TableCell className='text-stone-300'>
                            {orderItem._id}
                          </TableCell>
                          <TableCell className='text-stone-300'>
                            {currencyFormatter(orderItem.totalPrice)}
                          </TableCell>
                          <TableCell className='text-stone-300'>
                            {orderItem.deliveryStatus}
                          </TableCell>
                          <TableCell className='text-stone-300'>
                            {orderItem.paymentStatus}
                          </TableCell>
                          <TableCell />
                          <TableCell />
                        </TableRow>
                      ))}
                    </>
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </div>

        {data?.totalCount > perPage && (
          <div className='mt-4'>
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

export default AdminOrders;
