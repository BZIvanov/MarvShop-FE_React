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
  import('../components/dashboard/seller/products/SellerAddProduct')
);
export const SellerEditProduct = lazy(() =>
  import('../components/dashboard/seller/products/SellerEditProduct')
);
export const SellerProducts = lazy(() =>
  import('../components/dashboard/seller/products/SellerProducts')
);
export const SellerOrders = lazy(() =>
  import('../components/dashboard/seller/orders/SellerOrders')
);
export const SellerOrderDetails = lazy(() =>
  import('../components/dashboard/seller/orders/SellerOrderDetails')
);
export const SellerAdminChat = lazy(() =>
  import('../components/dashboard/seller/chat/SellerAdminChat')
);
export const SellerCustomerChat = lazy(() =>
  import('../components/dashboard/seller/chat/SellerCustomerChat')
);
export const SellerProfile = lazy(() =>
  import('../components/dashboard/seller/profile/SellerProfile')
);

export const BuyerDashboard = lazy(() =>
  import('../components/dashboard/buyer/dashboard/BuyerDashboard')
);
export const BuyerOrders = lazy(() =>
  import('../components/dashboard/buyer/orders/BuyerOrders')
);
export const BuyerOrderDetails = lazy(() =>
  import('../components/dashboard/buyer/orders/BuyerOrderDetails')
);
export const BuyerProfile = lazy(() =>
  import('../components/dashboard/buyer/profile/BuyerProfile')
);
export const BuyerWishlist = lazy(() =>
  import('../components/dashboard/buyer/wishlist/BuyerWishlist')
);
export const BuyerChat = lazy(() =>
  import('../components/dashboard/buyer/chat/BuyerChat')
);
