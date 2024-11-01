import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from '@/store/store';
import { selectUser } from '@/store/features/user/userSlice';
import { useGetProductsQuery } from '@/store/services/products';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Pagination from '@/components/common/Pagination';
import Search from '@/components/common/Search';
import { EditIcon, EyeIcon, TrashIcon } from '@/components/common/icons/Icons';
import { currencyFormatter, percentFormatter } from '@/utils/formatting';

const SellerProducts = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');

  const user = useSelector(selectUser);
  const sellerId = user?._id;

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
          perPage={perPage}
          setPerPage={setPerPage}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-2'>
          <Table className='min-w-full text-left text-sm'>
            <TableHeader>
              <TableRow className='bg-gray-700'>
                <TableHead className='px-4 py-3 text-stone-200 uppercase'>
                  Image
                </TableHead>
                <TableHead className='px-4 py-3 text-stone-200 uppercase'>
                  Name
                </TableHead>
                <TableHead className='px-4 py-3 text-stone-200 uppercase'>
                  Category
                </TableHead>
                <TableHead className='px-4 py-3 text-stone-200 uppercase'>
                  Brand
                </TableHead>
                <TableHead className='px-4 py-3 text-stone-200 uppercase'>
                  Price
                </TableHead>
                <TableHead className='px-4 py-3 text-stone-200 uppercase'>
                  Discount
                </TableHead>
                <TableHead className='px-4 py-3 text-stone-200 uppercase'>
                  Stock
                </TableHead>
                <TableHead className='px-4 py-3 text-right text-stone-200 uppercase'>
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className='bg-gray-800'>
              {data?.products.map((product) => (
                <TableRow
                  key={product._id}
                  className='border-b border-gray-700 hover:bg-gray-700 transition-all'
                >
                  <TableCell className='px-4 py-2 text-stone-300'>
                    <img
                      className='w-[45px] h-[45px]'
                      src={product.images[0].imageUrl}
                      alt='Product view'
                    />
                  </TableCell>
                  <TableCell className='px-4 py-2 text-stone-300'>
                    {product.name}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-stone-300'>
                    {product.category.name}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-stone-300'>
                    {product.brand}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-stone-300'>
                    {currencyFormatter(product.price)}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-stone-300'>
                    {product.discount === 0 ? (
                      <span>No discount</span>
                    ) : (
                      <span>{percentFormatter(product.discount)}</span>
                    )}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-stone-300'>
                    {product.stock}
                  </TableCell>
                  <TableCell className='px-4 py-0 text-stone-300'>
                    <div className='flex justify-center items-center gap-4'>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
  );
};

export default SellerProducts;
