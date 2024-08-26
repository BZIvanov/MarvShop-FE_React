import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdImages } from 'react-icons/io';
import { IoMdCloseCircle } from 'react-icons/io';

const SellerEditProduct = () => {
  const categories = [
    {
      id: 1,
      name: 'Sports',
    },
    {
      id: 2,
      name: 'Tshirt',
    },
    {
      id: 3,
      name: 'Mobile',
    },
    {
      id: 4,
      name: 'Computer',
    },
    {
      id: 5,
      name: 'Watch',
    },
    {
      id: 6,
      name: 'Pant',
    },
  ];

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    discount: '',
    price: '',
    brand: '',
    stock: '',
  });

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState('');
  const [allCategory, setAllCategory] = useState(categories);
  const [searchValue, setSearchValue] = useState('');

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  const handleInputChange = (event) => {
    setFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value) {
      const filteredCategories = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(filteredCategories);
    } else {
      setAllCategory(categories);
    }
  };

  const changeImage = (img, files) => {
    if (files.length > 0) {
      console.log(img);
      console.log(files[0]);
    }
  };

  useEffect(() => {
    setFormValues({
      name: 'Mens tshirt',
      description: 'Utilities for controlling how',
      discount: 5,
      price: 255,
      brand: 'Marv',
      stock: 10,
    });
    setCategory('Tshirt');
    setImageShow(['/images/logo.png', '/images/logo.png', '/images/logo.png']);
  }, []);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='flex justify-between items-center pb-4'>
          <h1 className='text-[#d0d2d6] text-xl font-semibold'>Edit Product</h1>
          <Link
            to='/seller/products'
            className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2'
          >
            All Product
          </Link>
        </div>
        <div>
          <form>
            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='name'>Product Name</label>
                <input
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  onChange={handleInputChange}
                  value={formValues.name}
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Product Name'
                />
              </div>

              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='brand'>Product Brand</label>
                <input
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  onChange={handleInputChange}
                  value={formValues.brand}
                  type='text'
                  name='brand'
                  id='brand'
                  placeholder='Brand Name'
                />
              </div>
            </div>

            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
              <div className='flex flex-col w-full gap-1 relative'>
                <label htmlFor='category'>Category</label>
                <input
                  readOnly
                  onClick={() => setCateShow((prevState) => !prevState)}
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  onChange={handleInputChange}
                  value={category}
                  type='text'
                  id='category'
                  placeholder='--select category--'
                />

                <div
                  className={`absolute top-[101%] bg-[#475569] w-full transition-all ${
                    cateShow ? 'scale-100' : 'scale-0'
                  } `}
                >
                  <div className='w-full px-4 py-2 fixed'>
                    <input
                      value={searchValue}
                      onChange={categorySearch}
                      className='px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden'
                      type='text'
                      placeholder='search'
                    />
                  </div>
                  <div className='pt-14'></div>
                  <div className='flex justify-start items-start flex-col h-[200px] overflow-x-scrool'>
                    {allCategory.map((c, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          category === c.name && 'bg-indigo-500'
                        }`}
                        onClick={() => {
                          setCateShow(false);
                          setCategory(c.name);
                          setSearchValue('');
                          setAllCategory(categories);
                        }}
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='stock'>Product Stock</label>
                <input
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  onChange={handleInputChange}
                  value={formValues.stock}
                  type='text'
                  name='stock'
                  id='stock'
                  placeholder='Stock'
                />
              </div>
            </div>

            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='price'>Price</label>
                <input
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  onChange={handleInputChange}
                  value={formValues.price}
                  type='number'
                  name='price'
                  id='price'
                  placeholder='Price'
                />
              </div>

              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='discount'>Discount</label>
                <input
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  onChange={handleInputChange}
                  value={formValues.discount}
                  type='number'
                  name='discount'
                  id='discount'
                  placeholder='Discount by %'
                />
              </div>
            </div>

            <div className='flex flex-col w-full gap-1 mb-5'>
              <label htmlFor='description' className='text-[#d0d2d6]'>
                Description
              </label>
              <textarea
                className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                onChange={handleInputChange}
                value={formValues.description}
                name='description'
                id='description'
                placeholder='Description'
                cols='10'
                rows='4'
              ></textarea>
            </div>

            <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4'>
              {imageShow.map((img, i) => (
                <div key={i}>
                  <label htmlFor={i}>
                    <img src={img} alt='' />
                  </label>
                  <input
                    onChange={(e) => changeImage(img, e.target.files)}
                    type='file'
                    id={i}
                    className='hidden'
                  />
                </div>
              ))}
            </div>

            <div className='flex'>
              <button className='bg-red-500  hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2'>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerEditProduct;