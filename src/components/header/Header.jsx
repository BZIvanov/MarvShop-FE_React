import { useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from '@/store/store';
import { selectUser } from '@/store/features/user/userSlice';
import { useGetCategoriesQuery } from '@/store/services/categories';
import {
  changeFilter,
  selectTextFilter,
} from '@/store/features/productsFilters/productsFiltersSlice';
import { selectCart } from '@/store/features/cart/cartSlice';
import { useGetWishlistProductsQuery } from '@/store/services/wishlist';
import {
  TwitterIcon,
  GithubIcon,
  FacebookIcon,
  LinkedInIcon,
  PhoneIcon,
  EmailIcon,
  CartShoppingIcon,
  HeartIcon,
  ArrowDownIcon,
  ArrowDropdownIcon,
  ListIcon,
  LockIcon,
  UserIcon,
} from '@/components/common/icons/Icons';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);

  const user = useSelector(selectUser);

  const cart = useSelector(selectCart);
  const cartItemsCount = useMemo(() => Object.keys(cart).length, [cart]);

  const selectedText = useSelector(selectTextFilter);

  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.categories || [];

  const { data: wishlistData } = useGetWishlistProductsQuery(undefined, {
    skip: !user,
  });
  const wishlistProducts = wishlistData?.products || [];

  return (
    <div className='w-full bg-white'>
      <div className='bg-[#caddff] shadow-lg'>
        <div className='w-[90%] lg:w-[85%] mx-auto'>
          <div className='flex w-full justify-between items-center h-[50px]'>
            <div className='flex justify-start items-center gap-8 font-semibold'>
              <Link to='/'>
                <img src='/images/logo.png' alt='Shop logo' />
              </Link>
            </div>
            <div className='flex justify-center items-center gap-10'>
              <div className='flex group cursor-pointer text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]'>
                <img
                  className='w-[30px] h-[14px]'
                  src='/images/flag.png'
                  alt='Language selection'
                />
                <ArrowDropdownIcon />
                <ul className='absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10'>
                  <li>English</li>
                  <li>Bulgarian</li>
                </ul>
              </div>
              {user ? (
                <Link
                  to={`/${user.role}`}
                  className='flex cursor-pointer justify-center items-center gap-2 text-sm'
                >
                  <UserIcon />
                  <span>{user.username}</span>
                </Link>
              ) : (
                <Link
                  to='/auth/login'
                  className='flex cursor-pointer justify-center items-center gap-2 text-sm'
                >
                  <LockIcon />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='w-white'>
        <div className='w-[90%] lg:w-[85%] mx-auto'>
          <div className='h-[100px] lg:h-[80px] flex justify-between items-center flex-wrap'>
            <div className='w-full lg:w-3/12 pt-4 lg:pt-0'>
              <div className='flex justify-between items-center'>
                <Link to='/'>
                  <img src='/images/logo.png' alt='Shop logo' />
                </Link>
                <div
                  className='flex justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden'
                  onClick={() => setShowSidebar(true)}
                >
                  <ListIcon />
                </div>
              </div>
            </div>

            <div className='lg:w-9/12'>
              <div className='flex justify-center lg:justify-between items-center flex-wrap pl-8'>
                <ul className='hidden lg:flex justify-start items-start gap-8 text-sm font-bold uppercase'>
                  {[
                    { label: 'Home', link: '/' },
                    { label: 'Shop', link: '/shop' },
                    { label: 'Blog', link: '/blog' },
                    { label: 'About Us', link: '/about' },
                    { label: 'Contact Us', link: '/contact' },
                  ].map((navigationItem) => {
                    return (
                      <li key={navigationItem.link}>
                        <NavLink
                          to={navigationItem.link}
                          className={({ isActive }) =>
                            `p-2 block ${
                              isActive ? 'text-[#059473]' : 'text-slate-600'
                            }`
                          }
                        >
                          {navigationItem.label}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>

                <div className='hidden lg:flex justify-center items-center gap-5'>
                  <div className='flex justify-center gap-5'>
                    <div
                      onClick={() => {
                        if (user) {
                          navigate('/buyer/wishlist');
                        } else {
                          navigate('/auth/login', {
                            state: { customNavigateTo: '/buyer/wishlist' },
                          });
                        }
                      }}
                      className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'
                    >
                      <span className='text-xl text-green-500'>
                        <HeartIcon />
                      </span>
                      {wishlistProducts.length > 0 && (
                        <div className='w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                          {wishlistProducts.length}
                        </div>
                      )}
                    </div>

                    <div
                      onClick={() => {
                        if (user) {
                          navigate('/cart');
                        } else {
                          navigate('/auth/login', {
                            state: { customNavigateTo: '/cart' },
                          });
                        }
                      }}
                      className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'
                    >
                      <span className='text-xl text-green-500'>
                        <CartShoppingIcon />
                      </span>
                      {cartItemsCount > 0 && (
                        <div className='w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                          {cartItemsCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='lg:hidden'>
        <div
          onClick={() => setShowSidebar(false)}
          className={`fixed duration-200 transition-all ${
            showSidebar ? 'visible' : 'invisible'
          } lg:hidden w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}
        />
        <div
          className={`w-[300px] z-[9999] transition-all duration-200 fixed ${
            showSidebar ? 'left-0 top-0' : '-left-[300px]'
          } overflow-y-auto bg-white h-screen py-6 px-8 `}
        >
          <div className='flex justify-start flex-col gap-6'>
            <Link to='/'>
              <img src='/images/logo.png' alt='Shop logo' />
            </Link>
            <div className='flex justify-start items-center gap-10'>
              <div className='flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute '>
                <img
                  className='w-[30px] h-[14px]'
                  src='/images/flag.png'
                  alt='Language selection'
                />
                <ArrowDropdownIcon />
                <ul className='absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10'>
                  <li>English</li>
                  <li>Bulgarian</li>
                </ul>
              </div>
              {user ? (
                <Link
                  className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black'
                  to={`/${user.role}/dashboard`}
                >
                  <UserIcon />
                  <span>{user.username}</span>
                </Link>
              ) : (
                <Link
                  className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black'
                  to='/auth/login'
                >
                  <LockIcon />
                  <span>Login</span>
                </Link>
              )}
            </div>
            <ul className='flex flex-col justify-start items-start text-sm font-bold uppercase'>
              <li>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    `py-2 block ${
                      isActive ? 'text-[#059473]' : 'text-slate-600'
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/shop'
                  className={({ isActive }) =>
                    `py-2 block ${
                      isActive ? 'text-[#059473]' : 'text-slate-600'
                    }`
                  }
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/blog'
                  className={({ isActive }) =>
                    `py-2 block ${
                      isActive ? 'text-[#059473]' : 'text-slate-600'
                    }`
                  }
                >
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/about'
                  className={({ isActive }) =>
                    `py-2 block ${
                      isActive ? 'text-[#059473]' : 'text-slate-600'
                    }`
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/contact'
                  className={({ isActive }) =>
                    `py-2 block ${
                      isActive ? 'text-[#059473]' : 'text-slate-600'
                    }`
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>

            <div className='flex justify-start items-center gap-4 text-black'>
              <Link to='/'>
                <FacebookIcon />
              </Link>
              <Link to='/'>
                <TwitterIcon />
              </Link>
              <Link to='/'>
                <LinkedInIcon />
              </Link>
              <Link to='/'>
                <GithubIcon />
              </Link>
            </div>

            <div className='w-full flex justify-start lg:justify-end gap-3 items-center'>
              <div className='w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center'>
                <PhoneIcon />
              </div>
              <div className='flex justify-end flex-col gap-1'>
                <h2 className='text-sm font-medium text-slate-700'>
                  083123213
                </h2>
                <span className='text-xs'>Support 24/7</span>
              </div>
            </div>

            <ul className='flex flex-col justify-start items-start gap-3 text-[#1c1c1c]'>
              <li className='flex justify-start items-center gap-2 text-sm'>
                <EmailIcon />
                <span>support@mail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='w-[90%] lg:w-[85%] mx-auto'>
        <div className='flex w-full flex-wrap gap-8 lg:gap-0'>
          <div className='w-full lg:w-3/12'>
            <div className='bg-white relative'>
              <div
                onClick={() => setIsCategoryExpanded((prevState) => !prevState)}
                className='h-[50px] bg-[#059473] text-white flex justify-between lg:justify-center px-6 lg:px-0 items-center gap-3 font-bold text-md cursor-pointer'
              >
                <div className='flex justify-center items-center gap-3'>
                  <ListIcon />
                  <span>All Categories</span>
                </div>
                <span className='pt-1'>
                  <ArrowDownIcon />
                </span>
              </div>
              <div
                className={`${
                  isCategoryExpanded ? 'h-[400px]' : 'h-0'
                } overflow-hidden transition-all relative duration-500 lg:absolute z-[99999] bg-[#dbf3ed] w-full border-x`}
              >
                <ul className='py-2 text-slate-600 font-medium'>
                  {categories.map((category) => {
                    return (
                      <li
                        key={category._id}
                        onClick={() => {
                          dispatch(
                            changeFilter({ categories: [category._id] })
                          );
                          setIsCategoryExpanded(false);
                          navigate('/shop');
                        }}
                        className='flex justify-start items-center gap-2 px-[24px] py-[6px] cursor-pointer'
                      >
                        <img
                          src={category.imageUrl}
                          className='w-[30px] h-[30px] rounded-full overflow-hidden'
                          alt='Category preview'
                        />
                        <span className='text-sm block'>{category.name}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className='w-full lg:w-9/12 pl-0 lg:pl-8'>
            <div className='flex flex-wrap w-full justify-between items-center gap-6 lg:gap-0'>
              <div className='w-full lg:w-9/12'>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    navigate('/shop');
                  }}
                  className='flex border h-[50px] items-center relative gap-6'
                >
                  <div className='relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px]'>
                    <select
                      // TODO: this should be multivalue select with provided values, because we can select more than one categories
                      onChange={(event) => {
                        const selectedCategory = event.target.value
                          ? [event.target.value]
                          : [];
                        dispatch(
                          changeFilter({ categories: selectedCategory })
                        );
                        navigate('/shop');
                      }}
                      className='w-[154px] text-slate-600 font-semibold bg-transparent px-2 h-full outline-0 border-none'
                    >
                      <option value=''>Select Category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    name='text'
                    value={selectedText}
                    onChange={(event) => {
                      dispatch(changeFilter({ text: event.target.value }));
                    }}
                    type='text'
                    className='w-full relative bg-transparent text-slate-500 outline-0 px-3 h-full'
                    placeholder='Search'
                  />
                  <button className='bg-[#059473] right-0 absolute px-6 h-full font-semibold uppercase text-white'>
                    Search
                  </button>
                </form>
              </div>

              <div className='hidden lg:block w-full lg:w-3/12 pl-0 lg:pl-2'>
                <div className='w-full flex justify-start lg:justify-end gap-3 items-center'>
                  <div className='w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center'>
                    <PhoneIcon />
                  </div>
                  <div className='flex justify-end flex-col gap-1'>
                    <h2 className='text-md font-medium text-slate-700'>
                      0321321432
                    </h2>
                    <span className='text-sm'>Support 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
