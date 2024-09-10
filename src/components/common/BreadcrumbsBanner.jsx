import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

const BreadcrumbsBanner = ({ pageName }) => {
  return (
    <section className='bg-[url("/images/shop-banner.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
      <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
        <div className='w-[85%] sm:w-[90%] md:w-[80%] lg:w-[90%] h-full mx-auto'>
          <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
            <h2 className='text-3xl font-bold'>{pageName} Page</h2>
            <div className='flex justify-center items-center gap-2 text-2xl w-full'>
              <Link to='/'>Home</Link>
              <span className='pt-1'>
                <IoIosArrowForward />
              </span>
              <span>{pageName}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

BreadcrumbsBanner.propTypes = {
  pageName: PropTypes.string,
};

export default BreadcrumbsBanner;
