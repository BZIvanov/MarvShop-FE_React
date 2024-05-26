import { useRoutes } from 'react-router-dom';

import publicRoutes from './routes/PublicRoutes';

const Router = () => {
  const routes = useRoutes([...publicRoutes]);

  return routes;
};

export default Router;
