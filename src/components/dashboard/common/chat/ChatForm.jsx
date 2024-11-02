import PropTypes from 'prop-types';
import { useState } from 'react';

import { useSelector } from '@/store/store';
import { selectUser } from '@/store/features/user/userSlice';
import { SendIcon } from '@/components/common/icons/Icons';

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
        senderId: user._id,
        content: message,
      });

      setMessage('');
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className='flex gap-3'>
      <input
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        type='text'
        disabled={!chatId}
        className='w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-[#d0d2d6]'
        placeholder='Your message'
      />
      <button
        disabled={!chatId}
        className='w-[40px] p-2 justify-center items-center rounded-full text-2xl cursor-pointer'
      >
        <SendIcon />
      </button>
    </form>
  );
};

ChatForm.propTypes = {
  socket: PropTypes.object,
  chatId: PropTypes.string,
};

export default ChatForm;
