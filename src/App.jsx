import { Outlet } from 'react-router-dom';

import { useGetCurrentUserQuery } from '@/store/services/users';
import AppToaster from './toaster/AppToaster.jsx';
import Notification from './components/common/feedback/Notification.jsx';

const App = () => {
  // populate current user info in redux on page reload
  useGetCurrentUserQuery();

  return (
    <>
      <Outlet />

      <AppToaster />
      <Notification />
    </>
  );
};

export default App;
