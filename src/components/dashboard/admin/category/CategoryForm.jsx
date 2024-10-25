import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image } from 'lucide-react';

import { useCreateCategoryMutation } from '@/store/services/categories';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/common/buttons/SubmitButton';
import { resolver } from './category-form-schema';

const CategoryForm = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const form = useForm({
    resolver,
    defaultValues: {
      categoryName: '',
      categoryImage: [],
    },
  });

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append('categoryName', values.categoryName);
    formData.append('categoryImage', values.categoryImage[0]);

    const result = await createCategory(formData);

    if (!('error' in result)) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='categoryName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Category Name'
                  className='!placeholder-gray-300'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='categoryImage'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className='my-2 flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-red-500 w-full border-[#d0d2d6]'>
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
                </FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => {
                      const file = e.target.files[0];
                      field.onChange(file ? [file] : []);
                      setImagePreview(file ? URL.createObjectURL(file) : null);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <SubmitButton isLoading={isLoading} className='w-full my-2'>
          Create
        </SubmitButton>
      </form>
    </Form>
  );
};

export default CategoryForm;
