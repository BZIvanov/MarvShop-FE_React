import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaList } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { GrEmoji } from 'react-icons/gr';
import { IoSend } from 'react-icons/io5';
import io from 'socket.io-client';

const socket = io('http://localhost:3100');
console.log(socket);

const BuyerChat = () => {
  const [show, setShow] = useState(false);

  const { sellerId } = useParams();

  return (
    <div className='px-2 lg:px-7 py-5'>
      <div className='w-full bg-[#6a5fdf] px-4 py-4 rounded-md h-[calc(100vh-140px)]'>
        <div className='flex w-full h-full relative'>
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? '-left-[16px]' : '-left-[336px]'
            } md:left-0 md:relative transition-all `}
          >
            <div className='w-full h-[calc(100vh-177px)] bg-[#9e97e9] md:bg-transparent overflow-y-auto'>
              <div className='flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white'>
                <h2>Customers</h2>
                <span
                  onClick={() => setShow((prevState) => !prevState)}
                  className='block cursor-pointer md:hidden'
                >
                  <IoMdClose />
                </span>
              </div>

              <div
                className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-md cursor-pointer bg-[#8288ed] `}
              >
                <div className='relative'>
                  <img
                    className='w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full'
                    src='/images/logo.png'
                    alt=''
                  />
                  <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>
                </div>

                <div className='flex justify-center items-start flex-col w-full'>
                  <div className='flex justify-between items-center w-full'>
                    <h2 className='text-base font-semibold'>Iva Ivanova</h2>
                  </div>
                </div>
              </div>

              <div
                className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-sm cursor-pointer`}
              >
                <div className='relative'>
                  <img
                    className='w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full'
                    src='/images/logo.png'
                    alt=''
                  />
                  <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>
                </div>

                <div className='flex justify-center items-start flex-col w-full'>
                  <div className='flex justify-between items-center w-full'>
                    <h2 className='text-base font-semibold'>Ivan</h2>
                  </div>
                </div>
              </div>

              <div
                className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-sm cursor-pointer`}
              >
                <div className='relative'>
                  <img
                    className='w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full'
                    src='/images/logo.png'
                    alt=''
                  />
                  <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>
                </div>

                <div className='flex justify-center items-start flex-col w-full'>
                  <div className='flex justify-between items-center w-full'>
                    <h2 className='text-base font-semibold'>Elena</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full md:w-[calc(100%-200px)] md:pl-4'>
            <div className='flex justify-between items-center'>
              {sellerId && (
                <div className='flex justify-start items-center gap-3'>
                  <div className='relative'>
                    <img
                      className='w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full'
                      src='/images/logo.png'
                      alt=''
                    />
                    <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>
                  </div>
                  <h2 className='text-base text-white font-semibold'>Biserr</h2>
                </div>
              )}

              <div
                onClick={() => setShow((prevState) => !prevState)}
                className='w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center text-white'
              >
                <span>
                  <FaList />
                </span>
              </div>
            </div>

            <div className='py-4'>
              <div className='bg-[#475569] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto'>
                <div className='w-full flex justify-start items-center'>
                  <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                    <div>
                      <img
                        className='w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]'
                        src='/images/logo.png'
                        alt=''
                      />
                    </div>
                    <div className='flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-sm'>
                      <span>How Are you?</span>
                    </div>
                  </div>
                </div>

                <div className='w-full flex justify-end items-center'>
                  <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                    <div className='flex justify-center items-start flex-col w-full bg-red-500 shadow-lg shadow-red-500/50 text-white py-1 px-2 rounded-sm'>
                      <span>How Are you?</span>
                    </div>
                    <div>
                      <img
                        className='w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]'
                        src='/images/logo.png'
                        alt=''
                      />
                    </div>
                  </div>
                </div>

                <div className='w-full flex justify-start items-center'>
                  <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                    <div>
                      <img
                        className='w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]'
                        src='/images/logo.png'
                        alt=''
                      />
                    </div>
                    <div className='flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-sm'>
                      <span>I Need some help</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex p-2 justify-between items-center w-full'>
              <div className='w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full'>
                <label className='cursor-pointer' htmlFor=''>
                  <AiOutlinePlus />
                </label>
                <input className='hidden' type='file' />
              </div>
              <div className='border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative'>
                <input
                  type='text'
                  placeholder='input message'
                  className='w-full rounded-full h-full outline-none p-3'
                />
                <div className='text-2xl right-2 top-2 absolute cursor-auto'>
                  <span>
                    <GrEmoji />
                  </span>
                </div>
              </div>
              <div className='w-[40px] p-2 justify-center items-center rounded-full'>
                <div className='text-2xl cursor-pointer'>
                  <IoSend />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerChat;
