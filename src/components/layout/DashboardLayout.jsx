import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useGetCurrentSellerQuery } from '@/store/services/sellers';
import { useSelector } from '@/store/store';
import { selectUser } from '@/store/features/user/userSlice';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const user = useSelector(selectUser);

  // load customer info for the dashboard, needed for the seller status check
  // skip the query for admin user
  useGetCurrentSellerQuery(undefined, { skip: user?.role !== 'seller' });

  return (
    <div className='bg-[#cdcae9] w-full min-h-screen'>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div className='ml-0 lg:ml-[260px] pt-[95px] transition-all'>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
