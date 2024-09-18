import { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoMdImages } from 'react-icons/io';
import { IoMdCloseCircle } from 'react-icons/io';

import { useDispatch } from '../../store/store';
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from '../../store/services/products';
import { useGetCategoriesQuery } from '../../store/services/categories';
import { showNotification } from '../../store/features/notification/notificationSlice';
import { useIsAnyApiRequestPending } from '../../hooks/useIsAnyApiRequestPending';
import ButtonLoadingIndicator from '../common/feedback/ButtonLoadingIndicator';

const SellerEditProduct = () => {
  const dispatch = useDispatch();

  const { slug } = useParams();

  const isLoading = useIsAnyApiRequestPending();

  const [updateProduct] = useUpdateProductMutation();

  const { data: categoriesData, isSuccess: isCategoriesSuccess } =
    useGetCategoriesQuery();

  const { data: productData, isSuccess: isProductsSuccess } =
    useGetProductQuery(slug, {
      skip: !slug,
    });

  const categories = useMemo(
    () => categoriesData?.categories || [],
    [categoriesData]
  );

  const [formValues, setFormValues] = useState({
    name: '',
    brand: '',
    stock: '',
    price: '',
    discount: '',
    description: '',
  });

  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
  const [searchCategoryValue, setSearchCategoryValue] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (isCategoriesSuccess) {
      setFilteredCategories(categoriesData?.categories);
    }
  }, [isCategoriesSuccess, categoriesData?.categories]);

  useEffect(() => {
    if (isProductsSuccess) {
      const product = productData.product;

      setFormValues({
        name: product.name,
        brand: product.brand,
        stock: product.stock,
        price: product.price,
        discount: product.discount,
        description: product.description,
      });

      setSelectedCategory(product.category);

      setImages(product.images);
    }
  }, [isProductsSuccess, productData]);

  const handleInputChange = (event) => {
    setFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const categorySearch = (event) => {
    const value = event.target.value;
    setSearchCategoryValue(value);

    if (value) {
      const filtered = categories.filter(
        (category) =>
          category.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  };

  const handleNewImageChange = (event) => {
    const files = event.target.files;
    const filesLength = files.length;

    if (filesLength > 0) {
      const newImages = [];
      for (let i = 0; i < filesLength; i++) {
        newImages.push({
          file: files[i],
          imageUrl: URL.createObjectURL(files[i]),
        });
      }

      setImages((prevState) => [...prevState, ...newImages]);
    }
  };

  useEffect(() => {
    const stateImages = images;

    return () => {
      stateImages.forEach((image) => {
        // if there is no publicId, it is newly uploaded image
        if (!image.publicId) {
          URL.revokeObjectURL(image.imageUrl);
        }
      });
    };
  }, [images]);

  const replaceImage = (newImage, idx) => {
    const tempImages = [...images];

    // if there is no publicId, it is newly uploaded file
    if (!tempImages[idx].publicId) {
      URL.revokeObjectURL(tempImages[idx].imageUrl);
    }

    tempImages[idx] = {
      file: newImage,
      imageUrl: URL.createObjectURL(newImage),
    };

    setImages(tempImages);
  };

  const removeImage = (idx) => {
    if (!images[idx].publicId) {
      URL.revokeObjectURL(images[idx].imageUrl);
    }

    const imagesToKeep = [...images.slice(0, idx), ...images.slice(idx + 1)];

    setImages(imagesToKeep);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', formValues.name);
    formData.append('brand', formValues.brand);
    formData.append('category', selectedCategory._id);
    formData.append('stock', formValues.stock);
    formData.append('price', formValues.price);
    formData.append('discount', formValues.discount);
    formData.append('description', formValues.description);
    for (let i = 0; i < images.length; i++) {
      if (images[i].file) {
        formData.append('newImages', images[i].file);
      } else {
        formData.append('existingImages', JSON.stringify(images[i]));
      }
    }

    const result = await updateProduct({
      id: productData.product._id,
      formData,
    });

    if (!('error' in result)) {
      dispatch(
        showNotification({
          type: 'success',
          message: 'Product updated successfully',
        })
      );
    }
  };

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='flex justify-between items-center pb-4'>
          <h1 className='text-[#d0d2d6] text-xl font-semibold'>Edit Product</h1>
          <Link
            to='/seller/products'
            className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2'
          >
            All Products
          </Link>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='name'>Product Name</label>
                <input
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  onChange={handleInputChange}
                  value={formValues.name}
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Product Name'
                />
              </div>

              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='brand'>Product Brand</label>
                <input
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  onChange={handleInputChange}
                  value={formValues.brand}
                  type='text'
                  name='brand'
                  id='brand'
                  placeholder='Brand Name'
                />
              </div>
            </div>

            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
              <div className='flex flex-col w-full gap-1 relative'>
                <label htmlFor='category'>Category</label>
                <input
                  readOnly={true}
                  onClick={() =>
                    setIsCategoryExpanded((prevState) => !prevState)
                  }
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  value={selectedCategory?.name || ''}
                  type='text'
                  id='category'
                  placeholder='Select category'
                />

                <div
                  className={`absolute top-[101%] bg-[#475569] w-full transition-all ${
                    isCategoryExpanded ? 'scale-100' : 'scale-0'
                  }`}
                >
                  <div className='w-full px-4 py-2 fixed'>
                    <input
                      value={searchCategoryValue}
                      onChange={categorySearch}
                      className='px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden'
                      type='text'
                      placeholder='search'
                    />
                  </div>
                  <div className='pt-14'></div>
                  <div className='flex justify-start items-start flex-col overflow-x-scrool'>
                    {filteredCategories.map((category) => (
                      <span
                        key={category._id}
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          selectedCategory?.name === category.name &&
                          'bg-indigo-500'
                        }`}
                        onClick={() => {
                          setIsCategoryExpanded(false);
                          setSelectedCategory(category);
                          setSearchCategoryValue('');
                          setFilteredCategories(categories);
                        }}
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='stock'>Product Stock</label>
                <input
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  onChange={handleInputChange}
                  value={formValues.stock}
                  type='text'
                  name='stock'
                  id='stock'
                  placeholder='Stock'
                />
              </div>
            </div>

            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='price'>Price</label>
                <input
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  onChange={handleInputChange}
                  value={formValues.price}
                  type='number'
                  name='price'
                  id='price'
                  placeholder='Price'
                />
              </div>

              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='discount'>Discount</label>
                <input
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  onChange={handleInputChange}
                  value={formValues.discount}
                  type='number'
                  name='discount'
                  id='discount'
                  placeholder='Discount by %'
                />
              </div>
            </div>

            <div className='flex flex-col w-full gap-1 mb-5'>
              <label htmlFor='description' className='text-[#d0d2d6]'>
                Description
              </label>
              <textarea
                className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                onChange={handleInputChange}
                value={formValues.description}
                name='description'
                id='description'
                placeholder='Description'
                cols='10'
                rows='4'
              ></textarea>
            </div>

            <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4'>
              {images.map((image, idx) => {
                return (
                  <div key={idx} className='h-[180px] relative'>
                    <label htmlFor={idx} className='cursor-grab'>
                      <img
                        className='w-full h-full rounded-sm'
                        src={image.imageUrl}
                        alt='Product preview'
                      />
                    </label>
                    <input
                      onChange={(event) =>
                        replaceImage(event.target.files[0], idx)
                      }
                      type='file'
                      id={idx}
                      className='hidden'
                    />
                    <span
                      onClick={() => removeImage(idx)}
                      className='p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full'
                    >
                      <IoMdCloseCircle />
                    </span>
                  </div>
                );
              })}

              <label
                className='flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-full text-[#d0d2d6]'
                htmlFor='image'
              >
                <span>
                  <IoMdImages />
                </span>
                <span>Select Image</span>
              </label>
              <input
                name='image'
                onChange={handleNewImageChange}
                multiple={true}
                type='file'
                id='image'
                className='hidden'
              />
            </div>

            <div className='flex'>
              <button
                disabled={isLoading}
                className='bg-red-500 w-[280px] hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2'
              >
                {isLoading ? <ButtonLoadingIndicator /> : 'Edit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerEditProduct;
