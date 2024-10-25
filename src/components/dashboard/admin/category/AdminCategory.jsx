import { useState } from 'react';
import { CircleX } from 'lucide-react';

import { useGetCategoriesQuery } from '@/store/services/categories';
import Pagination from '@/components/common/Pagination';
import Search from '@/components/common/Search';
import CategoriesTable from './CategoriesTable';
import CategoryForm from './CategoryForm';

const AdminCategory = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');

  const [showSmallScreenCategoryForm, setShowSmallScreenCategoryForm] =
    useState(false);

  const { data } = useGetCategoriesQuery({
    page,
    perPage,
    searchText,
  });

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

            <CategoriesTable categories={data?.categories} />

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
              <div className='flex justify-between items-center mt-2 mb-4'>
                <h1 className='text-[#d0d2d6] font-semibold text-xl w-full text-center'>
                  New Category
                </h1>
                <div
                  onClick={() => setShowSmallScreenCategoryForm(false)}
                  className='block lg:hidden cursor-pointer'
                >
                  <CircleX className='w-5 h-5' />
                </div>
              </div>

              <CategoryForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;
