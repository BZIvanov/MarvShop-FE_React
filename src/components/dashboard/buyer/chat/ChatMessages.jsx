import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import { useSelector } from '../../../../store/store';
import { selectUser } from '../../../../store/features/user/userSlice';
import { useGetChatMessagesQuery } from '../../../../store/services/chat';

const ChatMessages = ({ socket, chatId }) => {
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const user = useSelector(selectUser);

  const { data: messagesData } = useGetChatMessagesQuery(
    { chatId },
    { skip: !chatId }
  );

  useEffect(() => {
    if (messagesData?.messages) {
      setMessages(messagesData.messages);
    }
  }, [messagesData]);

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (newMessage) => {
        setMessages((prevState) => [...prevState, newMessage]);
      });
    }
  }, [socket]);

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
          const isCurrentUser = user.id === message.sender._id;

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
      </div>
    </div>
  );
};

ChatMessages.propTypes = {
  socket: PropTypes.object,
  chatId: PropTypes.string,
};

export default ChatMessages;
