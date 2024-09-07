import Header from './Header';
import Banner from './Banner';
import CategoriesBanner from './CategoriesBanner';
import FeaturedProducts from './FeaturedProducts';
import RecommendedProducts from './RecommendedProducts';

const Home = () => {
  return (
    <div className='w-full'>
      <Header />
      <Banner />
      <CategoriesBanner />
      <FeaturedProducts />

      <div className='py-10'>
        <div className='w-[85%] flex flex-wrap mx-auto'>
          <div className='grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
            <div className='overflow-hidden'>
              <RecommendedProducts title='Latest Product' />
            </div>

            <div className='overflow-hidden'>
              <RecommendedProducts title='Top Rated Product' />
            </div>

            <div className='overflow-hidden'>
              <RecommendedProducts title='Discount Product' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
