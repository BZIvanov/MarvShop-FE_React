import { Toaster } from 'react-hot-toast';

const AppToaster = () => {
  return (
    <Toaster
      toastOptions={{
        position: 'top-right',
        style: { background: '#283046', color: 'white' },
      }}
    />
  );
};

export default AppToaster;
