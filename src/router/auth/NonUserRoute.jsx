import PropTypes from 'prop-types';
import { useLocation, Navigate } from 'react-router-dom';

import { useSelector } from '@/store/store';
import { selectUser } from '@/store/features/user/userSlice';

const NonUserRoute = ({ children }) => {
  const location = useLocation();

  const user = useSelector(selectUser);

  if (user) {
    const customNavigateTo = location.state?.customNavigateTo;
    if (customNavigateTo) {
      return <Navigate to={customNavigateTo} replace={true} />;
    }

    return <Navigate to='/' replace={true} />;
  }

  return children;
};

NonUserRoute.propTypes = {
  children: PropTypes.node,
};

export default NonUserRoute;
