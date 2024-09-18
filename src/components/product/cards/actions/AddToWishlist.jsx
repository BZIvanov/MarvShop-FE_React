import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';

import { useSelector } from '../../../../store/store';
import { selectUser } from '../../../../store/features/user/userSlice';

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
      <FaRegHeart />
    </span>
  );
};

AddToWishlist.propTypes = {
  slug: PropTypes.string.isRequired,
  onAddToWishlist: PropTypes.func.isRequired,
};

export default AddToWishlist;
