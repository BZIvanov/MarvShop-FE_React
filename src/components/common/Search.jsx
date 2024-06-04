import PropTypes from 'prop-types';

const Search = ({ setPerPage, searchValue, setSearchValue }) => {
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
        onChange={(e) => setSearchValue(e.target.value)}
        className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
        type='text'
        placeholder='search'
      />
    </div>
  );
};

Search.propTypes = {
  setPerPage: PropTypes.func,
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
};

export default Search;
