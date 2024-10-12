import { useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

import Header from './headers/Header';
import Subheader from './headers/Subheader';
import ShopSidebar from './sidebars/ShopSidebar';
import Footer from './footers/Footer';

const ShopLayout = ({ showSubheader = true }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div>
      <Header setShowSidebar={setShowSidebar} />

      {showSubheader && <Subheader />}

      <ShopSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

ShopLayout.propTypes = {
  showSubheader: PropTypes.bool,
};

export default ShopLayout;
