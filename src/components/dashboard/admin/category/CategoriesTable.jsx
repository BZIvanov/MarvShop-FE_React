import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash } from 'lucide-react';

import { useDeleteCategoryMutation } from '@/store/services/categories';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

const CategoriesTable = ({ categories = [] }) => {
  const navigate = useNavigate();

  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDeleteCategory = (categoryId) => {
    deleteCategory(categoryId);
  };

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
              <TableCell className='px-4 py-0 text-stone-300'>
                <img
                  className='w-[45px] h-[45px]'
                  src={category.image.imageUrl}
                  alt='Category name'
                />
              </TableCell>
              <TableCell className='px-4 py-0 text-stone-300'>
                {category.name}
              </TableCell>
              <TableCell className='px-4 py-0 text-stone-300'>
                <div className='flex justify-center items-center gap-4'>
                  <Button
                    onClick={() => navigate(`/admin/category/${category._id}`)}
                    variant='ghost'
                    size='icon'
                    className='bg-yellow-500'
                  >
                    <Pencil />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild={true}>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='bg-red-500'
                      >
                        <Trash />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this category?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the category.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteCategory(category._id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
