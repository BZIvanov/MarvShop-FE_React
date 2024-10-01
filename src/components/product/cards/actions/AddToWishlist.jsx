import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { useSelector } from '@/store/store';
import { selectUser } from '@/store/features/user/userSlice';
import { HeartIcon } from '@/components/common/icons/Icons';

const AddToWishlist = ({ slug, onAddToWishlist }) => {
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  return (
    <span
      onClick={() => {
        if (!user) {
          return navigate('/auth/login', {
            state: {
              customNavigateTo: `/products/${slug}`,
            },
          });
        }

        onAddToWishlist();
      }}
      className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'
    >
      <HeartIcon />
    </span>
  );
};

AddToWishlist.propTypes = {
  slug: PropTypes.string.isRequired,
  onAddToWishlist: PropTypes.func.isRequired,
};

export default AddToWishlist;
