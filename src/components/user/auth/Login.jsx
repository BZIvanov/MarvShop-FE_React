import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    setFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formValues);
  };

  return (
    <div className='min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center'>
      <div className='w-[350px] text-[#ffffff] p-2'>
        <div className='bg-[#6f68d1] p-4 rounded-md'>
          <h2 className='text-xl mb-3 font-bold'>Welcome to Ecommerce</h2>
          <p className='text-sm mb-3 font-medium'>
            Please login with your account
          </p>

          <form onSubmit={handleSubmit}>
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

            <button className='bg-slate-800 w-full hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
              Login
            </button>

            <div className='flex items-center mb-3 gap-3 justify-center'>
              <p>Don&apos;t have an account?</p>
              <Link className='font-bold' to='/register'>
                Register
              </Link>
            </div>

            <div className='w-full flex justify-center items-center mb-3'>
              <div className='w-[45%] bg-slate-700 h-[1px]'></div>
              <div className='w-[10%] flex justify-center items-center'>
                <span className='pb-1'>Or</span>
              </div>
              <div className='w-[45%] bg-slate-700 h-[1px] '></div>
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

export default Login;