import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrEmoji } from 'react-icons/gr';
import { IoSend } from 'react-icons/io5';

import { useSelector } from '@/store/store';
import { selectUser } from '@/store/features/user/userSlice';

const ChatForm = ({ socket, chatId }) => {
  const [message, setMessage] = useState('');

  const user = useSelector(selectUser);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!message) {
      return;
    }

    if (socket && chatId) {
      socket.emit('sendMessage', {
        chatId,
        senderId: user.id,
        content: message,
      });

      setMessage('');
    }
  };

  return (
    <div className='p-2 w-full'>
      <form onSubmit={handleFormSubmit}>
        <div className='flex justify-between items-center'>
          <div className='w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full'>
            <label className='cursor-pointer' htmlFor=''>
              <AiOutlinePlus />
            </label>
            <input className='hidden' type='file' />
          </div>
          <div className='border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative'>
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              type='text'
              placeholder='Your message'
              className='w-full rounded-full h-full outline-none p-3'
            />
            <div className='text-2xl right-2 top-2 absolute cursor-auto'>
              <span>
                <GrEmoji />
              </span>
            </div>
          </div>
          <button className='w-[40px] p-2 justify-center items-center rounded-full'>
            <div className='text-2xl cursor-pointer'>
              <IoSend />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

ChatForm.propTypes = {
  socket: PropTypes.object,
  chatId: PropTypes.string,
};

export default ChatForm;
