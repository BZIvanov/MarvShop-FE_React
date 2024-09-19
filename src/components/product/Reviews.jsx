import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rating, RoundedStar } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

import { useDispatch, useSelector } from '../../store/store';
import { selectUser } from '../../store/features/user/userSlice';
import {
  useGetProductReviewsQuery,
  useReviewProductMutation,
  useGetProductReviewsSummaryQuery,
} from '../../store/services/reviews';
import { showNotification } from '../../store/features/notification/notificationSlice';
import MyRating from '../common/Rating';
import RatingTemp from './RatingTemp';
import Pagination from './Pagination';
import { dateFormatter } from '../../utils/formatting';

const perPage = 5;

const Reviews = ({ product }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const user = useSelector(selectUser);

  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  const { data: reviewsData } = useGetProductReviewsQuery({
    productId: product._id,
    page,
    perPage,
  });
  const reviews = reviewsData?.reviews || [];

  const { data: reviewsSummaryData } = useGetProductReviewsSummaryQuery(
    product._id
  );
  const reviewSummary = reviewsSummaryData?.review || {};

  const [reviewProduct] = useReviewProductMutation();

  const ratingStyles = {
    itemShapes: RoundedStar,
    itemStrokeWidth: 1,
    activeFillColor: '#ffb700',
    activeBoxBorderColor: '#ffb700',
    inactiveFillColor: '#fbfaaa',
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    const result = await reviewProduct({
      id: product._id,
      rating: reviewRating,
      comment: reviewComment,
    });

    if (!('error' in result)) {
      dispatch(
        showNotification({
          type: 'success',
          message: `Successfully rated with rating of ${reviewRating} stars`,
        })
      );
      setReviewRating(0);
      setReviewComment('');
    }
  };

  return (
    <div className='mt-8 mb-8 lg:mb-0'>
      <div className='flex flex-col lg:flex-row gap-10'>
        <div className='flex flex-col gap-2 justify-start items-start py-4'>
          <div>
            <span className='text-6xl font-semibold'>
              {reviewSummary.averageRating?.toFixed(1)}
            </span>
            <span className='text-3xl font-semibold text-slate-600'>/5</span>
          </div>
          <div className='flex text-3xl'>
            <MyRating rating={reviewSummary.averageRating} />
          </div>
          <p className='text-sm text-slate-600'>
            ({reviewSummary.totalReviews}) Reviews
          </p>
        </div>

        <div className='flex gap-2 flex-col py-4'>
          {Object.keys(reviewSummary?.ratings || {})
            .reverse()
            .map((reviewSummaryRating) => {
              const totalReviewCount = reviewSummary.totalReviews;
              const starReviewCount =
                reviewSummary.ratings[reviewSummaryRating].count;

              const barWidth =
                totalReviewCount === 0 || starReviewCount === 0
                  ? 0
                  : (starReviewCount / totalReviewCount) * 100;

              return (
                <div
                  key={reviewSummaryRating}
                  className='flex justify-start items-center gap-5'
                >
                  <div className='text-md flex gap-1 w-[93px]'>
                    <RatingTemp rating={Number(reviewSummaryRating)} />
                  </div>
                  <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                    <div
                      className='h-full bg-[#Edbb0E]'
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <p className='text-sm text-slate-600 w-[0%]'>
                    {reviewSummary.ratings[reviewSummaryRating].count}
                  </p>
                </div>
              );
            })}
        </div>
      </div>

      <h2 className='text-slate-600 text-xl font-bold py-5'>
        Product Reviews ({reviewsData?.totalCount})
      </h2>

      <div className='flex flex-col gap-8 pb-10 pt-4'>
        {reviews.map((productReview) => {
          return (
            <div key={productReview._id} className='flex flex-col gap-1'>
              <div className='flex justify-between items-center'>
                <div className='flex gap-1 text-xl'>
                  <RatingTemp rating={productReview.rating} />
                </div>
                <span className='text-slate-600'>
                  {dateFormatter(productReview.updatedAt)}
                </span>
              </div>
              <span className='text-slate-600 text-md'>
                {productReview.user.username}
              </span>
              <p className='text-slate-600 text-sm'>{productReview.comment}</p>
            </div>
          );
        })}
        {reviewsData?.totalCount > perPage && (
          <div className='flex justify-end'>
            <Pagination
              pageNumber={page}
              setPageNumber={setPage}
              totalItem={reviewsData?.totalCount ?? 0}
              perPage={perPage}
              showItem={3}
            />
          </div>
        )}
      </div>

      <div>
        {user ? (
          <div className='flex flex-col gap-3'>
            <div className='flex gap-1'>
              <Rating
                style={{ maxWidth: 200 }} // maxWidth controls the size
                value={reviewRating}
                onChange={setReviewRating}
                itemStyles={ratingStyles}
              />
            </div>
            <form onSubmit={handleReviewSubmit}>
              <textarea
                value={reviewComment}
                onChange={(event) => setReviewComment(event.target.value)}
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
