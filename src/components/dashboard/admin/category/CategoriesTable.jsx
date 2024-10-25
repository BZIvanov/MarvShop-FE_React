import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Pencil, Trash } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const CategoriesTable = ({ categories = [] }) => {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-2'>
      <Table className='w-full text-sm'>
        <TableHeader>
          <TableRow className='bg-gray-700'>
            <TableHead className='px-4 py-3 text-stone-200 uppercase'>
              Image
            </TableHead>
            <TableHead className='px-4 py-3 text-stone-200 uppercase'>
              Name
            </TableHead>
            <TableHead className='px-4 py-3 text-center text-stone-200 uppercase'>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className='bg-gray-800'>
          {categories.map((category) => (
            <TableRow
              key={category._id}
              className='border-b border-gray-700 hover:bg-gray-700 transition-all'
            >
              <TableCell className='px-4 py-2 text-stone-300'>
                <img
                  className='w-[45px] h-[45px]'
                  src={category.imageUrl}
                  alt='Category name'
                />
              </TableCell>
              <TableCell className='px-4 py-2 text-stone-300'>
                {category.name}
              </TableCell>
              <TableCell className='px-4 py-2 text-stone-300'>
                <div className='flex justify-center items-center gap-4'>
                  <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'>
                    <Pencil className='h-4 w-4' />
                  </Link>
                  <Link className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'>
                    <Trash className='h-4 w-4' />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

CategoriesTable.propTypes = {
  categories: PropTypes.array,
};

export default CategoriesTable;
