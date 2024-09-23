import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

import { useSelector } from '../../store/store';
import { selectUser } from '../../store/features/user/userSlice';
import {
  useGetChatQuery,
  useCreateChatMutation,
} from '../../store/services/chat';
import ChatMessages from '../dashboard/buyer/chat/ChatMessages';
import UsersChatList from '../dashboard/buyer/chat/UsersChatList';
import ChatHeader from '../dashboard/buyer/chat/ChatHeader';
import ChatForm from './chat/ChatForm';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SellerToCustomer = () => {
  const [showSidebarUsersList, setShowSidebarUsersList] = useState(false);

  const user = useSelector(selectUser);

  const { receiverId } = useParams();

  const [socket, setSocket] = useState(null);
  const [userStatuses, setUserStatuses] = useState({});

  const { data: chatData } = useGetChatQuery(
    { receiverId },
    { skip: !receiverId }
  );

  const [createChat] = useCreateChatMutation();

  useEffect(() => {
    // if not chat was found and receiver/user id was provided, create the chat
    if (chatData && !chatData.chat && receiverId) {
      createChat({ receiverId: receiverId });
    }
  }, [createChat, chatData, receiverId]);

  useEffect(() => {
    let newSocket;

    if (user) {
      newSocket = io(backendUrl, {
        query: { userId: user.id },
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
    if (socket && chatData?.chat?._id) {
      socket.emit('joinChat', { chatId: chatData.chat._id });
    }
  }, [socket, chatData]);

  return (
    <div className='px-2 lg:px-7 py-5'>
      <div className='w-full bg-[#6a5fdf] px-4 py-4 rounded-md h-[calc(100vh-140px)]'>
        <div className='flex w-full h-full relative'>
          <UsersChatList
            userStatuses={userStatuses}
            showSidebarUsersList={showSidebarUsersList}
            setShowSidebarUsersList={setShowSidebarUsersList}
            title='Buyers'
          />

          <div className='w-full md:w-[calc(100%-200px)] md:pl-4'>
            <ChatHeader
              chat={chatData?.chat}
              userStatuses={userStatuses}
              setShowSidebarUsersList={setShowSidebarUsersList}
            />

            <ChatMessages socket={socket} chatId={chatData?.chat._id} />

            <ChatForm socket={socket} chatId={chatData?.chat._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerToCustomer;
