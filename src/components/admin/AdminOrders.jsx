import { useState } from 'react';
import { LuArrowDownSquare } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import { useGetOrdersQuery } from '../../store/services/orders';
import Pagination from '../common/Pagination';
import Search from '../common/Search';
import { currencyFormatter } from '../../utils/formatting';

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [areDetialsExpanded, setAreDetialsExpanded] = useState({});

  const { data } = useGetOrdersQuery({
    page,
    perPage,
  });
  const orders = data?.orders || [];

  const handleOrderDetailsExpansion = (orderId) => {
    setAreDetialsExpanded((prevState) => {
      return {
        ...prevState,
        [orderId]: !prevState[orderId],
      };
    });
  };

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <Search
          setPerPage={setPerPage}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <div className='relative mt-5 overflow-x-auto'>
          <div className='w-full text-sm text-left'>
            <div className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
              <div className='flex justify-between items-center'>
                <div className='py-3 w-[25%] font-bold'>Order ID</div>
                <div className='py-3 w-[13%] font-bold'>Price</div>
                <div className='py-3 w-[18%] font-bold'>Delivery Status</div>
                <div className='py-3 w-[18%] font-bold'>Payment Status</div>
                <div className='py-3 w-[18%] font-bold'>Action</div>
                <div className='py-3 w-[8%] font-bold'>
                  <LuArrowDownSquare />
                </div>
              </div>
            </div>

            {orders.map((order) => {
              return (
                <div key={order._id} className='text-[#d0d2d6]'>
                  <div className=' flex justify-between items-start border-b border-slate-700'>
                    <div className='py-3 w-[25%] font-medium whitespace-nowrap'>
                      {order._id}
                    </div>
                    <div className='py-3 w-[13%] font-medium'>
                      {currencyFormatter(order.totalPrice)}
                    </div>
                    <div className='py-3 w-[18%] font-medium'>
                      {order.deliveryStatus}
                    </div>
                    <div className='py-3 w-[18%] font-medium'>
                      {order.paymentStatus}
                    </div>
                    <div className='py-3 w-[18%] font-medium'>
                      <Link to={`/admin/orders/${order._id}`}>View</Link>
                    </div>
                    <div
                      onClick={() => handleOrderDetailsExpansion(order._id)}
                      className='py-3 w-[8%] font-medium cursor-pointer'
                    >
                      <LuArrowDownSquare />
                    </div>
                  </div>

                  <div
                    className={
                      areDetialsExpanded[order._id]
                        ? 'block border-b border-slate-700 bg-[#8288ed]'
                        : 'hidden'
                    }
                  >
                    {order.orderItems.map((orderItem) => {
                      return (
                        <div
                          key={orderItem._id}
                          className=' flex justify-start items-start border-b border-slate-700'
                        >
                          <div className='py-3 w-[25%] font-medium whitespace-nowrap pl-3'>
                            {orderItem._id}
                          </div>
                          <div className='py-3 w-[13%] font-medium'>
                            {currencyFormatter(orderItem.totalPrice)}
                          </div>
                          <div className='py-3 w-[18%] font-medium'>
                            {orderItem.deliveryStatus}
                          </div>
                          <div className='py-3 w-[18%] font-medium'>
                            {orderItem.paymentStatus}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {data?.totalCount > perPage && (
          <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
            <Pagination
              pageNumber={page}
              setPageNumber={setPage}
              totalItem={data.totalCount}
              perPage={perPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
