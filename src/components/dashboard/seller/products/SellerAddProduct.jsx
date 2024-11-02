import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useDispatch } from '@/store/store';
import { useCreateProductMutation } from '@/store/services/products';
import { useGetCategoriesQuery } from '@/store/services/categories';
import { showNotification } from '@/store/features/notification/notificationSlice';
import { Form } from '@/components/ui/form';
import { CloseCircleIcon, ImagesIcon } from '@/components/common/icons/Icons';
import TextField from '@/components/form/TextField';
import TextareaField from '@/components/form/TextareaField';
import SelectField from '@/components/form/SelectField';
import SubmitButton from '@/components/common/buttons/SubmitButton';
import { Button } from '@/components/ui/button';
import { resolver } from './product-form-schema';

const SellerAddProduct = () => {
  const dispatch = useDispatch();

  const form = useForm({
    resolver,
    defaultValues: {
      name: '',
      brand: '',
      category: '',
      price: '',
      stock: '',
      discount: '',
      description: '',
    },
  });

  const { data } = useGetCategoriesQuery();
  const categories = useMemo(
    () =>
      data?.categories?.map((category) => ({
        value: category._id,
        label: category.name,
      })) || [],
    [data]
  );

  const [images, setImages] = useState([]);

  const [createProduct, { isLoading }] = useCreateProductMutation();

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
      stateImages.forEach((image) => URL.revokeObjectURL(image.imageUrl));
    };
  }, [images]);

  const replaceImage = (newImage, idx) => {
    const tempImages = [...images];

    URL.revokeObjectURL(tempImages[idx].imageUrl);

    tempImages[idx] = {
      file: newImage,
      imageUrl: URL.createObjectURL(newImage),
    };

    setImages(tempImages);
  };

  const removeImage = (idx) => {
    URL.revokeObjectURL(images[idx].imageUrl);

    const imagesToKeep = [...images.slice(0, idx), ...images.slice(idx + 1)];

    setImages(imagesToKeep);
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('brand', values.brand);
    formData.append('category', values.category);
    formData.append('stock', values.stock);
    formData.append('price', values.price);
    formData.append('discount', values.discount);
    formData.append('description', values.description);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i].file);
    }

    const result = await createProduct(formData);

    if (!('error' in result)) {
      setImages([]);

      dispatch(
        showNotification({
          type: 'success',
          message: `Product created successfully`,
        })
      );
    }
  };

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='flex justify-between items-center pb-4'>
          <h1 className='text-[#d0d2d6] text-xl font-semibold'>
            Create Product
          </h1>
          <Button variant='destructive' asChild={true}>
            <Link to='/seller/products'>All Products</Link>
          </Button>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                <div className='flex flex-col w-full gap-1'>
                  <TextField
                    control={form.control}
                    name='name'
                    type='text'
                    label='Product Name'
                    placeholder='Product Name'
                  />
                </div>

                <div className='flex flex-col w-full gap-1'>
                  <TextField
                    control={form.control}
                    name='brand'
                    type='text'
                    label='Product Brand'
                    placeholder='Brand Name'
                  />
                </div>
              </div>

              <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                <div className='flex flex-col w-full gap-1'>
                  <SelectField
                    control={form.control}
                    name='category'
                    label='Category'
                    options={categories}
                    isClearable={true}
                    isSearchable={true}
                    placeholder='Select product category'
                  />
                </div>

                <div className='flex flex-col w-full gap-1'>
                  <TextField
                    control={form.control}
                    name='stock'
                    type='number'
                    label='Product Stock'
                    placeholder='Stock'
                  />
                </div>
              </div>

              <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                <div className='flex flex-col w-full gap-1'>
                  <TextField
                    control={form.control}
                    name='price'
                    type='number'
                    label='Price'
                    placeholder='Price'
                  />
                </div>

                <div className='flex flex-col w-full gap-1'>
                  <TextField
                    control={form.control}
                    name='discount'
                    type='number'
                    label='Discount'
                    placeholder='Discount'
                  />
                </div>
              </div>

              <div className='flex flex-col w-full gap-1 mb-5 text-[#d0d2d6]'>
                <TextareaField
                  control={form.control}
                  name='description'
                  label='Description'
                  placeholder='Description'
                />
              </div>

              <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4'>
                {images.map((image, idx) => (
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
                      className='p-2 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full'
                    >
                      <CloseCircleIcon />
                    </span>
                  </div>
                ))}

                <label
                  className='flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-full text-[#d0d2d6]'
                  htmlFor='image'
                >
                  <ImagesIcon />
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

              <div className='flex my-2'>
                <SubmitButton isLoading={isLoading}>Create</SubmitButton>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SellerAddProduct;
