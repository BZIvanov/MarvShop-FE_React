import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { useSelector } from '@/store/store';
import {
  selectShop,
  selectShopInitialLoadingCompleted,
} from '@/store/features/shop/shopSlice';

const ShopStatus = ({ children, statusRedirectTo, statuses }) => {
  const shop = useSelector(selectShop);
  const shopInitialLoadingCompleted = useSelector(
    selectShopInitialLoadingCompleted
  );

  if (!shopInitialLoadingCompleted) {
    return <div>Loading</div>;
  }

  if (!statuses.includes(shop.activitystatus)) {
    return <Navigate to={statusRedirectTo} replace={true} />;
  }

  return children;
};

ShopStatus.propTypes = {
  children: PropTypes.node,
  statusRedirectTo: PropTypes.string,
  statuses: PropTypes.array,
};

export default ShopStatus;
