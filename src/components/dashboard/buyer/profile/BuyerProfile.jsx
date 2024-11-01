const BuyerProfile = () => {
  return (
    <div className='m-7 p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]'>
      <h2 className='text-[#000000] font-semibold text-lg mb-3'>
        Change Password
      </h2>

      <form>
        <div className='flex flex-col gap-1 mb-2'>
          <label htmlFor='old-password'>Old Password</label>
          <input
            name='oldPassword'
            type='password'
            id='old-password'
            className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
            placeholder='Old Password'
          />
        </div>

        <div className='flex flex-col gap-1 mb-2'>
          <label htmlFor='new-password'>New Password</label>
          <input
            name='newPassword'
            type='password'
            id='new-password'
            className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
            placeholder='New Password'
          />
        </div>

        <div className='flex flex-col gap-1 mb-2'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            name='confirmPassword'
            type='password'
            id='confirm-password'
            className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
            placeholder='Confirm Password'
          />
        </div>
        <div>
          <button className='px-8 py-2 bg-[#059473] shadow-lg hover:shadow-green-500/30 text-white rounded-md'>
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuyerProfile;
