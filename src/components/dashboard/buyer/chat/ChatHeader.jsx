import PropTypes from 'prop-types';

import { List6Icon } from '@/components/common/icons/Icons';

const ChatHeader = ({
  chat = {},
  receiverId,
  userStatuses,
  setShowSidebarUsersList,
}) => {
  const receiver = chat?.participants?.find(
    (participant) => participant.user._id === receiverId
  );

  return (
    <div className='flex justify-between items-center'>
      {receiverId ? (
        <div className='flex justify-start items-center gap-3'>
          <div className='relative'>
            <img
              className='w-[45px] h-[45px] border-2 max-w-[45px] p-[2px] rounded-full'
              src={receiver?.user?.avatar?.imageUrl || '/images/avatar.png'}
              alt='User avatar'
            />
            <div
              className={`w-[10px] h-[10px] rounded-full absolute right-0 bottom-0 ${
                Object.keys(userStatuses).includes(receiverId) &&
                userStatuses[receiverId] === 'online'
                  ? 'bg-green-500'
                  : 'bg-red-500'
              }`}
            />
          </div>
          <h2 className='text-base text-white font-semibold'>
            {receiver?.user.username}
          </h2>
        </div>
      ) : (
        <div className='h-[45px]' />
      )}

      {setShowSidebarUsersList && (
        <div
          onClick={() => setShowSidebarUsersList((prevState) => !prevState)}
          className='w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center text-white'
        >
          <List6Icon />
        </div>
      )}
    </div>
  );
};

ChatHeader.propTypes = {
  chat: PropTypes.object,
  receiverId: PropTypes.string,
  userStatuses: PropTypes.object,
  setShowSidebarUsersList: PropTypes.func,
};

export default ChatHeader;
