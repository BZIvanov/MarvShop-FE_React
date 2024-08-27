import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';

import { useRegisterMutation } from '../../../store/services/users';

const Register = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [register, { isLoading }] = useRegisterMutation();

  const handleInputChange = (event) => {
    setFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { username, email, password } = formValues;
    register({ username, email, password });
  };

  return (
    <div className='min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center'>
      <div className='w-[350px] text-[#ffffff] p-2'>
        <div className='bg-[#6f68d1] p-4 rounded-md'>
          <h2 className='text-xl mb-3 font-bold'>Welcome to Marv Shop</h2>
          <p className='text-sm mb-3 font-medium'>
            Please register your account
          </p>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col w-full gap-1 mb-3'>
              <label htmlFor='username'>Username</label>
              <input
                onChange={handleInputChange}
                value={formValues.username}
                className='px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md'
                type='text'
                name='username'
                placeholder='Username'
                id='username'
                required={true}
              />
            </div>

            <div className='flex flex-col w-full gap-1 mb-3'>
              <label htmlFor='email'>Email</label>
              <input
                onChange={handleInputChange}
                value={formValues.email}
                className='px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md'
                type='email'
                name='email'
                placeholder='Email'
                id='email'
                required={true}
              />
            </div>

            <div className='flex flex-col w-full gap-1 mb-3'>
              <label htmlFor='password'>Password</label>
              <input
                onChange={handleInputChange}
                value={formValues.password}
                className='px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md'
                type='password'
                name='password'
                placeholder='Password'
                id='password'
                required={true}
              />
            </div>

            <div className='flex items-center w-full gap-3 mb-3'>
              <input
                className='w-4 h-4 text-blue-600 overflow-hidden bg-gray-200 rounded border-gray-300 focus:ring-blue-500 cursor-pointer'
                type='checkbox'
                name='checkbox'
                id='checkbox'
              />
              <label htmlFor='checkbox'>
                I agree to privacy policy &amp; terms
              </label>
            </div>

            <button
              disabled={isLoading}
              className='bg-slate-800 w-full hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'
            >
              {isLoading ? (
                <PropagateLoader
                  color='#fff'
                  cssOverride={{
                    display: 'flex',
                    margin: '0 auto',
                    height: '24px',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              ) : (
                'Register'
              )}
            </button>

            <div className='flex items-center mb-3 gap-3 justify-center'>
              <p>Already have an account?</p>
              <Link className='font-bold' to='/auth/login'>
                Login
              </Link>
            </div>

            <div className='w-full flex justify-center items-center mb-3'>
              <div className='w-[45%] bg-slate-700 h-[1px]' />
              <div className='w-[10%] flex justify-center items-center'>
                <span className='pb-1'>Or</span>
              </div>
              <div className='w-[45%] bg-slate-700 h-[1px]' />
            </div>

            <div className='flex justify-center items-center gap-3'>
              <div className='w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                <span>
                  <FaGoogle />
                </span>
              </div>

              <div className='w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-blue-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                <span>
                  <FaFacebook />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
