import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for could not be found.</p>
      <p>TODO: add styles</p>
      <Link to='/'>Go to Homepage</Link>
    </div>
  );
};

export default NotFound;
