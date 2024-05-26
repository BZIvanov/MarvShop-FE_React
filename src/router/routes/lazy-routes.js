import { lazy } from 'react';

// use separate file for lazy imports to avoid lint warning 'eslint(react-refresh/only-export-components)'

export const Register = lazy(() =>
  import('../../components/user/auth/Register')
);
export const Login = lazy(() => import('../../components/user/auth/Login'));
export const AdminLogin = lazy(() =>
  import('../../components/user/auth/AdminLogin')
);
