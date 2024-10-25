import { useEffect, useState } from 'react';
import { Image } from 'lucide-react';

import { useCreateCategoryMutation } from '@/store/services/categories';
import SubmitButton from '@/components/common/buttons/SubmitButton';

const CategoryForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formValues, setFormValues] = useState({
    categoryName: '',
    categoryImage: '',
  });

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleCategoryNameChange = (event) => {
    setFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCategoryImageChange = (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      setImagePreview(URL.createObjectURL(files[0]));
      setFormValues((prevValues) => ({
        ...prevValues,
        categoryImage: files[0],
      }));
    }
  };

  const handleCategorySubmit = async (event) => {
    event.preventDefault();

    // we could directly upload the image to cloudinary and only send the image url to the backend, but this is how we did it in this demo
    const formData = new FormData();
    formData.append('categoryName', formValues.categoryName);
    formData.append('categoryImage', formValues.categoryImage);

    const result = await createCategory(formData);

    if (!('error' in result)) {
      setFormValues({
        categoryName: '',
        categoryImage: '',
      });
      setImagePreview(null);
    }
  };

  return (
    <form onSubmit={handleCategorySubmit}>
      <div className='flex flex-col w-full gap-1 mb-3'>
        <label htmlFor='category-name'>Category Name</label>
        <input
          name='categoryName'
          value={formValues.categoryName}
          onChange={handleCategoryNameChange}
          type='text'
          id='category-name'
          className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]'
          placeholder='Category Name'
        />
      </div>
      <div>
        <label
          className='flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-red-500 w-full border-[#d0d2d6]'
          htmlFor='category-image'
        >
          {imagePreview ? (
            <img
              className='w-full h-full'
              src={imagePreview}
              alt='Selected category preview'
            />
          ) : (
            <>
              <Image />
              <span>Select Image</span>
            </>
          )}
        </label>
        <input
          name='categoryImage'
          onChange={handleCategoryImageChange}
          type='file'
          id='category-image'
          className='hidden'
        />

        <SubmitButton isLoading={isLoading} className='w-full my-2'>
          Create
        </SubmitButton>
      </div>
    </form>
  );
};

export default CategoryForm;
