import PropTypes from 'prop-types';
import { useState } from 'react';

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
        className='shadow-lg bg-[#06b6d4] hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center'
      >
        Send
      </button>
    </form>
  );
};

ChatForm.propTypes = {
  socket: PropTypes.object,
  chatId: PropTypes.string,
};

export default ChatForm;
