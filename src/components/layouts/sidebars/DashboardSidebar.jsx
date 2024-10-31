import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  NotebookTabs,
  ShoppingCart,
  Store,
} from 'lucide-react';

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
} from '@/components/common/icons/Icons';

const adminLinks = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard className='w-4 h-4' />,
    path: '/admin/dashboard',
  },
  {
    title: 'Orders',
    icon: <ShoppingCart className='w-4 h-4' />,
    path: '/admin/orders',
  },
  {
    title: 'Categories',
    icon: <NotebookTabs className='w-4 h-4' />,
    path: '/admin/category',
  },
  {
    title: 'Shops',
    icon: <Store className='w-4 h-4' />,
    path: '/admin/shops',
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
    icon: <LayoutDashboard className='w-4 h-4' />,
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
    icon: <LayoutDashboard className='w-4 h-4' />,
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

const DashboardSidebar = ({ showSidebar, setShowSidebar }) => {
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
        <div className='mt-[50px] p-4'>
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

DashboardSidebar.propTypes = {
  showSidebar: PropTypes.bool,
  setShowSidebar: PropTypes.func,
};

export default DashboardSidebar;
