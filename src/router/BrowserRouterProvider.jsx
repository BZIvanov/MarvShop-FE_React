import { Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import App from '../App';
import DashboardLayout from '../components/layouts/DashboardLayout';
import ErrorBoundary from './ErrorBoundary';
import NotFound from './NotFound';
import NonUserRoute from './auth/NonUserRoute';
import ProtectedRoute from './auth/ProtectedRoute';
import ShopStatus from './auth/ShopStatus';
import {
  Register,
  Login,
  AdminDashboard,
  AdminOrders,
  AdminOrderDetails,
  AdminCategory,
  AdminShops,
  AdminShopDetails,
  AdminChatSeller,
  SellerDashboard,
  SellerAddProduct,
  SellerEditProduct,
  SellerProducts,
  SellerOrders,
  SellerOrderDetails,
  SellerAdminChat,
  SellerCustomerChat,
  SellerProfile,
  BuyerDashboard,
  BuyerOrders,
  BuyerOrderDetails,
  BuyerProfile,
  BuyerWishlist,
  BuyerChat,
} from './lazy-routes';
import ShopLayout from '@/components/layouts/ShopLayout';
import PasswordReset from '@/components/user/auth/PasswordReset';
import Home from '../components/home/Home';
import Shop from '../components/shop/Shop';
import Cart from '../components/cart/Cart';
import Shipping from '../components/cart/Shipping';
import ProductDetails from '../components/product/ProductDetails';
import Payment from '../components/cart/Payment';
import LoadingFallback from './LoadingFallback';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // render the App component on the root route
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '',
        element: <ShopLayout />,
        children: [{ path: '', element: <Home /> }],
      },
      {
        path: 'shop',
        element: <ShopLayout />,
        children: [{ path: '', element: <Shop /> }],
      },
      {
        path: 'cart',
        element: <ShopLayout />,
        children: [{ path: '', element: <Cart /> }],
      },
      {
        path: 'shipping',
        element: <ShopLayout />,
        children: [{ path: '', element: <Shipping /> }],
      },
      {
        path: 'payment',
        element: <ShopLayout showSubheader={false} />,
        children: [{ path: ':orderId', element: <Payment /> }],
      },
      {
        path: 'products',
        element: <ShopLayout />,
        children: [{ path: ':slug', element: <ProductDetails /> }],
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute
            authRedirectTo='/auth/login'
            roleRedirectTo='/'
            roles={['admin']}
          >
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: '',
            element: <Navigate to='dashboard' replace={true} />, // Default redirect to /admin/dashboard
          },
          {
            path: 'dashboard',
            element: <AdminDashboard />,
          },
          {
            path: 'orders',
            element: <AdminOrders />,
          },
          {
            path: 'orders/:orderId',
            element: <AdminOrderDetails />,
          },
          {
            path: 'category',
            element: <AdminCategory />,
          },
          {
            path: 'category/:categoryId',
            element: <AdminCategory />,
          },
          {
            path: 'shops',
            element: <AdminShops />,
          },
          {
            path: 'shops/:shopId',
            element: <AdminShopDetails />,
          },
          {
            path: 'chat',
            element: <AdminChatSeller />,
          },
          {
            path: 'chat/:receiverId',
            element: <AdminChatSeller />,
          },
        ],
      },
      {
        path: 'seller',
        element: (
          <ProtectedRoute
            authRedirectTo='/auth/login'
            roleRedirectTo='/'
            roles={['seller']}
          >
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: '',
            element: <Navigate to='dashboard' replace={true} />,
          },
          {
            path: 'dashboard',
            element: <SellerDashboard />,
          },
          {
            path: 'add-product',
            // redirect the seller to chat support in case his seller account is not active
            element: (
              <ShopStatus
                statusRedirectTo='/seller/chat-support'
                statuses={['active']}
              >
                <SellerAddProduct />
              </ShopStatus>
            ),
          },
          {
            path: 'edit-product/:slug',
            element: (
              <ShopStatus
                statusRedirectTo='/seller/chat-support'
                statuses={['active']}
              >
                <SellerEditProduct />
              </ShopStatus>
            ),
          },
          {
            path: 'products',
            element: <SellerProducts />,
          },
          {
            path: 'orders',
            element: <SellerOrders />,
          },
          {
            path: 'orders/:orderId',
            element: <SellerOrderDetails />,
          },
          {
            path: 'chat-support',
            element: <SellerAdminChat />,
          },
          {
            path: 'chat',
            element: <SellerCustomerChat />,
          },
          {
            path: 'chat/:receiverId',
            element: <SellerCustomerChat />,
          },
          {
            path: 'profile',
            element: <SellerProfile />,
          },
        ],
      },
      {
        path: 'buyer',
        element: (
          <ProtectedRoute
            authRedirectTo='/auth/login'
            roleRedirectTo='/'
            roles={['buyer']}
          >
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: '',
            element: <Navigate to='dashboard' replace={true} />,
          },
          {
            path: 'dashboard',
            element: <BuyerDashboard />,
          },
          {
            path: 'orders',
            element: <BuyerOrders />,
          },
          {
            path: 'orders/:orderId',
            element: <BuyerOrderDetails />,
          },
          {
            path: 'profile',
            element: <BuyerProfile />,
          },
          {
            path: 'wishlist',
            element: <BuyerWishlist />,
          },
          {
            path: 'chat',
            element: <BuyerChat />,
          },
          {
            path: 'chat/:receiverId',
            element: <BuyerChat />,
          },
        ],
      },
      {
        path: 'auth',
        element: (
          <NonUserRoute>
            <ShopLayout />
          </NonUserRoute>
        ),
        children: [
          {
            path: '',
            element: <Navigate to='login' replace={true} />, // Default redirect to /auth/login
          },
          {
            path: 'register',
            element: <Register />,
          },
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'reset-password/:token',
            element: <PasswordReset />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const BrowserRouterProvider = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default BrowserRouterProvider;
