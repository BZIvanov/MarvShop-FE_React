import { useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

import Header from '../header/Header';
import Subheader from '../header/Subheader';
import Sidebar from '../header/Sidebar';

const ShopLayout = ({ showSubheader = true }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div>
      <Header setShowSidebar={setShowSidebar} />

      {showSubheader && <Subheader />}

      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

ShopLayout.propTypes = {
  showSubheader: PropTypes.bool,
};

export default ShopLayout;
