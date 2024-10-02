import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from '@/store/store';
import { selectUser } from '@/store/features/user/userSlice';
import { useGetProductsQuery } from '@/store/services/products';
import Pagination from '../common/Pagination';
import Search from '../common/Search';
import { EditIcon, EyeIcon, TrashIcon } from '@/components/common/icons/Icons';

const SellerProducts = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');

  const user = useSelector(selectUser);
  const sellerId = user?.id;

  const { data } = useGetProductsQuery(
    {
      page,
      perPage,
      searchText,
      sellerId,
    },
    { skip: !sellerId }
  );

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[#000000] font-semibold text-lg mb-3'>
        All Products
      </h1>

      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <Search
          setPerPage={setPerPage}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <div className='relative overflow-x-auto mt-5'>
          <table className='w-full text-sm text-left text-[#d0d2d6]'>
            <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
              <tr>
                <th scope='col' className='py-3 px-4'>
                  &#8470;
                </th>
                <th scope='col' className='py-3 px-4'>
                  Image
                </th>
                <th scope='col' className='py-3 px-4'>
                  Name
                </th>
                <th scope='col' className='py-3 px-4'>
                  Category
                </th>
                <th scope='col' className='py-3 px-4'>
                  Brand
                </th>
                <th scope='col' className='py-3 px-4'>
                  Price
                </th>
                <th scope='col' className='py-3 px-4'>
                  Discount
                </th>
                <th scope='col' className='py-3 px-4'>
                  Stock
                </th>
                <th scope='col' className='py-3 px-4'>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.products.map((product, index) => (
                <tr key={product._id}>
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
                      src={product.images[0].imageUrl}
                      alt='Product view'
                    />
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    {product.name}
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    {product.category.name}
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    {product.brand}
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    $ {product.price}
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    {product.discount === 0 ? (
                      <span>No discount</span>
                    ) : (
                      <span>{product.discount}%</span>
                    )}
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    {product.stock}
                  </td>

                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    <div className='flex justify-start items-center gap-4'>
                      <Link
                        to={`/seller/edit-product/${product.slug}`}
                        className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'
                      >
                        <EditIcon />
                      </Link>
                      <Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'>
                        <EyeIcon />
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
              totalItem={data?.totalCount ?? 0}
              perPage={perPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProducts;
