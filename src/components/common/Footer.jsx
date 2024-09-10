import { Link } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-[#f3f6fa]'>
      <div className='w-[85%] flex flex-wrap mx-auto border-b py-16 pb-6 lg:pb-10'>
        <div className='w-full md:w-6/12 lg:w-3/12'>
          <div className='flex flex-col gap-3'>
            <img
              className='w-[190px] h-[70px]'
              src='/images/logo.png'
              alt='logo'
            />
            <ul className='flex flex-col gap-2 text-slate-600'>
              <li>
                Address: 1404 Some Street, East Harbor Township, NT 01234,
              </li>
              <li>Phone: 4343434344</li>
              <li>Email: support@mail.com</li>
            </ul>
          </div>
        </div>

        <div className='w-full md:w-6/12 lg:w-5/12 mt-6 md:mt-0'>
          <div className='flex justify-start md:justify-center w-full'>
            <div>
              <h2 className='font-bold text-lg mb-2'>Usefull Links</h2>
              <div className='flex justify-between gap-[80px] lg:gap-[40px]'>
                <ul className='flex flex-col gap-2 text-slate-600 text-sm font-semibold'>
                  <li>
                    <Link>About Us</Link>
                  </li>
                  <li>
                    <Link>About Our Shop</Link>
                  </li>
                  <li>
                    <Link>Delivery Information</Link>
                  </li>
                  <li>
                    <Link>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link>Blogs</Link>
                  </li>
                </ul>

                <ul className='flex flex-col gap-2 text-slate-600 text-sm font-semibold'>
                  <li>
                    <Link>Our Service</Link>
                  </li>
                  <li>
                    <Link>Company Profile</Link>
                  </li>
                  <li>
                    <Link>Delivery Information</Link>
                  </li>
                  <li>
                    <Link>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link>Blogs</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full md:w-full lg:w-4/12 mt-6 lg:mt-0'>
          <div className='w-full flex flex-col justify-start gap-5'>
            <h2 className='font-bold text-lg mb-2'>Join Our Shop</h2>
            <span>
              Get Email updates about our latest and shop special offers
            </span>
            <div className='h-[50px] w-full bg-white border relative'>
              <input
                className='h-full bg-transparent w-full px-3 outline-0'
                type='text'
                placeholder='Your Email'
              />
              <button className='h-full absolute right-0 bg-[#059473] text-white uppercase px-4 font-bold text-sm'>
                Subscribe
              </button>
            </div>

            <ul className='flex justify-start items-center gap-3'>
              <li>
                <Link
                  to='/'
                  className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full'
                >
                  <FaFacebookF />
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full'
                >
                  <FaTwitter />
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full'
                >
                  <FaLinkedin />
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full'
                >
                  <FaGithub />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='w-[90%] flex flex-wrap justify-center items-center text-slate-600 mx-auto py-5 text-center'>
        <span>Copyright @ 2024 All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
