import { Suspense } from 'react';

import { Register, Login, AdminLogin } from './lazy-routes';

const publicRoutes = [
  {
    path: '/register',
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
];

export default publicRoutes;
