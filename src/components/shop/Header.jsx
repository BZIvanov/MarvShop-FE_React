import { Link } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { IoMdPhonePortrait } from 'react-icons/io';
import { FaFacebookF, FaLock, FaUser } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';

import { useSelector } from '../../store/store';
import { selectUser } from '../../store/features/user/userSlice';

const Header = () => {
  const user = useSelector(selectUser);

  return (
    <div className='w-full bg-white'>
      <div className='header-top bg-[#caddff] hidden md:block'>
        <div className='w-[85%] lg:w-[90%] mx-auto'>
          <div className='flex w-full justify-between items-center h-[50px] text-slate-500'>
            <ul className='flex justify-start items-center gap-8 font-semibold text-black'>
              <li className='flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]'>
                <span>
                  <MdEmail />
                </span>
                <span>support@mail.com</span>
              </li>

              <li className='flex relative justify-center items-center gap-2 text-sm'>
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
                    className='w-[28px] h-[14px]'
                    src='/images/flag.png'
                    alt='Language menu'
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
    </div>
  );
};

export default Header;
