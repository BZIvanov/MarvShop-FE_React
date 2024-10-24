import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { currencyFormatter } from '@/utils/formatting';

const OrdersSection = ({ orders = [] }) => {
  return (
    <div className='w-full p-6 bg-gradient-to-r from-[#36316e] to-[#150b64] rounded-lg mt-6 shadow-lg'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='font-bold text-xl text-[#e0e2e6] tracking-wide'>
          Recent Orders
        </h2>
        <Link
          to='/admin/orders'
          className='font-semibold text-sm text-[#e0e2e6] hover:text-white hover:underline transition-all duration-200'
        >
          View All
        </Link>
      </div>

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
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
              <TableHead className='px-4 py-3 text-right text-stone-200 uppercase'>
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
                <TableCell className='px-4 py-2 font-medium text-stone-300'>
                  {currencyFormatter(order.totalPrice)}
                </TableCell>
                <TableCell className='px-4 py-2 text-stone-300'>
                  {order.deliveryStatus}
                </TableCell>
                <TableCell className='px-4 py-2 text-stone-300'>
                  {order.paymentStatus}
                </TableCell>
                <TableCell className='px-4 py-2 text-right text-stone-300'>
                  <Link
                    to={`/admin/orders/${order._id}`}
                    className='text-blue-500 hover:text-blue-400 hover:underline transition-all duration-200'
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

OrdersSection.propTypes = {
  orders: PropTypes.array,
};

export default OrdersSection;
