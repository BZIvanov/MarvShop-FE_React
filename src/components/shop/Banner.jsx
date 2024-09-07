import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const Banner = () => {
  return (
    <div className='w-full mt-6'>
      <div className='w-[90%] lg:w-[85%] mx-auto'>
        <div className='w-full flex flex-wrap gap-8'>
          <div className='w-full'>
            <div className='my-8'>
              <Carousel
                autoPlay={true}
                infinite={true}
                arrows={true}
                showDots={true}
                responsive={responsive}
              >
                {[1, 2, 3, 4, 5, 6].map((image, i) => (
                  <Link key={i} to='/'>
                    <img src={'/images/logo.png'} alt='Product banner' />
                  </Link>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
