import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { useDispatch } from '@/store/store';
import {
  useGetProductQuery,
  useGetSimilarProductsQuery,
} from '@/store/services/products';
import { showNotification } from '@/store/features/notification/notificationSlice';
import { addToCart } from '@/store/features/cart/cartSlice';
import { useAddToWishlistMutation } from '@/store/services/wishlist';
import Rating from '../common/Rating';
import Reviews from './Reviews';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import {
  GithubIcon,
  LinkedInIcon,
  TwitterIcon,
  FacebookIcon,
  HeartIcon,
} from '@/components/common/icons/Icons';
import { currencyFormatter, percentFormatter } from '@/utils/formatting';

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { slug } = useParams();

  const { data: productData } = useGetProductQuery(slug);
  const product = productData?.product;

  const { data: sameSellerProductsData } = useGetSimilarProductsQuery(
    { id: product?._id, similarColumn: 'seller' },
    { skip: !product?._id }
  );
  const sameSellerProducts = sameSellerProductsData?.products || [];
  const { data: sameCategoryProductsData } = useGetSimilarProductsQuery(
    { id: product?._id, similarColumn: 'category' },
    { skip: !product?._id }
  );
  const sameCategoryProducts = sameCategoryProductsData?.products || [];

  const [addToWishlist] = useAddToWishlistMutation();

  const [selectedPreviewImage, setSelectedPreviewImage] = useState('');

  const [selectedProductQuantity, setSelectedProductQuantity] = useState(1);

  const [activeTab, setActiveTab] = useState('reviews');

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

  const buyNow = () => {
    dispatch(
      addToCart({
        product,
        count: selectedProductQuantity,
      })
    );
    navigate('/shipping');
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
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

  return (
    <div>
      {product && (
        <Breadcrumbs
          links={[
            { linkTo: '/', label: 'Home' },
            { linkTo: '/category', label: product?.category?.name }, // TODO: create category page or redirect to Shop with category filtered
          ]}
          label={product.name}
        />
      )}

      <section>
        <div className='w-[90%] md:w-[85%] lg:w-[90%] h-full mx-auto mb-3'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <div>
              <div className='p-5 border'>
                <img
                  className='h-[400px] w-full'
                  src={selectedPreviewImage || product?.images[0].imageUrl}
                  alt='Product preview'
                />
              </div>
              <div className='py-3'>
                {product?.images && (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    responsive={responsive}
                    transitionDuration={500}
                  >
                    {product.images.map((productImage) => {
                      return (
                        <div
                          key={productImage.publicId}
                          onClick={() =>
                            setSelectedPreviewImage(productImage.imageUrl)
                          }
                        >
                          <img
                            className='h-[120px] cursor-pointer'
                            src={productImage.imageUrl}
                            alt='Product preview'
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                )}
              </div>
            </div>

            <div className='flex flex-col gap-5'>
              <div className='text-3xl text-slate-600 font-bold'>
                <h3>{product?.name}</h3>
              </div>
              <div className='flex justify-start items-center gap-4'>
                <div className='flex text-xl'>
                  <Rating rating={product?.rating} />
                </div>
                <span className='text-green-500'>(24 reviews)</span>
              </div>

              <div className='text-2xl text-red-500 font-bold flex gap-3'>
                {product?.discount !== 0 ? (
                  <h2>
                    Price:{' '}
                    <span className='line-through'>
                      {currencyFormatter(product?.price)}
                    </span>{' '}
                    $
                    {product?.price -
                      Math.floor(
                        (product?.price * product?.discount) / 100
                      )}{' '}
                    (-
                    {product?.discount}%)
                  </h2>
                ) : (
                  <h2>Price: {currencyFormatter(product?.price)}</h2>
                )}
              </div>

              <div className='text-slate-600'>
                <p>
                  {product?.description.length > 300
                    ? product?.description.substring(0, 300) + '...'
                    : product?.description}
                </p>
              </div>

              <div className='flex gap-3 pb-10 border-b'>
                {product?.stock > 0 ? (
                  <>
                    <div className='flex bg-slate-200 h-[50px] justify-center items-center text-xl'>
                      <div
                        onClick={() => {
                          setSelectedProductQuantity((prevState) => {
                            if (prevState <= 1) {
                              return 1;
                            }
                            return prevState - 1;
                          });
                        }}
                        className='px-3 lg:px-4 cursor-pointer'
                      >
                        -
                      </div>
                      <div className='px-3 lg:px-4'>
                        {selectedProductQuantity}
                      </div>
                      <div
                        onClick={() => {
                          setSelectedProductQuantity((prevState) => {
                            if (prevState >= product.stock) {
                              return prevState;
                            }
                            return prevState + 1;
                          });

                          if (selectedProductQuantity >= product.stock) {
                            dispatch(
                              showNotification({
                                type: 'success',
                                message: `Maximum quantity selected`,
                              })
                            );
                          }
                        }}
                        className='px-3 lg:px-4 cursor-pointer'
                      >
                        +
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          dispatch(
                            addToCart({
                              product,
                              count: selectedProductQuantity,
                            })
                          );
                          dispatch(
                            showNotification({
                              type: 'success',
                              message: `Added to cart`,
                            })
                          );
                        }}
                        className='px-5 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#059473] text-white'
                      >
                        Add To Cart
                      </button>
                    </div>
                  </>
                ) : null}
                <div
                  onClick={handleAddToWishlist}
                  className='h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white'
                >
                  <HeartIcon />
                </div>
              </div>

              <div className='flex py-5 gap-5'>
                <div className='w-[150px] text-black font-bold text-xl flex flex-col gap-5'>
                  <span>Availability</span>
                  <span>Share On</span>
                </div>
                <div className='flex flex-col gap-5'>
                  <span
                    className={`text-${
                      product?.stock > 0 ? 'green' : 'red'
                    }-500`}
                  >
                    {product?.stock > 0
                      ? `In Stock (${product?.stock})`
                      : 'Out Of Stock'}
                  </span>

                  <ul className='flex justify-start items-center gap-3'>
                    <li>
                      <Link
                        to='/'
                        className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full text-white'
                      >
                        <FacebookIcon />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/'
                        className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-cyan-500 rounded-full text-white'
                      >
                        <TwitterIcon />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/'
                        className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-purple-500 rounded-full text-white'
                      >
                        <LinkedInIcon />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/'
                        className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-blue-500 rounded-full text-white'
                      >
                        <GithubIcon />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className='flex gap-3'>
                {product?.stock > 0 ? (
                  <button
                    onClick={buyNow}
                    className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#247462] text-white'
                  >
                    Buy Now
                  </button>
                ) : null}
                <Link
                  // TODO: check for user and if no user, redirect to login
                  to={`/buyer/chat/${product?.seller?.userId}`}
                  className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 text-white'
                >
                  Chat Seller
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='w-[90%] md:w-[85%] lg:w-[90%] h-full mx-auto pb-16'>
          <div className='flex flex-wrap'>
            <div className='w-full lg:w-[72%]'>
              <div className='pr-0 lg:pr-4'>
                <div className='grid grid-cols-2'>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`py-1 hover:text-white px-5 hover:bg-[#059473] ${
                      activeTab === 'reviews'
                        ? 'bg-[#059473] text-white'
                        : 'bg-slate-200 text-slate-700'
                    } rounded-sm`}
                  >
                    Reviews
                  </button>

                  <button
                    onClick={() => setActiveTab('description')}
                    className={`py-1 hover:text-white px-5 hover:bg-[#059473] ${
                      activeTab === 'description'
                        ? 'bg-[#059473] text-white'
                        : 'bg-slate-200 text-slate-700'
                    } rounded-sm`}
                  >
                    Description
                  </button>
                </div>

                <div>
                  {activeTab === 'reviews' ? (
                    <>{product && <Reviews product={product} />}</>
                  ) : (
                    <p className='py-5 text-slate-600'>
                      {product?.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className='w-full lg:w-[28%]'>
              <div className='pl-0 lg:pl-4'>
                <div className='px-3 py-2 text-slate-600 bg-slate-200'>
                  <h2 className='font-bold'>From Marv Shop</h2>
                </div>
                <div className='flex flex-col gap-5 mt-3 border p-3'>
                  {sameSellerProducts.map((sellerProduct) => {
                    return (
                      <Link key={sellerProduct._id} className='block'>
                        <div className='relative h-[270px]'>
                          <img
                            className='w-full h-full'
                            src={sellerProduct.images[0].imageUrl}
                            alt='Product preview'
                          />
                          {sellerProduct.discount !== 0 && (
                            <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                              {percentFormatter(sellerProduct.discount)}
                            </div>
                          )}
                        </div>

                        <h2 className='text-slate-600 py-1 font-bold'>
                          {sellerProduct.name}
                        </h2>
                        <div className='flex gap-2'>
                          <h2 className='text-lg font-bold text-slate-600'>
                            {currencyFormatter(sellerProduct.price)}
                          </h2>
                          <div className='flex items-center gap-2'>
                            <Rating rating={sellerProduct.rating} />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='w-[90%] md:w-[85%] lg:w-[90%] h-full mx-auto'>
          <h2 className='text-2xl py-8 text-slate-600'>Similar Products</h2>
          <div>
            <Swiper
              slidesPerView='auto'
              breakpoints={{
                1280: {
                  slidesPerView: 3,
                },
                565: {
                  slidesPerView: 2,
                },
              }}
              spaceBetween={25}
              loop={true}
              pagination={{
                clickable: true,
                el: '.custom_bullet',
              }}
              modules={[Pagination]}
              className='mySwiper'
            >
              {sameCategoryProducts.map((categoryProduct) => {
                return (
                  <SwiperSlide key={categoryProduct._id}>
                    <Link className='block'>
                      <div className='relative h-[270px]'>
                        <div className='w-full h-full'>
                          <img
                            className='w-full h-full'
                            src={categoryProduct.images[0].imageUrl}
                            alt='Product preview'
                          />
                          <div className='absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-50 transition-all duration-500'></div>
                        </div>
                        {categoryProduct.discount !== 0 && (
                          <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                            {percentFormatter(categoryProduct.discount)}
                          </div>
                        )}
                      </div>

                      <div className='p-4 flex flex-col gap-1'>
                        <h2 className='text-slate-600 text-lg font-bold'>
                          {categoryProduct.name}
                        </h2>
                        <div className='flex justify-start items-center gap-3'>
                          <h2 className='text-lg font-bold text-slate-600'>
                            {currencyFormatter(categoryProduct.price)}
                          </h2>
                          <div className='flex'>
                            <Rating rating={categoryProduct.rating} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className='w-full flex justify-center items-center py-8'>
            <div className='custom_bullet justify-center gap-3 !w-auto'></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
