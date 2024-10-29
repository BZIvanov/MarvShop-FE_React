import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Image } from 'lucide-react';

import { useDispatch } from '@/store/store';
import {
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '@/store/services/categories';
import { showNotification } from '@/store/features/notification/notificationSlice';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [imagePreview, setImagePreview] = useState(null);

  const { data: categoryData, refetch } = useGetCategoryQuery(categoryId, {
    skip: !categoryId,
  });

  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const form = useForm({
    resolver,
    defaultValues: {
      categoryName: '',
      categoryImage: '',
    },
  });

  useEffect(() => {
    if (categoryId) {
      refetch();
    }
  }, [categoryId, refetch]);

  useEffect(() => {
    if (categoryData?.category) {
      form.reset({
        categoryName: categoryData.category.name,
        categoryImage: categoryData.category.image.imageUrl,
      });

      setImagePreview(categoryData.category.image.imageUrl);
    }
  }, [categoryData, form]);

  useEffect(() => {
    return () => {
      if (imagePreview && typeof imagePreview !== 'string') {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append('categoryName', values.categoryName);
    if (values.categoryImage instanceof File) {
      formData.append('categoryImage', values.categoryImage);
    }

    let result;
    if (categoryId) {
      result = updateCategory({ id: categoryId, formData });
    } else {
      result = await createCategory(formData);
    }

    if (!('error' in result)) {
      if (imagePreview && typeof imagePreview !== 'string') {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(null);
      form.reset({
        categoryName: '',
        categoryImage: '',
      });

      dispatch(
        showNotification({
          type: 'success',
          message: `Category ${
            categoryId ? 'updated' : 'created'
          } successfully`,
        })
      );

      navigate('/admin/category');
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
          render={({ field }) => (
            <FormItem>
              <FormLabel className='my-2 flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-red-500 w-full border-[#d0d2d6]'>
                {imagePreview ? (
                  <img
                    className='w-full h-full object-cover'
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
                    field.onChange(file || '');
                    setImagePreview(
                      file
                        ? URL.createObjectURL(file)
                        : categoryData?.image || null
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton isLoading={isLoading} className='w-full my-2'>
          {categoryId ? 'Update' : 'Create'}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default CategoryForm;
