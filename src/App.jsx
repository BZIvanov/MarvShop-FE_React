import { Outlet } from 'react-router-dom';

import AppToaster from './toaster/AppToaster.jsx';
import Notification from './components/common/feedback/Notification.jsx';

const App = () => {
  return (
    <>
      <Outlet />

      <AppToaster />
      <Notification />
    </>
  );
};

export default App;
