import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { useSelector } from '../../store/store';
import { selectUser } from '../../store/features/user/userSlice';

const ProtectedRoute = ({
  children,
  authRedirectTo,
  roleRedirectTo,
  roles,
}) => {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to={authRedirectTo} replace={true} />;
  }

  if (user && roles && !roles.includes(user.role)) {
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
