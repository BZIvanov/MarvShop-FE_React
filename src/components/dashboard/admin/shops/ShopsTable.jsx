import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

const ShopsTable = ({ shops = [] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className='bg-gray-700'>
          <TableHead className='py-3 text-stone-200 uppercase'>
            Activity status
          </TableHead>
          <TableHead className='py-3 text-stone-200 uppercase'>
            Payment status
          </TableHead>
          <TableHead className='py-3 text-stone-200 uppercase'>
            Owner name
          </TableHead>
          <TableHead className='py-3 text-stone-200 uppercase'>
            Owner email
          </TableHead>
          <TableHead className='py-3 text-stone-200 uppercase'>
            Shop name
          </TableHead>
          <TableHead className='py-3 text-stone-200 uppercase'>
            Country
          </TableHead>
          <TableHead className='py-3 text-stone-200 uppercase'>City</TableHead>
          <TableHead className='py-3 text-center text-stone-200 uppercase'>
            Action
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className='bg-gray-800'>
        {shops.length === 0 ? (
          <TableRow className='text-center text-white p-3'>
            <TableCell colSpan={8} className='px-4 py-3 text-stone-300'>
              No Data
            </TableCell>
          </TableRow>
        ) : (
          <>
            {shops.map((shop) => (
              <TableRow
                key={shop._id}
                className='border-b border-gray-700 hover:bg-gray-700'
              >
                <TableCell className='text-stone-300'>
                  {shop.activitystatus}
                </TableCell>
                <TableCell className='text-stone-300'>
                  {shop.paymentStatus}
                </TableCell>
                <TableCell className='text-stone-300'>
                  {shop.user.username}
                </TableCell>
                <TableCell className='text-stone-300'>
                  {shop.user.email}
                </TableCell>
                <TableCell className='text-stone-300'>
                  {shop.shopInfo?.name}
                </TableCell>
                <TableCell className='text-stone-300'>
                  {shop.shopInfo?.country}
                </TableCell>
                <TableCell className='text-stone-300'>
                  {shop.shopInfo?.city}
                </TableCell>
                <TableCell className='text-center text-stone-300'>
                  <div className='flex justify-start items-center gap-4'>
                    <Link
                      to={`/admin/shops/${shop._id}`}
                      className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'
                    >
                      <Eye className='h-4 w-4' />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
};

ShopsTable.propTypes = {
  shops: PropTypes.array,
};

export default ShopsTable;
