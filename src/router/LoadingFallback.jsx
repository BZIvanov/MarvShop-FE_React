const LoadingFallback = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col items-center space-y-4'>
        <div className='w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500' />
        <p className='text-blue-500 font-semibold text-lg'>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingFallback;
