import { useState } from 'react';
import { Range } from 'react-range';

import { useDispatch, useSelector } from '../../store/store';
import {
  changeFilter,
  selectPriceFilter,
} from '../../store/features/productsFilters/productsFiltersSlice';

const PriceFilter = () => {
  const dispatch = useDispatch();

  const price = useSelector(selectPriceFilter);

  const [localPrice, setLocalPrice] = useState(price);

  return (
    <div className='py-2 flex flex-col gap-5'>
      <h2 className='text-3xl font-bold mb-3 text-slate-600'>Price</h2>

      <div className='pl-2'>
        <Range
          step={5}
          min={0}
          max={5000}
          values={localPrice}
          onChange={(values) => setLocalPrice(values)}
          onFinalChange={(values) => dispatch(changeFilter({ price: values }))}
          renderTrack={({ props, children }) => {
            return (
              <div
                {...props}
                className='w-full h-[6px] bg-slate-200 rounded-full cursor-pointer'
              >
                {children}
              </div>
            );
          }}
          renderThumb={({ props }) => {
            return (
              <div
                {...props}
                // eslint-disable-next-line react/prop-types
                key={props.key}
                className='w-[15px] h-[15px] bg-[#059473] rounded-full'
              />
            );
          }}
        />
      </div>
      <div>
        <span className='text-slate-800 font-bold text-lg'>
          ${Math.floor(localPrice[0])} - ${Math.floor(localPrice[1])}
        </span>
      </div>
    </div>
  );
};

export default PriceFilter;
