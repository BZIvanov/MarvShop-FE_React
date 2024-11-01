import { useState } from 'react';

import { useSelector } from '@/store/store';
import { selectUser } from '@/store/features/user/userSlice';
import { selectShop } from '@/store/features/shop/shopSlice';
import { useUpdateAvatarMutation } from '@/store/services/users';
import { useUpdateShopInfoMutation } from '@/store/services/sellers';
import { ImagesFIcon, RegEditIcon } from '@/components/common/icons/Icons';
import SubmitButton from '@/components/common/buttons/SubmitButton';
import { ReloadIcon } from '@radix-ui/react-icons';

const SellerProfile = () => {
  const user = useSelector(selectUser);
  const shop = useSelector(selectShop);

  const [shopFormValues, setShopFormValues] = useState({
    shopName: '',
    country: '',
    city: '',
    street: '',
  });

  const [updateAvatar, { isLoading: isUpdateAvatarLoading }] =
    useUpdateAvatarMutation();
  const [updateShopInfo, { isLoading: isUpdateShopInfoLoading }] =
    useUpdateShopInfoMutation();

  const handleAvatarChange = (event) => {
    if (isUpdateAvatarLoading) {
      return;
    }

    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('avatar', file);

    updateAvatar(formData);
  };

  const handleShopFormValueChange = (event) => {
    setShopFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleShopInfoSubmit = (event) => {
    event.preventDefault();

    updateShopInfo(shopFormValues);
  };

  const handleUserInfoSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className='px-2 lg:px-7 py-5'>
      <div className='w-full flex flex-wrap'>
        <div className='w-full md:w-6/12'>
          <div className='w-full p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]'>
            <div className='flex justify-center items-center py-3'>
              {user?.avatar?.imageUrl ? (
                <label
                  htmlFor='avatar'
                  className='h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden'
                >
                  <img src={user.avatar.imageUrl} alt='User avatar' />
                  {isUpdateAvatarLoading && (
                    <div className='bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20'>
                      <ReloadIcon className='h-20 w-20 animate-spin' />
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className='flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 border-[#d0d2d6] relative'
                  htmlFor='avatar'
                >
                  <ImagesFIcon />
                  <span>Select Image</span>
                  {isUpdateAvatarLoading && (
                    <div className='bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20'>
                      <ReloadIcon className='h-20 w-20 animate-spin' />
                    </div>
                  )}
                </label>
              )}
              <input
                type='file'
                onChange={handleAvatarChange}
                disabled={isUpdateAvatarLoading}
                className='hidden'
                id='avatar'
              />
            </div>

            <div className='px-0 md:px-5 py-2'>
              <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative'>
                <span className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer'>
                  <RegEditIcon />
                </span>
                <div className='flex gap-2'>
                  <span>Username: </span>
                  <span>{user?.username}</span>
                </div>
                <div className='flex gap-2'>
                  <span>Email: </span>
                  <span>{user?.email}</span>
                </div>
                <div className='flex gap-2'>
                  <span>Role: </span>
                  <span>{user?.role}</span>
                </div>
                <div className='flex gap-2'>
                  <span>Status: </span>
                  <span>{shop?.paymentStatus}</span>
                </div>
                <div className='flex gap-2'>
                  <span>Payment Account: </span>
                  <p>
                    {shop?.paymentStatus === 'active' ? (
                      <span className='bg-green-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded'>
                        {shop.paymentStatus}
                      </span>
                    ) : (
                      <span className='bg-red-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded'>
                        Click to activate
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className='px-0 md:px-5 py-2'>
              {shop?.shopInfo?.shopName ? (
                <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative'>
                  <span className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer'>
                    <RegEditIcon />
                  </span>
                  <div className='flex gap-2'>
                    <span>Shop Name: </span>
                    <span>{shop.shopInfo.shopName}</span>
                  </div>
                  <div className='flex gap-2'>
                    <span>Country: </span>
                    <span>{shop.shopInfo.country}</span>
                  </div>
                  <div className='flex gap-2'>
                    <span>City: </span>
                    <span>{shop.shopInfo.city}</span>
                  </div>
                  <div className='flex gap-2'>
                    <span>Street: </span>
                    <span>{shop.shopInfo.street}</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleShopInfoSubmit}>
                  <div className='flex flex-col w-full gap-1 mb-2'>
                    <label htmlFor='shop-name'>Shop Name</label>
                    <input
                      name='shopName'
                      value={shopFormValues.shopName}
                      onChange={handleShopFormValueChange}
                      type='text'
                      id='shop-name'
                      className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                      placeholder='Shop Name'
                    />
                  </div>

                  <div className='flex flex-col w-full gap-1 mb-2'>
                    <label htmlFor='country'>Country</label>
                    <input
                      name='country'
                      value={shopFormValues.country}
                      onChange={handleShopFormValueChange}
                      type='text'
                      id='country'
                      className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                      placeholder='Country'
                    />
                  </div>

                  <div className='flex flex-col w-full gap-1 mb-2'>
                    <label htmlFor='district'>City</label>
                    <input
                      name='city'
                      value={shopFormValues.city}
                      onChange={handleShopFormValueChange}
                      type='text'
                      id='city'
                      className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                      placeholder='City'
                    />
                  </div>

                  <div className='flex flex-col w-full gap-1 mb-2'>
                    <label htmlFor='subdis'>Street</label>
                    <input
                      name='street'
                      value={shopFormValues.street}
                      onChange={handleShopFormValueChange}
                      type='text'
                      id='street'
                      className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                      placeholder='Street'
                    />
                  </div>

                  <SubmitButton isLoading={isUpdateShopInfoLoading}>
                    Save Changes
                  </SubmitButton>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className='w-full md:w-6/12'>
          <div className='w-full pl-0 md:pl-7 mt-6 md:mt-0'>
            <div className='bg-[#6a5fdf] rounded-md text-[#d0d2d6] p-4'>
              <h1 className='text-[#d0d2d6] text-lg mb-3 font-semibold'>
                Change Password
              </h1>
              <form onSubmit={handleUserInfoSubmit}>
                <div className='flex flex-col w-full gap-1 mb-2'>
                  <label htmlFor='email'>Email</label>
                  <input
                    name='email'
                    type='email'
                    id='email'
                    className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                    placeholder='Email'
                  />
                </div>

                <div className='flex flex-col w-full gap-1 mb-2'>
                  <label htmlFor='old-password'>Old Password</label>
                  <input
                    name='oldPassword'
                    type='password'
                    id='old-password'
                    className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                    placeholder='Old Password'
                  />
                </div>

                <div className='flex flex-col w-full gap-1 mb-2'>
                  <label htmlFor='new-password'>New Password</label>
                  <input
                    name='newPassword'
                    type='password'
                    id='new-password'
                    className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                    placeholder='New Password'
                  />
                </div>

                <button className='bg-red-500 hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2'>
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
