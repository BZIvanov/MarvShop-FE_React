import { Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';

import App from '../App';
import DashboardLayout from '../components/layout/DashboardLayout';
import ErrorBoundary from './ErrorBoundary';
import NotFound from './NotFound';
import NonUserRoute from './auth/NonUserRoute';
import ProtectedRoute from './auth/ProtectedRoute';
import SellerStatus from './auth/SellerStatus';
import {
  Register,
  Login,
  AdminDashboard,
  AdminOrders,
  AdminOrderDetails,
  AdminCategory,
  AdminSellers,
  AdminSellerDetails,
  AdminPaymentRequest,
  AdminDeactiveSellers,
  AdminSellerRequest,
  AdminChatSeller,
  SellerDashboard,
  SellerAddProduct,
  SellerEditProduct,
  SellerProducts,
  SellerDiscountProducts,
  SellerOrders,
  SellerOrderDetails,
  SellerPayments,
  SellerToAdmin,
  SellerToCustomer,
  SellerProfile,
  BuyerDashboard,
  BuyerOrders,
  BuyerProfile,
  BuyerWishlist,
} from './lazy-routes';
import Home from '../components/home/Home';
import Shop from '../components/shop/Shop';
import Cart from '../components/cart/Cart';
import Shipping from '../components/cart/Shipping';
import ProductDetails from '../components/product/ProductDetails';
import Payment from '../components/cart/Payment';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // render the App component on the root route
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'shipping',
        element: <Shipping />,
      },
      {
        path: 'payment/:orderId',
        element: <Payment />,
      },
      {
        path: 'products/:slug',
        element: <ProductDetails />,
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
            path: 'sellers',
            element: <AdminSellers />,
          },
          {
            path: 'sellers/:sellerId',
            element: <AdminSellerDetails />,
          },
          {
            path: 'payment-request',
            element: <AdminPaymentRequest />,
          },
          {
            path: 'deactive-sellers',
            element: <AdminDeactiveSellers />,
          },
          {
            path: 'sellers-request',
            element: <AdminSellerRequest />,
          },
          {
            path: 'chat-sellers',
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
              <SellerStatus
                statusRedirectTo='/seller/chat-support'
                statuses={['active']}
              >
                <SellerAddProduct />
              </SellerStatus>
            ),
          },
          {
            path: 'edit-product/:productId',
            element: (
              <SellerStatus
                statusRedirectTo='/seller/chat-support'
                statuses={['active']}
              >
                <SellerEditProduct />
              </SellerStatus>
            ),
          },
          {
            path: 'products',
            element: <SellerProducts />,
          },
          {
            path: 'discount-products',
            element: <SellerDiscountProducts />,
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
            path: 'payments',
            element: <SellerPayments />,
          },
          {
            path: 'chat-support',
            element: <SellerToAdmin />,
          },
          {
            path: 'chat-customer',
            element: <SellerToCustomer />,
          },
          {
            path: 'chat-customer/:customerId',
            element: <SellerToCustomer />,
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
            path: 'profile',
            element: <BuyerProfile />,
          },
          {
            path: 'wishlist',
            element: <BuyerWishlist />,
          },
        ],
      },
      {
        path: 'auth',
        element: (
          <NonUserRoute>
            <Outlet />
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
    <Suspense fallback={<div>Lazy Routes loading</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default BrowserRouterProvider;
