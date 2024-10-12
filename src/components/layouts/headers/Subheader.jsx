import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from '@/store/store';
import { useGetCategoriesQuery } from '@/store/services/categories';
import {
  changeFilter,
  selectTextFilter,
} from '@/store/features/productsFilters/productsFiltersSlice';
import {
  PhoneIcon,
  ArrowDownIcon,
  ListIcon,
} from '@/components/common/icons/Icons';

const Subheader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);

  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.categories || [];

  const selectedText = useSelector(selectTextFilter);

  return (
    <div className='w-[90%] lg:w-[85%] mx-auto mb-8 pt-20'>
      <div className='flex w-full flex-wrap gap-8 lg:gap-0'>
        <div className='w-full lg:w-3/12'>
          <div className='bg-white relative'>
            <div
              onClick={() => setIsCategoryExpanded((prevState) => !prevState)}
              className='h-[50px] bg-[#059473] text-white flex justify-between lg:justify-center px-6 lg:px-0 items-center gap-3 font-bold text-md cursor-pointer'
            >
              <div className='flex justify-center items-center gap-3'>
                <ListIcon />
                <span>All Categories</span>
              </div>
              <span className='pt-1'>
                <ArrowDownIcon />
              </span>
            </div>
            <div
              className={`${
                isCategoryExpanded ? 'h-[400px]' : 'h-0'
              } overflow-hidden transition-all relative duration-500 lg:absolute z-[99999] bg-[#dbf3ed] w-full border-x`}
            >
              <ul className='py-2 text-slate-600 font-medium'>
                {categories.map((category) => {
                  return (
                    <li
                      key={category._id}
                      onClick={() => {
                        dispatch(changeFilter({ categories: [category._id] }));
                        setIsCategoryExpanded(false);
                        navigate('/shop');
                      }}
                      className='flex justify-start items-center gap-2 px-[24px] py-[6px] cursor-pointer'
                    >
                      <img
                        src={category.imageUrl}
                        className='w-[30px] h-[30px] rounded-full overflow-hidden'
                        alt='Category preview'
                      />
                      <span className='text-sm block'>{category.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className='w-full lg:w-9/12 pl-0 lg:pl-8'>
          <div className='flex flex-wrap w-full justify-between items-center gap-6 lg:gap-0'>
            <div className='w-full lg:w-9/12'>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  navigate('/shop');
                }}
                className='flex border h-[50px] items-center relative gap-6'
              >
                <div className='relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px]'>
                  <select
                    // TODO: this should be multivalue select with provided values, because we can select more than one categories
                    onChange={(event) => {
                      const selectedCategory = event.target.value
                        ? [event.target.value]
                        : [];
                      dispatch(changeFilter({ categories: selectedCategory }));
                      navigate('/shop');
                    }}
                    className='w-[154px] text-slate-600 font-semibold bg-transparent px-2 h-full outline-0 border-none'
                  >
                    <option value=''>Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  name='text'
                  value={selectedText}
                  onChange={(event) => {
                    dispatch(changeFilter({ text: event.target.value }));
                  }}
                  type='text'
                  className='w-full relative bg-transparent text-slate-500 outline-0 px-3 h-full'
                  placeholder='Search'
                />
                <button className='bg-[#059473] right-0 absolute px-6 h-full font-semibold uppercase text-white'>
                  Search
                </button>
              </form>
            </div>

            <div className='hidden lg:block w-full lg:w-3/12 pl-0 lg:pl-2'>
              <div className='w-full flex justify-start lg:justify-end gap-3 items-center'>
                <div className='w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center'>
                  <PhoneIcon />
                </div>
                <div className='flex justify-end flex-col gap-1'>
                  <h2 className='text-md font-medium text-slate-700'>
                    0888123456
                  </h2>
                  <span className='text-sm'>Support 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subheader;
