import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';

import { useSelector } from '@/store/store';
import { selectUser } from '@/store/features/user/userSlice';
import { useGetChatsQuery } from '@/store/services/chat';
import ChatHeader from '../dashboard/buyer/chat/ChatHeader';
import ChatMessages from '../dashboard/buyer/chat/ChatMessages';
import ChatForm from './chat/ChatForm';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SellerToAdmin = () => {
  const user = useSelector(selectUser);

  const [socket, setSocket] = useState(null);
  const [userStatuses, setUserStatuses] = useState({});

  const { data: chatsData } = useGetChatsQuery();
  const selectedChat = useMemo(
    () => chatsData?.chats.find((chat) => chat.chatType === 'seller-admin'),
    [chatsData]
  );

  const receiver = useMemo(() => {
    if (selectedChat) {
      return selectedChat.participants.find(
        (participant) => participant.user._id !== user?._id
      ).user;
    }
    return null;
  }, [user, selectedChat]);

  useEffect(() => {
    let newSocket;

    if (user) {
      newSocket = io(backendUrl, {
        query: { userId: user._id },
      });
      setSocket(newSocket);

      newSocket.on('activeUsers', (activeUsersList) => {
        const activeUsersListStatuses = activeUsersList.reduce((acc, curr) => {
          return { ...acc, [curr]: 'online' };
        }, {});

        setUserStatuses((prevStatuses) => ({
          ...prevStatuses,
          ...activeUsersListStatuses,
        }));
      });

      newSocket.on('userStatus', ({ userId, status }) => {
        setUserStatuses((prevStatuses) => ({
          ...prevStatuses,
          [userId]: status,
        }));
      });
    }

    return () => {
      if (newSocket) {
        newSocket.off('userStatus');
        return newSocket.disconnect();
      }
    };
  }, [user]);

  useEffect(() => {
    if (socket && selectedChat?._id) {
      socket.emit('joinChat', { chatId: selectedChat._id });
    }
  }, [socket, selectedChat]);

  return (
    <div className='px-2 lg:px-7 py-5'>
      <div className='w-full bg-[#6a5fdf] px-4 py-4 rounded-md h-[calc(100vh-140px)]'>
        <div className='flex w-full h-full relative'>
          <div className='w-full md:pl-4'>
            <ChatHeader
              chat={selectedChat}
              receiverId={receiver?._id}
              userStatuses={userStatuses}
            />

            <ChatMessages socket={socket} chatId={selectedChat?._id} />

            <ChatForm socket={socket} chatId={selectedChat?._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerToAdmin;
