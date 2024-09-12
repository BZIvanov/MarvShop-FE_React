import PropTypes from 'prop-types';

import ShopProductCard from './cards/ShopProductCard';

const ProductsList = ({ productsDisplayType, products }) => {
  return (
    <div
      className={`w-full grid ${
        productsDisplayType === 'grid'
          ? 'grid-cols-2 xl:grid-cols-3'
          : 'grid-cols-1 xl:grid-cols-2'
      } gap-3`}
    >
      {products.map((product) => {
        return (
          <ShopProductCard
            key={product._id}
            product={product}
            productsDisplayType={productsDisplayType}
          />
        );
      })}
    </div>
  );
};

ProductsList.propTypes = {
  productsDisplayType: PropTypes.string,
  products: PropTypes.array,
};

export default ProductsList;
