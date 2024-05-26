import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import { createStore } from './store';

const StoreProvider = ({ children }) => {
  return <Provider store={createStore()}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreProvider;
