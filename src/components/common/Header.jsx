import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { IoMdPhonePortrait } from 'react-icons/io';
import { FaFacebookF, FaList, FaLock, FaUser } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaHeart } from 'react-icons/fa6';
import { FaCartShopping } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

import { useSelector } from '../../store/store';
import { selectUser } from '../../store/features/user/userSlice';
import { useGetCategoriesQuery } from '../../store/services/categories';

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [categoryShow, setCategoryShow] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState('');

  const user = useSelector(selectUser);

  const { data } = useGetCategoriesQuery({ searchText });

  const wishlistCount = 3;

  return (
    <div className='w-full bg-white'>
      <div className='bg-[#caddff] hidden lg:block'>
        <div className='w-[90%] lg:w-[85%] mx-auto'>
          <div className='flex w-full justify-between items-center h-[50px] text-slate-500'>
            <ul className='flex justify-start items-center gap-8 font-semibold text-black'>
              <li className='flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]'>
                <span>
                  <MdEmail />
                </span>
                <span>support@mail.com</span>
              </li>
              <li className='flex relative justify-center items-center gap-2 text-sm '>
                <span>
                  <IoMdPhonePortrait />
                </span>
                <span>+(123) 456 789</span>
              </li>
            </ul>
            <div>
              <div className='flex justify-center items-center gap-10'>
                <div className='flex justify-center items-center gap-4 text-black'>
                  <Link to='/'>
                    <FaFacebookF />
                  </Link>
                  <Link to='/'>
                    <FaTwitter />
                  </Link>
                  <Link to='/'>
                    <FaLinkedin />
                  </Link>
                  <Link to='/'>
                    <FaGithub />
                  </Link>
                </div>
                <div className='flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]'>
                  <img
                    className='w-[30px] h-[14px]'
                    src='/images/flag.png'
                    alt='Language selection'
                  />
                  <span>
                    <IoMdArrowDropdown />
                  </span>
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
                    <span>
                      <FaUser />
                    </span>
                    <span>{user.username}</span>
                  </Link>
                ) : (
                  <Link
                    className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black'
                    to='/auth/login'
                  >
                    <span>
                      <FaLock />
                    </span>
                    <span>Login</span>
                  </Link>
                )}
              </div>
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
                  <span>
                    <FaList />
                  </span>
                </div>
              </div>
            </div>

            <div className='lg:w-9/12'>
              <div className='flex justify-center lg:justify-between items-center flex-wrap pl-8'>
                <ul className='hidden lg:flex justify-start items-start gap-8 text-sm font-bold uppercase'>
                  <li>
                    <NavLink
                      to='/'
                      className={({ isActive }) =>
                        `p-2 block ${
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
                        `p-2 block ${
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
                        `p-2 block ${
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
                        `p-2 block ${
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
                        `p-2 block ${
                          isActive ? 'text-[#059473]' : 'text-slate-600'
                        }`
                      }
                    >
                      Contact Us
                    </NavLink>
                  </li>
                </ul>

                <div className='hidden lg:flex justify-center items-center gap-5'>
                  <div className='flex justify-center gap-5'>
                    <div className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                      <span className='text-xl text-green-500'>
                        <FaHeart />
                      </span>
                      <div className='w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                        {wishlistCount}
                      </div>
                    </div>

                    <div className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                      <span className='text-xl text-green-500'>
                        <FaCartShopping />
                      </span>
                      <div className='w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                        {wishlistCount}
                      </div>
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
                <span>
                  <IoMdArrowDropdown />
                </span>
                <ul className='absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10'>
                  <li>English</li>
                  <li>Bulgarian</li>
                </ul>
              </div>
              {user ? (
                <Link
                  className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black'
                  to={`${user.role}/dashboard`}
                >
                  <span>
                    <FaUser />
                  </span>
                  <span>{user.username}</span>
                </Link>
              ) : (
                <Link
                  className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black'
                  to='/auth/login'
                >
                  <span>
                    <FaLock />
                  </span>
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
                <FaFacebookF />
              </Link>
              <Link to='/'>
                <FaTwitter />
              </Link>
              <Link to='/'>
                <FaLinkedin />
              </Link>
              <Link to='/'>
                <FaGithub />
              </Link>
            </div>

            <div className='w-full flex justify-start lg:justify-end gap-3 items-center'>
              <div className='w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center'>
                <span>
                  <FaPhoneAlt />
                </span>
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
                <span>
                  <MdEmail />
                </span>
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
                onClick={() => setCategoryShow((prevState) => !prevState)}
                className='h-[50px] bg-[#059473] text-white flex justify-between lg:justify-center px-6 lg:px-0 items-center gap-3 font-bold text-md cursor-pointer'
              >
                <div className='flex justify-center items-center gap-3'>
                  <span>
                    <FaList />
                  </span>
                  <span>All Categories</span>
                </div>
                <span className='pt-1'>
                  <IoIosArrowDown />
                </span>
              </div>
              <div
                className={`${
                  categoryShow ? 'h-0' : 'h-[400px]'
                } overflow-hidden transition-all relative duration-500 lg:absolute z-[99999] bg-[#dbf3ed] w-full border-x`}
              >
                <ul className='py-2 text-slate-600 font-medium'>
                  {data?.categories.map((category) => {
                    return (
                      <li
                        key={category._id}
                        className='flex justify-start items-center gap-2 px-[24px] py-[6px]'
                      >
                        <img
                          src={category.imageUrl}
                          className='w-[30px] h-[30px] rounded-full overflow-hidden'
                          alt='Category preview'
                        />
                        <Link className='text-sm block'>{category.name}</Link>
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
                <div className='flex border h-[50px] items-center relative gap-6'>
                  <div className='relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px]'>
                    <select
                      name='category'
                      onChange={(event) =>
                        setSelectedCategory(event.target.value)
                      }
                      className='w-[154px] text-slate-600 font-semibold bg-transparent px-2 h-full outline-0 border-none'
                    >
                      <option value=''>Select Category</option>
                      {data?.categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    name=''
                    onChange={(event) => setSearchText(event.target.value)}
                    type='text'
                    className='w-full relative bg-transparent text-slate-500 outline-0 px-3 h-full'
                    placeholder='Search'
                  />
                  <button className='bg-[#059473] right-0 absolute px-6 h-full font-semibold uppercase text-white'>
                    Search
                  </button>
                </div>
              </div>

              <div className='hidden lg:block w-full lg:w-3/12 pl-0 lg:pl-2'>
                <div className='w-full flex justify-start lg:justify-end gap-3 items-center'>
                  <div className='w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center'>
                    <span>
                      <FaPhoneAlt />
                    </span>
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
