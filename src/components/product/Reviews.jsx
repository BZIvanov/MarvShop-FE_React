import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rating, RoundedStar } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

import { useSelector } from '../../store/store';
import { selectUser } from '../../store/features/user/userSlice';
import MyRating from '../common/Rating';
import RatingTemp from './RatingTemp';
import Pagination from './Pagination';

const Reviews = ({ product }) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const user = useSelector(selectUser);

  const [rating, setRating] = useState(0);
  const [userReview, setUserReview] = useState('');

  const ratingStyles = {
    itemShapes: RoundedStar,
    itemStrokeWidth: 1,
    activeFillColor: '#ffb700',
    activeBoxBorderColor: '#ffb700',
    inactiveFillColor: '#fbfaaa',
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className='mt-8 mb-8 lg:mb-0'>
      <div className='flex flex-col lg:flex-row gap-10'>
        <div className='flex flex-col gap-2 justify-start items-start py-4'>
          <div>
            <span className='text-6xl font-semibold'>{product.rating}</span>
            <span className='text-3xl font-semibold text-slate-600'>/5</span>
          </div>
          <div className='flex text-3xl'>
            <MyRating rating={4.5} />
          </div>
          <p className='text-sm text-slate-600'>15 Reviews</p>
        </div>

        <div className='flex gap-2 flex-col py-4'>
          <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingTemp rating={5} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='h-full bg-[#Edbb0E] w-[60%]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>10</p>
          </div>

          <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingTemp rating={4} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='h-full bg-[#Edbb0E] w-[70%]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>20</p>
          </div>

          <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingTemp rating={3} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='h-full bg-[#Edbb0E] w-[40%]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>8</p>
          </div>

          <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingTemp rating={2} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='h-full bg-[#Edbb0E] w-[30%]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>5</p>
          </div>

          <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingTemp rating={1} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='h-full bg-[#Edbb0E] w-[10%]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>3</p>
          </div>

          <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingTemp rating={0} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='h-full bg-[#Edbb0E] w-[0%]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>0</p>
          </div>
        </div>
      </div>

      <h2 className='text-slate-600 text-xl font-bold py-5'>
        Product Reviews 10
      </h2>

      <div className='flex flex-col gap-8 pb-10 pt-4'>
        {[1, 2, 3, 4, 5].map((r, i) => (
          <div key={i} className='flex flex-col gap-1'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-1 text-xl'>
                <RatingTemp rating={4} />
              </div>
              <span className='text-slate-600'>8 Dec 2024</span>
            </div>
            <span className='text-slate-600 text-md'>Iva Ivanova</span>
            <p className='text-slate-600 text-sm'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s
            </p>
          </div>
        ))}
        <div className='flex justify-end'>
          <Pagination
            pageNumber={page}
            setPageNumber={setPage}
            totalItem={10}
            perPage={perPage}
            showItem={Math.floor(10 / 3)}
          />
        </div>
      </div>

      <div>
        {user ? (
          <div className='flex flex-col gap-3'>
            <div className='flex gap-1'>
              <Rating
                style={{ maxWidth: 200 }} // maxWidth controls the size
                value={rating}
                onChange={setRating}
                itemStyles={ratingStyles}
              />
            </div>
            <form onSubmit={handleReviewSubmit}>
              <textarea
                value={userReview}
                onChange={(event) => setUserReview(event.target.value)}
                required={true}
                cols='30'
                rows='5'
                className='border outline-0 p-3 w-full'
              ></textarea>
              <div className='mt-2'>
                <button className='py-1 px-5 bg-indigo-500 text-white rounded-sm'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <Link
              to='/auth/login'
              className='py-1 px-5 bg-red-500 text-white rounded-sm'
            >
              Login to comment
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

Reviews.propTypes = {
  product: PropTypes.object,
};

export default Reviews;
