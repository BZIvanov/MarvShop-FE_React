import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { useSelector } from '@/store/store';
import {
  selectUser,
  selectUserInitialLoadingCompleted,
} from '@/store/features/user/userSlice';

const ProtectedRoute = ({
  children,
  authRedirectTo,
  roleRedirectTo,
  roles,
}) => {
  const user = useSelector(selectUser);
  const userInitialLoadingCompleted = useSelector(
    selectUserInitialLoadingCompleted
  );

  // check if the initial loading of the user completed, because before it is fetched initially it will be null and we don't want to be redirected
  if (!userInitialLoadingCompleted) {
    return <div>Loading</div>;
  }

  if (!user) {
    return <Navigate to={authRedirectTo} replace={true} />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={roleRedirectTo} replace={true} />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  authRedirectTo: PropTypes.string,
  roleRedirectTo: PropTypes.string,
  roles: PropTypes.array,
};

export default ProtectedRoute;
