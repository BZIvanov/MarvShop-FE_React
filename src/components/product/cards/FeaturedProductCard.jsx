import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from '@/store/store';
import { addToCart } from '@/store/features/cart/cartSlice';
import { useAddToWishlistMutation } from '@/store/services/wishlist';
import { showNotification } from '@/store/features/notification/notificationSlice';
import Rating from '../../common/Rating';
import AddToCart from './actions/AddToCart';
import AddToWishlist from './actions/AddToWishlist';
import { EyeIcon } from '@/components/common/icons/Icons';
import { currencyFormatter, percentFormatter } from '@/utils/formatting';

const FeaturedProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addToWishlist] = useAddToWishlistMutation();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, count: 1 }));
  };

  const handleAddToWishlist = async () => {
    const result = await addToWishlist(product._id);

    if ('error' in result) {
      navigate('/buyer/wishlist');
    } else {
      dispatch(
        showNotification({ type: 'success', message: 'Added to the wishlist' })
      );
    }
  };

  return (
    <div
      key={product._id}
      className='border group transition-all duration-500 hover:shadow-md hover:-mt-3'
    >
      <div className='relative overflow-hidden'>
        {product.discount > 0 ? (
          <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
            {percentFormatter(product.discount)}
          </div>
        ) : null}

        <img
          className='w-full h-[240px]'
          src={product.images[0].imageUrl}
          alt='Product preview'
        />

        <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
          <li>
            <AddToWishlist
              slug={product.slug}
              onAddToWishlist={handleAddToWishlist}
            />
          </li>
          <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
            <Link to={`/products/${product.slug}`}>
              <EyeIcon />
            </Link>
          </li>
          <li>
            <AddToCart
              productId={product._id}
              productStock={product.stock}
              onAddToCart={handleAddToCart}
            />
          </li>
        </ul>
      </div>

      <div className='py-3 text-slate-600 px-2'>
        <h2 className='font-bold'>{product.name}</h2>
        <div className='flex justify-start items-center gap-3'>
          <span className='text-md font-semibold'>
            {currencyFormatter(product.price)}
          </span>
          <div className='flex'>
            <Rating rating={product.rating} />
          </div>
        </div>
      </div>
    </div>
  );
};

FeaturedProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default FeaturedProductCard;
