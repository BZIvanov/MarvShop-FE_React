import { useDispatch, useSelector } from '@/store/store';
import { useGetCategoriesQuery } from '@/store/services/categories';
import {
  changeFilter,
  selectCategoriesFilter,
} from '@/store/features/productsFilters/productsFiltersSlice';

const CategoryFilter = () => {
  const dispatch = useDispatch();

  const selectedCategories = useSelector(selectCategoriesFilter);

  const { data } = useGetCategoriesQuery();
  const categories = data?.categories || [];

  const handleCheckboxChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      const filteredCategories = selectedCategories.filter(
        (id) => id !== categoryId
      );
      dispatch(changeFilter({ categories: filteredCategories }));
    } else {
      dispatch(
        changeFilter({ categories: [...selectedCategories, categoryId] })
      );
    }
  };

  return (
    <div className='py-2 flex flex-col gap-5'>
      <h2 className='text-3xl font-bold mb-3 text-slate-600'>Categories</h2>
      <div className='flex flex-col'>
        {categories.map((category) => {
          return (
            <div
              key={category._id}
              className='flex justify-start items-center gap-2 py-1'
            >
              <input
                checked={selectedCategories.includes(category._id)}
                onChange={() => handleCheckboxChange(category._id)}
                type='checkbox'
                id={category._id}
              />
              <label
                htmlFor={category._id}
                className='text-slate-600 block cursor-pointer'
              >
                {category.name}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
