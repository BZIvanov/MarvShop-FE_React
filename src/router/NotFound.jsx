import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-blue-500'>404</h1>
        <p className='mt-4 text-xl text-gray-700'>
          Oops! The page you are looking for does not exist.
        </p>
        <Link to='/'>
          <button className='mt-6 px-8 py-3 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600'>
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
