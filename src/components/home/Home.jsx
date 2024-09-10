import Header from '../common/Header';
import Footer from '../common/Footer';
import MainBanner from './MainBanner';
import CategoriesBanner from './CategoriesBanner';
import FeaturedProducts from '../product/FeaturedProducts';
import RecommendedProducts from '../product/RecommendedProducts';

const Home = () => {
  return (
    <div className='w-full'>
      <Header />

      <MainBanner />
      <CategoriesBanner />
      <FeaturedProducts />

      <div className='py-10'>
        <div className='w-[85%] flex flex-wrap mx-auto'>
          <div className='grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
            <div className='overflow-hidden'>
              <RecommendedProducts
                title='Latest Product'
                sortColumn='createdAt'
              />
            </div>

            <div className='overflow-hidden'>
              <RecommendedProducts
                title='Top Rated Product'
                sortColumn='rating'
              />
            </div>

            <div className='overflow-hidden'>
              <RecommendedProducts
                title='Discount Product'
                sortColumn='discount'
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
