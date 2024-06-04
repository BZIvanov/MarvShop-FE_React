import { Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';

import ErrorBoundary from './ErrorBoundary';
import App from '../App';
import NonUserRoute from './auth/NonUserRoute';
import ProtectedRoute from './auth/ProtectedRoute';
import {
  Register,
  Login,
  AdminLogin,
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
  SellerProducts,
  SellerDiscountProducts,
  SellerOrders,
  SellerPayments,
  SellerToAdmin,
  SellerToCustomer,
  SellerProfile,
} from './lazy-routes';
import MainLayout from '../components/layout/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // render the App component on the root route
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '',
        element: <MainLayout />,
        children: [
          {
            path: 'admin',
            element: (
              <ProtectedRoute
                authRedirectTo='/auth/login'
                roleRedirectTo='/'
                roles={['admin']}
              >
                <Outlet />
              </ProtectedRoute>
            ),
            children: [
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
                <Outlet />
              </ProtectedRoute>
            ),
            children: [
              {
                path: 'dashboard',
                element: <SellerDashboard />,
              },
              {
                path: 'add-product',
                element: <SellerAddProduct />,
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
          {
            path: 'admin/login',
            element: <AdminLogin />,
          },
        ],
      },
    ],
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
