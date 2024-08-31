import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { useSelector } from '../../store/store';
import {
  selectSeller,
  selectSellerInitialLoadingCompleted,
} from '../../store/features/seller/sellerSlice';

const SellerStatus = ({ children, statusRedirectTo, statuses }) => {
  const seller = useSelector(selectSeller);
  const sellerInitialLoadingCompleted = useSelector(
    selectSellerInitialLoadingCompleted
  );

  if (!sellerInitialLoadingCompleted) {
    return <div>Loading</div>;
  }

  if (!statuses.includes(seller.status)) {
    return <Navigate to={statusRedirectTo} replace={true} />;
  }

  return children;
};

SellerStatus.propTypes = {
  children: PropTypes.node,
  statusRedirectTo: PropTypes.string,
  statuses: PropTypes.array,
};

export default SellerStatus;
