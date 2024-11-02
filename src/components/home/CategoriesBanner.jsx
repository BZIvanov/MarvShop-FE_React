import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { useDispatch } from '@/store/store';
import { useGetCategoriesQuery } from '@/store/services/categories';
import { changeFilter } from '@/store/features/productsFilters/productsFiltersSlice';

const CategoriesBanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useGetCategoriesQuery();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 640, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };

  const categories = data?.categories || [];

  return (
    <div className='w-[87%] mx-auto relative'>
      <div className='w-full'>
        <div className='text-center flex justify-center items-center flex-col text-3xl text-slate-600 font-bold relative pb-[35px]'>
          <h2>Top Categories</h2>
          <div className='w-[100px] h-[2px] bg-[#059473] mt-4'></div>
        </div>
      </div>

      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
      >
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => {
              dispatch(changeFilter({ categories: [category._id] }));
              navigate('/shop');
            }}
            className='h-[185px] border block cursor-pointer'
          >
            <div className='w-full h-full relative p-3'>
              <img src={category.image.imageUrl} alt='Category banner' />
              <div className='absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center'>
                <span className='py-[2px] px-6 bg-[#3330305d] text-white'>
                  {category.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CategoriesBanner;
