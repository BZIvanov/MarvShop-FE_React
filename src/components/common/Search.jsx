import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import debounce from 'lodash/debounce';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const Search = ({ perPage, setPerPage, searchText, setSearchText }) => {
  const [searchValue, setSearchValue] = useState(searchText);

  const debouncedSearchRef = useRef(
    debounce((debouncedText) => {
      setSearchText(debouncedText);
    }, 1000)
  );

  const handleChange = (e) => {
    const value = e.target.value;

    setSearchValue(value);
    debouncedSearchRef.current(value);
  };

  useEffect(() => {
    const debouncedSearchRefValue = debouncedSearchRef.current;
    return () => {
      debouncedSearchRefValue.cancel();
    };
  }, []);

  return (
    <div className='flex justify-between items-center gap-2'>
      <Select
        value={perPage}
        onValueChange={(newValue) => {
          setPerPage(parseInt(newValue));
        }}
      >
        <SelectTrigger className='w-[140px]'>
          <SelectValue placeholder='Results per page' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Results per page</SelectLabel>
            <SelectItem value={5}>5</SelectItem>
            <SelectItem value={10}>10</SelectItem>
            <SelectItem value={20}>20</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Input
        value={searchValue}
        onChange={handleChange}
        className='w-[200px] !placeholder-gray-300'
        type='text'
        placeholder='Search'
      />
    </div>
  );
};

Search.propTypes = {
  perPage: PropTypes.number,
  setPerPage: PropTypes.func,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
};

export default Search;
