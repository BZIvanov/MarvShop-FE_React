import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import debounce from 'lodash/debounce';

const Search = ({ setPerPage, searchText, setSearchText }) => {
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
    <div className='flex justify-between items-center'>
      <select
        onChange={(e) => setPerPage(parseInt(e.target.value))}
        className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
      >
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='20'>20</option>
      </select>
      <input
        value={searchValue}
        onChange={handleChange}
        className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
        type='text'
        placeholder='search'
      />
    </div>
  );
};

Search.propTypes = {
  setPerPage: PropTypes.func,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
};

export default Search;
