import { lazy } from 'react';

// use separate file for lazy imports to avoid lint warning 'eslint(react-refresh/only-export-components)'

export const Register = lazy(() => import('../components/user/auth/Register'));
export const Login = lazy(() => import('../components/user/auth/Login'));

export const AdminDashboard = lazy(() =>
  import('../components/dashboard/admin/dashboard/AdminDashboard')
);
export const AdminOrders = lazy(() =>
  import('../components/dashboard/admin/orders/AdminOrders')
);
export const AdminOrderDetails = lazy(() =>
  import('../components/dashboard/admin/orders/AdminOrderDetails')
);
export const AdminCategory = lazy(() =>
  import('../components/dashboard/admin/category/AdminCategory')
);
export const AdminShops = lazy(() =>
  import('../components/dashboard/admin/shops/AdminShops')
);
export const AdminShopDetails = lazy(() =>
  import('../components/dashboard/admin/shops/AdminShopDetails')
);
export const AdminChatSeller = lazy(() =>
  import('../components/dashboard/admin/chat/AdminChatSeller')
);

export const SellerDashboard = lazy(() =>
  import('../components/dashboard/seller/dashboard/SellerDashboard')
);
export const SellerAddProduct = lazy(() =>
  import('../components/seller/SellerAddProduct')
);
export const SellerEditProduct = lazy(() =>
  import('../components/seller/SellerEditProduct')
);
export const SellerProducts = lazy(() =>
  import('../components/dashboard/seller/products/SellerProducts')
);
export const SellerDiscountProducts = lazy(() =>
  import('../components/seller/SellerDiscountProducts')
);
export const SellerOrders = lazy(() =>
  import('../components/dashboard/seller/orders/SellerOrders')
);
export const SellerOrderDetails = lazy(() =>
  import('../components/dashboard/seller/orders/SellerOrderDetails')
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
  import('../components/dashboard/seller/profile/SellerProfile')
);

export const BuyerDashboard = lazy(() =>
  import('../components/dashboard/buyer/BuyerDashboard')
);
export const BuyerOrders = lazy(() =>
  import('../components/dashboard/buyer/BuyerOrders')
);
export const BuyerOrderDetails = lazy(() =>
  import('../components/dashboard/buyer/BuyerOrderDetails')
);
export const BuyerProfile = lazy(() =>
  import('../components/dashboard/buyer/BuyerProfile')
);
export const BuyerWishlist = lazy(() =>
  import('../components/dashboard/buyer/BuyerWishlist')
);
export const BuyerChat = lazy(() =>
  import('../components/dashboard/buyer/BuyerChat')
);
