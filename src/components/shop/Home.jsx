import Header from './Header';
import Banner from './Banner';
import CategoriesBanner from './CategoriesBanner';

const Home = () => {
  return (
    <div className='w-full'>
      <Header />
      <Banner />
      <CategoriesBanner />
    </div>
  );
};

export default Home;
