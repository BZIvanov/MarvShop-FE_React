import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaEye, FaRegHeart } from 'react-icons/fa';

import { useDispatch } from '../../../store/store';
import { addToCart } from '../../../store/features/cart/cartSlice';
import Rating from '../../common/Rating';
import AddToCart from '../actions/AddToCart';
import { currencyFormatter } from '../../../utils/formatting';

const ShopProductCard = ({ product, productsDisplayType }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, count: 1 }));
  };

  return (
    <div
      className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 ${
        productsDisplayType === 'grid'
          ? 'flex-col justify-start items-start'
          : 'flex-col lg:flex-row justify-start items-start lg:items-center'
      } w-full gap-4 bg-white p-1 rounded-md`}
    >
      <div
        className={
          productsDisplayType === 'grid'
            ? 'w-full relative group h-[170px] sm:h-[210px] md:h-[270px] overflow-hidden'
            : 'lg:w-full relative group h-[170px] sm:h-[210px] md:h-[270px] overflow-hidden'
        }
      >
        <img
          className='h-[170px] sm:h-[210px] md:h-[270px] rounded-md w-full object-cover'
          src={product.images[0].imageUrl}
          alt='Product preview'
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

      <div className='flex justify-start items-start flex-col gap-1'>
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

ShopProductCard.propTypes = {
  product: PropTypes.object,
  productsDisplayType: PropTypes.string,
};

export default ShopProductCard;