import { lazy } from 'react';

// use separate file for lazy imports to avoid lint warning 'eslint(react-refresh/only-export-components)'

export const Register = lazy(() => import('../components/user/auth/Register'));
export const Login = lazy(() => import('../components/user/auth/Login'));

export const AdminDashboard = lazy(() =>
  import('../components/admin/AdminDashboard')
);
export const AdminOrders = lazy(() =>
  import('../components/admin/AdminOrders')
);
export const AdminOrderDetails = lazy(() =>
  import('../components/admin/AdminOrderDetails')
);
export const AdminCategory = lazy(() =>
  import('../components/admin/AdminCategory')
);
export const AdminSellers = lazy(() =>
  import('../components/admin/AdminSellers')
);
export const AdminSellerDetails = lazy(() =>
  import('../components/admin/AdminSellerDetails')
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
export const AdminChatSeller = lazy(() =>
  import('../components/admin/AdminChatSeller')
);

export const SellerDashboard = lazy(() =>
  import('../components/seller/SellerDashboard')
);
export const SellerAddProduct = lazy(() =>
  import('../components/seller/SellerAddProduct')
);
export const SellerEditProduct = lazy(() =>
  import('../components/seller/SellerEditProduct')
);
export const SellerProducts = lazy(() =>
  import('../components/seller/SellerProducts')
);
export const SellerDiscountProducts = lazy(() =>
  import('../components/seller/SellerDiscountProducts')
);
export const SellerOrders = lazy(() =>
  import('../components/seller/SellerOrders')
);
export const SellerOrderDetails = lazy(() =>
  import('../components/seller/SellerOrderDetails')
);
export const SellerPayments = lazy(() =>
  import('../components/seller/SellerPayments')
);
export const SellerToAdmin = lazy(() =>
  import('../components/seller/SellerToAdmin')
);
export const SellerToCustomer = lazy(() =>
  import('../components/seller/SellerToCustomer')
);
export const SellerProfile = lazy(() =>
  import('../components/seller/SellerProfile')
);
