import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetSellerQuery } from '@/store/services/users';

const AdminSellerDetails = () => {
  const { sellerId } = useParams();

  const [status, setStatus] = useState('');

  const { data, isSuccess } = useGetSellerQuery(sellerId, {
    skip: !sellerId,
  });

  const seller = useMemo(() => {
    return data?.seller || {};
  }, [data?.seller]);

  useEffect(() => {
    if (isSuccess) {
      setStatus(seller.sellerId.status);
    }
  }, [isSuccess, seller]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (status === '') {
      return;
    }
  };

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[20px] font-bold mb-3'>Seller Details</h1>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='w-full flex flex-wrap text-[#d0d2d6]'>
          <div className='w-3/12 flex justify-center items-center py-3'>
            <div>
              {seller.avatar?.imageUrl ? (
                <img
                  className='w-full h-[230px]'
                  src={`${seller.avatar.imageUrl}`}
                  alt='Seller avatar'
                />
              ) : (
                <span>No avatar</span>
              )}
            </div>
          </div>

          <div className='w-4/12'>
            <div className='px-0 md:px-5 py-2'>
              <div className='py-2 text-lg'>
                <h2>Basic Info</h2>
              </div>
              <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-[#9e97e9] rounded-md'>
                <div className='flex gap-2 font-bold text-[#000000]'>
                  <span>Name: </span>
                  <span>{seller.username}</span>
                </div>
                <div className='flex gap-2 font-bold text-[#000000]'>
                  <span>Email: </span>
                  <span>{seller.email}</span>
                </div>
                <div className='flex gap-2 font-bold text-[#000000]'>
                  <span>Role: </span>
                  <span>{seller.role}</span>
                </div>
                <div className='flex gap-2 font-bold text-[#000000]'>
                  <span>Status: </span>
                  <span>{seller.sellerId?.status}</span>
                </div>
                <div className='flex gap-2 font-bold text-[#000000]'>
                  <span>Payment Status: </span>
                  <span>{seller.sellerId?.payment}</span>
                </div>
              </div>
            </div>
          </div>

          <div className='w-4/12'>
            <div className='px-0 md:px-5 py-2'>
              <div className='py-2 text-lg'>
                <h2>Address</h2>
              </div>
              {seller.sellerId?.shopInfo && (
                <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-[#9e97e9] rounded-md'>
                  <div className='flex gap-2 font-bold text-[#000000]'>
                    <span>Shop Name: </span>
                    <span>{seller.sellerId.shopInfo.shopName}</span>
                  </div>
                  <div className='flex gap-2 font-bold text-[#000000]'>
                    <span>Country: </span>
                    <span>{seller.sellerId.shopInfo.country}</span>
                  </div>
                  <div className='flex gap-2 font-bold text-[#000000]'>
                    <span>City: </span>
                    <span>{seller.sellerId.shopInfo.city}</span>
                  </div>
                  <div className='flex gap-2 font-bold text-[#000000]'>
                    <span>Street: </span>
                    <span>{seller.sellerId.shopInfo.street}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className='flex gap-4 py-3'>
              <select
                name='status'
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                required={true}
                className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
              >
                <option value=''>Select Status</option>
                <option value='pending'>Pending</option>
                <option value='active'>Active</option>
                <option value='deactive'>Deactive</option>
              </select>
              <button className='bg-red-500 w-[170px] hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2'>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSellerDetails;
