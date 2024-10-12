import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8'>
      <h1 className='text-4xl font-bold text-red-600 mb-4'>
        Oops! Something went wrong
      </h1>
      <p className='text-lg text-gray-700 mb-6'>
        {error?.data ||
          error?.error?.message ||
          error?.message ||
          'An unexpected error occurred.'}
      </p>
      <button
        onClick={() => window.location.reload()}
        className='px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200'
      >
        Reload Page
      </button>
    </div>
  );
};

export default ErrorBoundary;
