import { Outlet } from 'react-router-dom';

import { useGetCurrentUserQuery } from '@/store/services/users';
import { Toaster } from '@/components/ui/toaster';
import Notification from '@/components/common/feedback/Notification';

const App = () => {
  // populate current user info in redux on page reload
  useGetCurrentUserQuery();

  return (
    <>
      <Outlet />

      {/* Toaster provider */}
      <Toaster />

      <Notification />
    </>
  );
};

export default App;
