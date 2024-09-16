import { Link, useParams } from 'react-router-dom';

import { useGetOrderQuery } from '../../../store/services/orders';

const BuyerOrderDetails = () => {
  const { orderId } = useParams();

  const { data } = useGetOrderQuery(orderId, {
    skip: !orderId,
  });
  const order = data?.order || {};

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h2 className='text-slate-600 font-semibold'>
        #{order._id} - <span className='pl-1'>{order.createdAt}</span>
      </h2>
      <div className='grid grid-cols-2 gap-3'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-slate-600 font-semibold font-sans'>
            Deliver To: {order.deliveryAddress?.fullName}
          </h2>
          <p>
            <span className='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-2 rounded'>
              Home
            </span>
            <span className='text-slate-600 text-sm'>
              {order.deliveryAddress?.country}, {order.deliveryAddress?.city},{' '}
              {order.deliveryAddress?.street}
            </span>
          </p>
          <p className='text-slate-600 text-md font-semibold'>
            Phone contact: {order.deliveryAddress?.phone}
          </p>
        </div>

        <div className='text-slate-600'>
          <h2 className='font-mono'>
            Price: ${order.totalPrice} Including Shipping
          </h2>
          <p className='font-mono'>
            Payment Status:
            <span
              className={`py-[1px] text-xs px-3 ${
                order.paymentStatus === 'paid'
                  ? 'bg-green-300 text-green-800'
                  : 'bg-red-300 text-red-800'
              } rounded-md`}
            >
              {order.paymentStatus}
            </span>
          </p>
          <p className='font-mono'>
            Order Status:{' '}
            <span
              className={`py-[1px] text-xs px-3 ${
                order.deliveryStatus === 'shipped'
                  ? 'bg-green-300 text-green-800'
                  : 'bg-red-300 text-red-800'
              } rounded-md`}
            >
              {order.deliveryStatus}
            </span>
          </p>
        </div>

        <div className='mt-4'>
          <h2 className='text-slate-600 text-lg pb-2 font-sans font-bold'>
            Order Products
          </h2>
          <div className='flex gap-5 flex-col'>
            {order.products?.map((product) => {
              return (
                <div key={product}>
                  <div className='flex gap-5 justify-start items-center text-slate-600'>
                    <div className='flex gap-2'>
                      <img
                        className='w-[55px] h-[55px]'
                        src={product.product.images[0].imageUrl}
                        alt='Product preview'
                      />
                      <div className='flex text-sm flex-col justify-start items-start'>
                        <Link>{product.product.name}</Link>
                        <p>
                          <span>Brand: {product.product.brand}</span>
                        </p>
                        <p>
                          <span>Quantity: {product.count}</span>
                        </p>
                      </div>
                    </div>

                    <div className='pl-4 flex flex-col'>
                      <h2 className='text-md text-green-800'>
                        $
                        {product.product.price -
                          Math.floor(
                            (product.product.price * product.product.discount) /
                              100
                          )}
                      </h2>
                      <p className='line-through'>{product.product.price}</p>
                      <p>-{product.product.discount}%</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerOrderDetails;
