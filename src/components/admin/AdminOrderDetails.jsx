import { useParams } from 'react-router-dom';

import { useGetOrderQuery } from '../../store/services/orders';
import { dateFormatter, currencyFormatter } from '../../utils/formatting';

const AdminOrderDetails = () => {
  const { orderId } = useParams();

  const { data } = useGetOrderQuery(orderId, {
    skip: !orderId,
  });
  const order = data?.order || {};

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='flex justify-between items-center p-4'>
          <h2 className='text-xl text-[#d0d2d6]'>Order Details</h2>
          <select
            name='deliveryStatus'
            className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#475569] border border-slate-700 rounded-md text-[#d0d2d6]'
          >
            <option value='pending'>Pending</option>
            <option value='partiallyShipped'>Partially Shipped</option>
            <option value='shipped'>Shipped</option>
            <option value='canceled'>Canceled</option>
          </select>
        </div>

        <div className='p-4'>
          <div className='flex gap-2 text-lg text-[#d0d2d6]'>
            <h2>{order._id}</h2>
            <span>
              {order?.createdAt ? dateFormatter(order.createdAt) : ''}
            </span>
          </div>

          <div className='flex flex-wrap'>
            <div className='w-[30%]'>
              <div className='pr-3 text-[#d0d2d6] text-lg'>
                <div className='flex flex-col gap-1'>
                  <h2 className='pb-2 font-semibold'>
                    Deliver To: {order.buyer?.username}
                  </h2>
                  <p>
                    <span className='text-sm'>
                      {order.deliveryAddress
                        ? `${order.deliveryAddress.country} - ${order.deliveryAddress.city} - ${order.deliveryAddress.street}`
                        : ''}
                    </span>
                  </p>
                </div>

                <div className='flex justify-start items-center gap-3'>
                  <h2>Payment Status: </h2>
                  <span className='text-base'>{order.paymentStatus}</span>
                </div>
                <span>Price: {currencyFormatter(order.totalPrice)}</span>

                <div className='mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-md text-[#d0d2d6]'>
                  {order.products?.map((orderProduct) => {
                    return (
                      <div
                        key={orderProduct._id}
                        className='flex gap-3 text-md'
                      >
                        <img
                          className='w-[50px] h-[50px]'
                          src={orderProduct.product.images[0].imageUrl}
                          alt='Product preview'
                        />

                        <div>
                          <h2>{orderProduct.product.name}</h2>
                          <p>Quantity: {orderProduct.count}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className='w-[70%]'>
              <div className='pl-3'>
                <div className='mt-4 flex flex-col bg-[#8288ed] rounded-md p-4'>
                  {order.orderItems?.map((orderItem) => {
                    return (
                      <div key={orderItem._id} className='text-[#d0d2d6] mt-2'>
                        <div>
                          <h2>Seller: {orderItem.seller?.username}</h2>
                          <p>Status: {orderItem.deliveryStatus}</p>
                        </div>
                        {orderItem.products.map((orderItemProduct) => {
                          return (
                            <div
                              key={orderItemProduct._id}
                              className='flex gap-3 text-md mt-2'
                            >
                              <img
                                className='w-[50px] h-[50px]'
                                src={
                                  orderItemProduct.product.images[0].imageUrl
                                }
                                alt='Product preview'
                              />
                              <div>
                                <h2>{orderItemProduct.product.name}</h2>
                                <p>Quantity: {orderItemProduct.count}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
