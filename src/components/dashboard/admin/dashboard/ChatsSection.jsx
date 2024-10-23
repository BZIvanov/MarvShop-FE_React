import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useSelector } from '@/store/store';
import { selectUser } from '@/store/features/user/userSlice';
import { dateFormatter } from '@/utils/formatting';

const ChatsSection = ({ chats = [] }) => {
  const user = useSelector(selectUser);

  return (
    <div className='w-full bg-[#6a5fdf] p-4 rounded-md text-[#d0d2d6]'>
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold text-lg text-[#d0d2d6] pb-3'>
          Recent Seller Messages
        </h2>
        <Link to='/admin/chat' className='font-semibold text-sm text-[#d0d2d6]'>
          View All
        </Link>
      </div>

      <div className='flex flex-col gap-2 pt-6 text-[#d0d2d6]'>
        <ul className='relative border-1 border-slate-600 ml-4'>
          {chats.map((chat) => {
            const receiver = chat.participants.find(
              (participant) => participant.user._id !== user._id
            );

            return (
              <li key={chat._id} className='mb-3 ml-6'>
                <div className='flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10'>
                  <img
                    className='w-full rounded-full h-full shadow-lg'
                    src={
                      receiver.user?.avatar?.imageUrl || '/images/avatar.png'
                    }
                    alt='User avatar'
                  />
                </div>
                <div className='p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm'>
                  <div className='flex justify-between items-center mb-2'>
                    <Link
                      to={`/admin/chat/${receiver.user._id}`}
                      className='text-md font-normal'
                    >
                      {receiver.user.username}
                    </Link>
                    <time className='mb-1 text-sm font-normal sm:order-last sm:mb-0'>
                      {chat.updatedAt ? dateFormatter(chat.updatedAt) : ''}
                    </time>
                  </div>
                  <div className='p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800'>
                    {chat.mostRecentMessage}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

ChatsSection.propTypes = {
  chats: PropTypes.array,
};

export default ChatsSection;
