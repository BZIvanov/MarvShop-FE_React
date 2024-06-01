import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div>
      <h1>App Error</h1>
      <p>{error.data || error.error?.message}</p>
    </div>
  );
};

export default ErrorBoundary;
