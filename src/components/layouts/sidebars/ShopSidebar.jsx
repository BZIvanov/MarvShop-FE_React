import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

import {
  PhoneIcon,
  EmailIcon,
  LockIcon,
  UserIcon,
} from '@/components/common/icons/Icons';
import { Separator } from '@/components/ui/separator';
import { useSelector } from '@/store/store';
import { selectUser } from '@/store/features/user/userSlice';

const ShopSidebar = ({ showSidebar, setShowSidebar }) => {
  const user = useSelector(selectUser);

  return (
    <div className='lg:hidden'>
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed transition-opacity duration-300 ${
          showSidebar ? 'opacity-100 visible' : 'opacity-0 invisible'
        } lg:hidden w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-[2010]`}
      />
      <div
        className={`fixed w-[300px] z-[2010] transition-transform duration-300 top-0 h-screen bg-white py-6 px-8 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex justify-start flex-col gap-5'>
          <Link to='/'>
            <img src='/images/logo.png' alt='Shop logo' />
          </Link>

          <Separator />

          <div className='flex justify-start items-center gap-10'>
            <div className='flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute '>
              <img
                className='w-[30px] h-[14px]'
                src='/images/flag.png'
                alt='Language selection'
              />
              <ChevronDown className='w-4 h-4' />
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

          <Separator />

          <ul className='flex flex-col justify-start items-start text-sm font-bold uppercase'>
            <li>
              <NavLink
                to='/shop'
                className={({ isActive }) =>
                  `py-2 block ${isActive ? 'text-[#059473]' : 'text-slate-600'}`
                }
              >
                Shop
              </NavLink>
            </li>
          </ul>

          <Separator />

          <div className='w-full flex justify-start lg:justify-end gap-3 items-center'>
            <div className='w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center'>
              <PhoneIcon />
            </div>
            <div className='flex justify-end flex-col gap-1'>
              <h2 className='text-sm font-medium text-slate-700'>0888123456</h2>
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
  );
};

ShopSidebar.propTypes = {
  showSidebar: PropTypes.bool,
  setShowSidebar: PropTypes.func,
};

export default ShopSidebar;
