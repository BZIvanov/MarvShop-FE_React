import { lazy } from 'react';

// use separate file for lazy imports to avoid lint warning 'eslint(react-refresh/only-export-components)'

export const Register = lazy(() => import('../components/user/auth/Register'));
export const Login = lazy(() => import('../components/user/auth/Login'));
export const AdminLogin = lazy(() =>
  import('../components/user/auth/AdminLogin')
);

export const AdminDashboard = lazy(() =>
  import('../components/admin/AdminDashboard')
);
export const AdminOrders = lazy(() =>
  import('../components/admin/AdminOrders')
);
export const AdminCategory = lazy(() =>
  import('../components/admin/AdminCategory')
);
export const AdminSellers = lazy(() =>
  import('../components/admin/AdminSellers')
);
export const AdminPaymentRequest = lazy(() =>
  import('../components/admin/AdminPaymentRequest')
);
export const AdminDeactiveSellers = lazy(() =>
  import('../components/admin/AdminDeactiveSellers')
);
export const AdminSellerRequest = lazy(() =>
  import('../components/admin/AdminSellerRequest')
);
export const AdminSellerDetails = lazy(() =>
  import('../components/admin/AdminSellerDetails')
);
export const AdminChatSeller = lazy(() =>
  import('../components/admin/AdminChatSeller')
);
