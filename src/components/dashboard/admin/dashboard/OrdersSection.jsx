import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { currencyFormatter } from '@/utils/formatting';

const OrdersSection = ({ orders = [] }) => {
  return (
    <div className='w-full p-4 bg-[#6a5fdf] rounded-md mt-6'>
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold text-lg text-[#d0d2d6] pb-3'>
          Recent Orders
        </h2>
        <Link
          to='/admin/orders'
          className='font-semibold text-sm text-[#d0d2d6]'
        >
          View All
        </Link>
      </div>
      <div className='relative overflow-x-auto'>
        <table className='w-full text-sm text-left text-[#d0d2d6]'>
          <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
            <tr>
              <th scope='col' className='py-3 px-4'>
                Order ID
              </th>
              <th scope='col' className='py-3 px-4'>
                Price
              </th>
              <th scope='col' className='py-3 px-4'>
                Delivery Status
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
            {orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td
                    scope='row'
                    className='py-3 px-4 font-medium whitespace-nowrap'
                  >
                    {order._id}
                  </td>
                  <td
                    scope='row'
                    className='py-3 px-4 font-medium whitespace-nowrap'
                  >
                    {currencyFormatter(order.totalPrice)}
                  </td>
                  <td
                    scope='row'
                    className='py-3 px-4 font-medium whitespace-nowrap'
                  >
                    {order.deliveryStatus}
                  </td>
                  <td
                    scope='row'
                    className='py-3 px-4 font-medium whitespace-nowrap'
                  >
                    {order.paymentStatus}
                  </td>
                  <td
                    scope='row'
                    className='py-3 px-4 font-medium whitespace-nowrap'
                  >
                    <Link to={`/admin/orders/${order._id}`}>View</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

OrdersSection.propTypes = {
  orders: PropTypes.array,
};

export default OrdersSection;
