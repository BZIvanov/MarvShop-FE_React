import PropTypes from 'prop-types';

import { useDispatch, useSelector } from '@/store/store';
import { selectCartProductById } from '@/store/features/cart/cartSlice';
import { showNotification } from '@/store/features/notification/notificationSlice';
import {
  ShoppingCartLineIcon,
  ShoppingCartOffIcon,
} from '@/components/common/icons/Icons';

const AddToCart = ({ onAddToCart, productId, productStock }) => {
  const dispatch = useDispatch();

  const cartProduct = useSelector(selectCartProductById(productId));

  const isProductInCart = cartProduct !== undefined;
  const isOutOfStock = productStock === 0;

  return (
    <span
      onClick={() => {
        let type = 'error';
        let message = '';

        if (isOutOfStock) {
          message = 'Product out of stock';
        } else if (isProductInCart) {
          message = 'Product already in cart';
        } else {
          onAddToCart();
          type = 'success';
          message = 'Added to cart';
        }

        dispatch(
          showNotification({
            type,
            message,
          })
        );
      }}
      className={`w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full ${
        isProductInCart || isOutOfStock
          ? 'hover:bg-[#f72720]'
          : 'hover:bg-[#059473]'
      } hover:text-white hover:rotate-[720deg] transition-all`}
    >
      {isProductInCart || isOutOfStock ? (
        <ShoppingCartOffIcon />
      ) : (
        <ShoppingCartLineIcon />
      )}
    </span>
  );
};

AddToCart.propTypes = {
  productId: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  productStock: PropTypes.number.isRequired,
};

export default AddToCart;
