import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingCart,
  User as UserIcon,
  Lock,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';

import { useDispatch, useSelector } from '@/store/store';
import { selectUser } from '@/store/features/user/userSlice';
import { selectCart, clearCart } from '@/store/features/cart/cartSlice';
import { useGetWishlistProductsQuery } from '@/store/services/wishlist';
import { useLogoutMutation } from '@/store/services/users';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ArrowDropdownIcon, ListIcon } from '@/components/common/icons/Icons';

const Header = ({ setShowSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  const cart = useSelector(selectCart);
  const cartItemsCount = useMemo(() => Object.keys(cart).length, [cart]);

  const { data: wishlistData } = useGetWishlistProductsQuery(undefined, {
    skip: !user,
  });
  const wishlistProducts = wishlistData?.products || [];

  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout();
    dispatch(clearCart());
  };

  return (
    <div className='w-full bg-white'>
      <div className='bg-[#caddff] shadow-lg fixed top-0 left-0 right-0 z-[2000]'>
        <div className='w-[90%] lg:w-[85%] mx-auto'>
          <div className='flex w-full justify-between items-center h-[50px]'>
            <div className='flex justify-start items-center gap-8 font-semibold'>
              <Link to='/'>
                <img src='/images/logo.png' alt='Shop logo' />
              </Link>
              <ul className='hidden lg:flex justify-start items-start gap-8 text-sm font-bold uppercase'>
                {[{ label: 'Shop', link: '/shop' }].map((navigationItem) => {
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
            </div>
            <div className='flex justify-center items-center gap-10'>
              <div className='hidden lg:flex justify-center items-center gap-10'>
                <div className='flex justify-center items-center gap-5'>
                  <div className='relative'>
                    <Button
                      onClick={() => {
                        if (user) {
                          navigate('/buyer/wishlist');
                        } else {
                          navigate('/auth/login', {
                            state: { customNavigateTo: '/buyer/wishlist' },
                          });
                        }
                      }}
                      variant='ghost'
                      className='relative p-2 hover:bg-white hover:bg-opacity-30'
                    >
                      <Heart
                        className='h-6 w-6 text-green-500'
                        fill='currentColor'
                      />
                      {wishlistProducts.length > 0 && (
                        <Badge className='absolute -top-1 -right-1 bg-red-500 hover:bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center'>
                          {wishlistProducts.length}
                        </Badge>
                      )}
                    </Button>
                  </div>

                  <div className='relative'>
                    <Button
                      onClick={() => {
                        if (user) {
                          navigate('/cart');
                        } else {
                          navigate('/auth/login', {
                            state: { customNavigateTo: '/cart' },
                          });
                        }
                      }}
                      variant='ghost'
                      className='relative p-2 hover:bg-white hover:bg-opacity-30'
                    >
                      <ShoppingCart
                        className='h-6 w-6 text-green-500'
                        fill='currentColor'
                      />
                      {cartItemsCount > 0 && (
                        <Badge className='absolute -top-1 -right-1 bg-red-500 hover:bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center'>
                          {cartItemsCount}
                        </Badge>
                      )}
                    </Button>
                  </div>
                </div>
                <div className='flex group cursor-pointer text-sm justify-center items-center gap-1 relative before:absolute before:h-[24px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]'>
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
              </div>

              <div
                className='lg:hidden flex justify-center items-center w-[30px] h-[30px] text-slate-600 border border-slate-600 rounded-sm cursor-pointer'
                onClick={() => setShowSidebar((prevState) => !prevState)}
              >
                <ListIcon />
              </div>

              <div className='flex cursor-pointer text-sm justify-center items-center gap-1 relative before:absolute before:h-[24px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]'>
                {user ? (
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild={true}>
                      <Button
                        variant='ghost'
                        className='p-2 hover:bg-white hover:bg-opacity-30'
                      >
                        <Avatar className='w-8 h-8'>
                          <AvatarImage
                            src={user.avatar?.imageUrl}
                            alt='User avatar'
                          />
                          <AvatarFallback>
                            <UserIcon />
                          </AvatarFallback>
                        </Avatar>
                        <span className='pl-2'>{user.username}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='z-[2001]'>
                      <DropdownMenuItem
                        onClick={() => navigate(`/${user.role}`)}
                        className='gap-2 text-md m-[2px] px-3 py-2 cursor-pointer'
                      >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={handleLogout}
                        className='gap-2 text-md m-[2px] px-3 py-2 cursor-pointer'
                      >
                        <LogOut size={20} />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    variant='ghost'
                    asChild={true}
                    className='p-2 hover:bg-white hover:bg-opacity-30'
                  >
                    <Link to='/auth/login' className='gap-2'>
                      <Lock />
                      <span>Login</span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  setShowSidebar: PropTypes.func,
};

export default Header;
