import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

import { useSelector } from '../../../../store/store';
import { selectUser } from '../../../../store/features/user/userSlice';
import { useGetChatsQuery } from '../../../../store/services/chat';

const UsersChatList = ({
  userStatuses,
  showSidebarUsersList,
  setShowSidebarUsersList,
  title,
}) => {
  const { receiverId } = useParams();

  const user = useSelector(selectUser);

  const { data: chatsData } = useGetChatsQuery();

  return (
    <div
      className={`w-[280px] h-full absolute z-10 ${
        showSidebarUsersList ? '-left-[16px]' : '-left-[336px]'
      } md:left-0 md:relative transition-all `}
    >
      <div className='w-full h-[calc(100vh-177px)] bg-[#9e97e9] md:bg-transparent overflow-y-auto'>
        <div className='flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white'>
          <h2>{title}</h2>
          <span
            onClick={() => setShowSidebarUsersList((prevState) => !prevState)}
            className='block cursor-pointer md:hidden'
          >
            <IoMdClose />
          </span>
        </div>

        {chatsData?.chats.map((chat) => {
          const { _id, participants } = chat;

          const receiver = participants.find(
            (participant) => participant.user._id !== user.id
          );

          return (
            <Link key={_id} to={`/${user.role}/chat/${receiver.user._id}`}>
              <div
                className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-sm cursor-pointer ${
                  receiverId === receiver.user._id ? 'bg-[#8288ed]' : ''
                }`}
              >
                <div className='relative'>
                  <img
                    className='w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full'
                    src={
                      receiver.user?.avatar?.imageUrl || '/images/avatar.png'
                    }
                    alt='User avatar'
                  />
                  <div
                    className={`w-[10px] h-[10px] rounded-full absolute right-0 bottom-0 ${
                      Object.keys(userStatuses).includes(receiver.user._id) &&
                      userStatuses[receiver.user._id] === 'online'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  />
                </div>

                <div className='flex justify-center items-start flex-col w-full'>
                  <div className='flex justify-between items-center w-full'>
                    <h2 className='text-base font-semibold'>
                      {receiver.user.username}
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

UsersChatList.propTypes = {
  userStatuses: PropTypes.object,
  showSidebarUsersList: PropTypes.bool,
  setShowSidebarUsersList: PropTypes.func,
  title: PropTypes.string,
};

export default UsersChatList;
