import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from '@/store/store';
import { selectUser } from '@/store/features/user/userSlice';
import { useGetChatMessagesQuery } from '@/store/services/chat';
import { showNotification } from '@/store/features/notification/notificationSlice';
import { FaceGrinHeartsIcon } from '@/components/common/icons/Icons';

const ChatMessages = ({ socket, chatId }) => {
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const user = useSelector(selectUser);

  const { data: messagesData, refetch } = useGetChatMessagesQuery(
    { chatId },
    { skip: !chatId }
  );

  useEffect(() => {
    if (chatId) {
      // refetch the data everytime the chatId changes, this is to get the latest messages, if we were on a different user chat window
      refetch();
    }
  }, [chatId, refetch]);

  useEffect(() => {
    if (messagesData?.messages) {
      setMessages(messagesData.messages);
    }
  }, [messagesData]);

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      // only set messages for the same chat id so the user will not receive messages in any other opened user chat
      if (chatId === newMessage.chat) {
        setMessages((prevState) => [...prevState, newMessage]);
      } else {
        // notify about new messages in other chats
        dispatch(
          showNotification({
            type: 'success',
            message: 'You have a new message',
          })
        );
      }
    };

    if (socket && chatId) {
      socket.on('newMessage', handleNewMessage);
    }

    return () => {
      if (socket) {
        socket.off('newMessage', handleNewMessage);
      }
    };
  }, [dispatch, socket, chatId]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className='py-4'>
      <div className='bg-[#475569] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto'>
        {messages.map((message) => {
          const isCurrentUser = user._id === message.sender._id;

          return (
            <div
              key={message._id}
              className={`w-full flex items-center ${
                isCurrentUser ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%] ${
                  isCurrentUser ? 'flex-row-reverse' : ''
                }`}
              >
                <div>
                  <img
                    className='w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]'
                    src={
                      message.sender?.avatar?.imageUrl || '/images/avatar.png'
                    }
                    alt='User avatar'
                  />
                </div>
                <div
                  className={`flex justify-center items-start flex-col w-full text-white py-1 px-2 rounded-sm ${
                    isCurrentUser
                      ? 'bg-red-500 shadow-lg shadow-red-500/50'
                      : 'bg-blue-500 shadow-lg shadow-blue-500/50'
                  }`}
                >
                  <span>{message.content}</span>
                </div>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />

        {!chatId && (
          <div className='w-full h-full flex justify-center items-center flex-col gap-2 text-white'>
            <FaceGrinHeartsIcon />
            <span>Select a user to start chatting</span>
          </div>
        )}
      </div>
    </div>
  );
};

ChatMessages.propTypes = {
  socket: PropTypes.object,
  chatId: PropTypes.string,
};

export default ChatMessages;
