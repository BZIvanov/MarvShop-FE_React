import { useMemo } from 'react';

import { useSelector } from '@/store/store';
import { selectCart } from '@/store/features/cart/cartSlice';

export const useCartSummary = () => {
  const cart = useSelector(selectCart);

  const cartProductsIds = useMemo(() => Object.keys(cart), [cart]);

  const cartProductsCount = cartProductsIds.length;

  const cartTotalPrice = useMemo(() => {
    return cartProductsIds
      .map((cartProductId) => {
        const {
          product: { price, discount },
          count,
        } = cart[cartProductId];

        return (price - price * discount) * count;
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }, [cart, cartProductsIds]);

  const cartSellersIds = useMemo(() => {
    return [
      ...cartProductsIds
        .map((cartProductId) => {
          const {
            product: { sellerId },
          } = cart[cartProductId];

          return sellerId;
        })
        .reduce(
          (accumulator, currentValue) => accumulator.add(currentValue),
          new Set()
        ),
    ];
  }, [cart, cartProductsIds]);

  const cartSellersCount = cartSellersIds.length;

  return { cart, cartProductsCount, cartTotalPrice, cartSellersCount };
};
