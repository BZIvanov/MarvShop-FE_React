import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineShoppingCart } from 'react-icons/ai';
import { BiCategory, BiLogOutCircle } from 'react-icons/bi';
import { FaUserTimes, FaUsers } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import { FaCodePullRequest } from 'react-icons/fa6';
import { IoIosChatbubbles } from 'react-icons/io';

import { useSelector } from '../../store/store';
import { selectUser } from '../../store/features/user/userSlice';

const adminLinks = [
  {
    title: 'Dashboard',
    icon: <AiOutlineDashboard />,
    path: '/admin/dashboard',
  },
  {
    title: 'Orders',
    icon: <AiOutlineShoppingCart />,
    path: '/admin/orders',
  },
  {
    title: 'Category',
    icon: <BiCategory />,
    path: '/admin/category',
  },
  {
    title: 'Sellers',
    icon: <FaUsers />,
    path: '/admin/sellers',
  },
  {
    title: 'Payment Request',
    icon: <MdPayment />,
    path: '/admin/payment-request',
  },
  {
    title: 'Deactive Sellers',
    icon: <FaUserTimes />,
    path: '/admin/deactive-sellers',
  },
  {
    title: 'Seller Request',
    icon: <FaCodePullRequest />,
    path: '/admin/sellers-request',
  },
  {
    title: 'Live Chat',
    icon: <IoIosChatbubbles />,
    path: '/admin/chat-sellers',
  },
];

const sellerLinks = [
  {
    title: 'Dashboard',
    icon: <AiOutlineDashboard />,
    path: '/seller/dashboard',
  },
  {
    title: 'Add Product',
    icon: <AiOutlineDashboard />,
    path: '/seller/add-product',
  },
  {
    title: 'All Products',
    icon: <AiOutlineDashboard />,
    path: '/seller/products',
  },
  {
    title: 'Discount Product',
    icon: <AiOutlineDashboard />,
    path: '/seller/discount-products',
  },
  {
    title: 'Orders',
    icon: <AiOutlineDashboard />,
    path: '/seller/orders',
  },
  {
    title: 'Payments',
    icon: <AiOutlineDashboard />,
    path: '/seller/payments',
  },
  {
    title: 'Chat-Customer',
    icon: <AiOutlineDashboard />,
    path: '/seller/chat-customer',
  },
  {
    title: 'Chat-Support',
    icon: <AiOutlineDashboard />,
    path: '/seller/chat-support',
  },
  {
    title: 'Profile',
    icon: <AiOutlineDashboard />,
    path: '/seller/profile',
  },
];

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { pathname } = useLocation();

  const user = useSelector(selectUser);
  const isAdmin = user?.role === 'admin';

  const links = isAdmin ? adminLinks : sellerLinks;

  return (
    <div>
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-200 ${
          !showSidebar ? 'invisible' : 'visible'
        } w-screen h-screen bg-[#8cbce780] top-0 left-0 z-10`}
      />
      <div
        className={`w-[260px] fixed bg-[#e6e7fb] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${
          showSidebar ? 'left-0' : '-left-[260px] lg:left-0'
        }`}
      >
        <div className='h-[70px] flex justify-center items-center'>
          <Link to='/' className='w-[180px] h-[50px]'>
            <img
              className='w-full h-full'
              src='/images/logo.png'
              alt='App logo'
            />
          </Link>
        </div>
        <div className='px-[16px]'>
          <ul>
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`${
                    pathname === link.path
                      ? 'bg-blue-600 shadow-indigo-500/50 text-white duration-500'
                      : 'text-[#030811] font-bold duration-200 '
                  } px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1`}
                >
                  <span>{link.icon}</span>
                  <span>{link.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button className='text-[#030811] font-bold duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1'>
                <span>
                  <BiLogOutCircle />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  showSidebar: PropTypes.bool,
  setShowSidebar: PropTypes.func,
};

export default Sidebar;
