import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaEye, FaRegHeart } from 'react-icons/fa';

import { useDispatch } from '../../store/store';
import { addToCart } from '../../store/features/cart/cartSlice';
import Rating from '../common/Rating';
import AddToCart from './actions/AddToCart';
import { currencyFormatter, percentFormatter } from '../../utils/formatting';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, count: 1 }));
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
          alt='Product image'
        />

        <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
          <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
            <FaRegHeart />
          </li>
          <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
            <Link to={`/products/${product.slug}`}>
              <FaEye />
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

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
