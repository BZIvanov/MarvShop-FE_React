import { useGetProductsQuery } from '../../store/services/products';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  // it will be the latest products, maybe the query should be updated
  const { data } = useGetProductsQuery({
    page: 1,
    perPage: 12,
  });

  return (
    <div className='w-[85%] flex flex-wrap mx-auto py-[45px]'>
      <div className='w-full'>
        <div className='text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]'>
          <h2>Featured Products</h2>
          <div className='w-[100px] h-[2px] bg-[#059473] mt-4' />
        </div>
      </div>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {data?.products.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
