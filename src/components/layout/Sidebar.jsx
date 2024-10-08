import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineShoppingCart } from 'react-icons/ai';

import { useSelector } from '@/store/store';
import { selectUser } from '@/store/features/user/userSlice';
import {
  AddIcon,
  PaymentIcon,
  ListHeartIcon,
  ProfileIcon,
  ChatQuoteIcon,
  ChatbubblesIcon,
  CartCheckIcon,
  BasketDiscountIcon,
  ViewListIcon,
  Chatbubbles2Icon,
  CodePullRequestIcon,
  UsersIcon,
  UserTimesIcon,
  CategoryIcon,
} from '@/components/common/icons/Icons';

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
    icon: <CategoryIcon />,
    path: '/admin/category',
  },
  {
    title: 'Sellers',
    icon: <UsersIcon />,
    path: '/admin/sellers',
  },
  {
    title: 'Payment Request',
    icon: <PaymentIcon />,
    path: '/admin/payment-request',
  },
  {
    title: 'Deactive Sellers',
    icon: <UserTimesIcon />,
    path: '/admin/deactive-sellers',
  },
  {
    title: 'Sellers Requests',
    icon: <CodePullRequestIcon />,
    path: '/admin/sellers-request',
  },
  {
    title: 'Chat with Sellers',
    icon: <Chatbubbles2Icon />,
    path: '/admin/chat',
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
    icon: <AddIcon />,
    path: '/seller/add-product',
  },
  {
    title: 'All Products',
    icon: <ViewListIcon />,
    path: '/seller/products',
  },
  {
    title: 'Discount Products',
    icon: <BasketDiscountIcon />,
    path: '/seller/discount-products',
  },
  {
    title: 'Orders',
    icon: <CartCheckIcon />,
    path: '/seller/orders',
  },
  {
    title: 'Payments',
    icon: <PaymentIcon />,
    path: '/seller/payments',
  },
  {
    title: 'Chat with Buyers',
    icon: <ChatbubblesIcon />,
    path: '/seller/chat',
  },
  {
    title: 'Chat with Support',
    icon: <ChatQuoteIcon />,
    path: '/seller/chat-support',
  },
  {
    title: 'Profile',
    icon: <ProfileIcon />,
    path: '/seller/profile',
  },
];

const buyerLinks = [
  {
    title: 'Dashboard',
    icon: <AiOutlineDashboard />,
    path: '/buyer/dashboard',
  },
  {
    title: 'Orders',
    icon: <CartCheckIcon />,
    path: '/buyer/orders',
  },
  {
    title: 'Profile',
    icon: <ProfileIcon />,
    path: '/buyer/profile',
  },
  {
    title: 'Wishlist',
    icon: <ListHeartIcon />,
    path: '/buyer/wishlist',
  },
  {
    title: 'Chat with Sellers',
    icon: <ChatbubblesIcon />,
    path: '/buyer/chat',
  },
];

const roleLinks = {
  admin: adminLinks,
  seller: sellerLinks,
  buyer: buyerLinks,
};

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const user = useSelector(selectUser);
  const userRole = user?.role || 'buyer';

  const links = roleLinks[userRole];

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
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? 'bg-blue-600 shadow-indigo-500/50 text-white duration-500'
                        : 'text-[#030811] font-bold duration-200'
                    } px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1`
                  }
                >
                  <span>{link.icon}</span>
                  <span>{link.title}</span>
                </NavLink>
              </li>
            ))}
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
