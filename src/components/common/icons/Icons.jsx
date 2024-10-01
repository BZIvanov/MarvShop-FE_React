import { CiStar } from 'react-icons/ci';
import {
  FaEdit,
  FaTrash,
  FaImage,
  FaUsers,
  FaEye,
  FaStar,
  FaStarHalfAlt,
  FaList,
  FaRegHeart,
} from 'react-icons/fa';
import { FaCartShopping, FaFacebookF, FaGoogle } from 'react-icons/fa6';
import {
  IoMdCloseCircle,
  IoIosArrowForward,
  IoMdImages,
  IoIosArrowBack,
} from 'react-icons/io';
import { LuArrowDownSquare } from 'react-icons/lu';
import {
  MdCurrencyExchange,
  MdProductionQuantityLimits,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';

export const ArrowDownSquareIcon = (props) => <LuArrowDownSquare {...props} />;
export const ArrowBackIcon = (props) => <IoIosArrowBack {...props} />;
export const ArrowForwardIcon = (props) => <IoIosArrowForward {...props} />;
export const CartShoppingIcon = (props) => <FaCartShopping {...props} />;
export const CloseCircleIcon = (props) => <IoMdCloseCircle {...props} />;
export const CurrencyExchangeIcon = (props) => (
  <MdCurrencyExchange {...props} />
);
export const DoubleArrowLeftIcon = (props) => (
  <MdOutlineKeyboardDoubleArrowLeft {...props} />
);
export const DoubleArrowRightIcon = (props) => (
  <MdOutlineKeyboardDoubleArrowRight {...props} />
);
export const EditIcon = (props) => <FaEdit {...props} />;
export const EyeIcon = (props) => <FaEye {...props} />;
export const FacebookIcon = (props) => <FaFacebookF {...props} />;
export const GoogleIcon = (props) => <FaGoogle {...props} />;
export const HeartIcon = (props) => <FaRegHeart {...props} />;
export const ImageIcon = (props) => <FaImage {...props} />;
export const ImagesIcon = (props) => <IoMdImages {...props} />;
export const ListIcon = (props) => <FaList {...props} />;
export const ProductionQuantityLimitsIcon = (props) => (
  <MdProductionQuantityLimits {...props} />
);
export const StarC = (props) => <CiStar {...props} />;
export const StarF = (props) => <FaStar {...props} />;
export const StarHalfIcon = (props) => <FaStarHalfAlt {...props} />;
export const TrashIcon = (props) => <FaTrash {...props} />;
export const UsersIcon = (props) => <FaUsers {...props} />;
