import { useEffect, useState } from 'react';
import { Range } from 'react-range';

import { useDispatch } from '@/store/store';
import { changeFilter } from '@/store/features/productsFilters/productsFiltersSlice';
import { useGetProductsPriceRangeQuery } from '@/store/services/products';
import { currencyFormatter } from '@/utils/formatting';

const STEP = 10;

const PriceFilter = () => {
  const dispatch = useDispatch();

  const { data, isSuccess } = useGetProductsPriceRangeQuery();

  const [rangeValues, setRangeValues] = useState([0, STEP]);
  const [localPrice, setLocalPrice] = useState([0, STEP]);

  useEffect(() => {
    // once the min and max price was returned from the backend, use it as initial values overriding the initial values from the reducer
    if (isSuccess) {
      const lowestPrice = data.lowestPrice;
      const highestPricePrice = data.highestPrice;

      const roundedTo10Min = Math.floor(lowestPrice / STEP) * STEP;
      const roundedTo10Max = Math.ceil(highestPricePrice / STEP) * STEP;
      const minMaxValues = [roundedTo10Min, roundedTo10Max];

      setRangeValues(minMaxValues);
      setLocalPrice(minMaxValues);
      dispatch(changeFilter({ price: minMaxValues }));
    }
  }, [dispatch, isSuccess, data]);

  return (
    <div className='py-2 flex flex-col gap-5'>
      <h2 className='text-3xl font-bold mb-3 text-slate-600'>Price</h2>

      <div className='pl-2'>
        <Range
          step={STEP}
          min={rangeValues[0]}
          max={rangeValues[1]}
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
          {currencyFormatter(localPrice[0], { fractionDigits: 0 })} -{' '}
          {currencyFormatter(localPrice[1], { fractionDigits: 0 })}
        </span>
      </div>
    </div>
  );
};

export default PriceFilter;
