import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
} from '@/store/services/categories';
import Pagination from '@/components/common/Pagination';
import Search from '@/components/common/Search';
import SubmitButton from '@/components/common/buttons/SubmitButton';
import {
  CloseCircleIcon,
  EditIcon,
  ImageIcon,
  TrashIcon,
} from '@/components/common/icons/Icons';

const AdminCategory = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');

  const [showSmallScreenCategoryForm, setShowSmallScreenCategoryForm] =
    useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formValues, setFormValues] = useState({
    categoryName: '',
    categoryImage: '',
  });

  const { data } = useGetCategoriesQuery({
    page,
    perPage,
    searchText,
  });

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

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

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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
    <div className='px-2 lg:px-7 pt-5'>
      <div className='flex lg:hidden justify-between items-center mb-5 p-4 bg-[#6a5fdf] rounded-md'>
        <h1 className='text-[#d0d2d6] font-semibold text-lg'>Category</h1>
        <button
          onClick={() => setShowSmallScreenCategoryForm(true)}
          className='bg-red-500 shadow-lg hover:shadow-red-500/40 px-4 py-2 cursor-pointer text-white rounded-sm text-sm'
        >
          Create
        </button>
      </div>

      <div className='flex flex-wrap w-full'>
        <div className='w-full lg:w-7/12'>
          <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
            <Search
              perPage={perPage}
              setPerPage={setPerPage}
              searchText={searchText}
              setSearchText={setSearchText}
            />

            <div className='relative overflow-x-auto'>
              <table className='w-full text-sm text-left text-[#d0d2d6]'>
                <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                  <tr>
                    <th scope='col' className='py-3 px-4'>
                      No
                    </th>
                    <th scope='col' className='py-3 px-4'>
                      Image
                    </th>
                    <th scope='col' className='py-3 px-4'>
                      Name
                    </th>
                    <th scope='col' className='py-3 px-4'>
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data?.categories.map((category, index) => (
                    <tr key={category._id}>
                      <td
                        scope='row'
                        className='py-1 px-4 font-medium whitespace-nowrap'
                      >
                        {index + 1 + (page - 1) * perPage}
                      </td>
                      <td
                        scope='row'
                        className='py-1 px-4 font-medium whitespace-nowrap'
                      >
                        <img
                          className='w-[45px] h-[45px]'
                          src={category.imageUrl}
                          alt='Category name'
                        />
                      </td>
                      <td
                        scope='row'
                        className='py-1 px-4 font-medium whitespace-nowrap'
                      >
                        {category.name}
                      </td>

                      <td
                        scope='row'
                        className='py-1 px-4 font-medium whitespace-nowrap'
                      >
                        <div className='flex justify-start items-center gap-4'>
                          <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'>
                            <EditIcon />
                          </Link>
                          <Link className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'>
                            <TrashIcon />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {data?.totalCount > perPage && (
              <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                <Pagination
                  pageNumber={page}
                  setPageNumber={setPage}
                  totalItem={data.totalCount}
                  perPage={perPage}
                />
              </div>
            )}
          </div>
        </div>

        <div
          className={`fixed w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 ${
            showSmallScreenCategoryForm
              ? `right-0 z-[1999]`
              : '-right-[340px] z-0'
          } top-0 transition-all duration-500`}
        >
          <div className='w-full pl-5'>
            <div
              className={`bg-[#6a5fdf] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6] ${
                showSmallScreenCategoryForm ? 'pt-[50px]' : ''
              }`}
            >
              <div className='flex justify-between items-center my-2'>
                <h1 className='text-[#d0d2d6] font-semibold text-xl mb-4 w-full text-center '>
                  New Category
                </h1>
                <div
                  onClick={() => setShowSmallScreenCategoryForm(false)}
                  className='block lg:hidden cursor-pointer'
                >
                  <CloseCircleIcon />
                </div>
              </div>
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
                        <ImageIcon />
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

                  <div className='my-2'>
                    <SubmitButton isLoading={isLoading} className='w-full'>
                      Create
                    </SubmitButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;
