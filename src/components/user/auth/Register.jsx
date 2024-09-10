import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa6';
import { FaGoogle } from 'react-icons/fa6';

import { useRegisterMutation } from '../../../store/services/users';
import ButtonLoadingIndicator from '../../common/feedback/ButtonLoadingIndicator';
import Header from '../../common/Header';
import Footer from '../../common/Footer';

const Register = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSeller, setIsSeller] = useState(false);

  const [register, { isLoading }] = useRegisterMutation();

  const handleInputChange = (event) => {
    setFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setIsSeller(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { username, email, password } = formValues;
    register({
      username,
      email,
      password,
      role: isSeller ? 'seller' : 'buyer',
    });
  };

  return (
    <div>
      <Header />
      <div className='bg-slate-200 mt-4'>
        <div className='w-full justify-center items-center p-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 w-[95%] xl:w-[60%] mx-auto bg-white rounded-md'>
            <div className='w-full px-8 py-8'>
              <h2 className='text-center w-full text-xl text-slate-600 font-bold mb-3'>
                Register your account
              </h2>

              <div>
                <form onSubmit={handleSubmit} className='text-slate-600'>
                  <div className='flex flex-col gap-1 mb-2'>
                    <label htmlFor='username'>Username</label>
                    <input
                      name='username'
                      value={formValues.username}
                      onChange={handleInputChange}
                      type='text'
                      id='username'
                      className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                      placeholder='Username'
                      required={true}
                    />
                  </div>

                  <div className='flex flex-col gap-1 mb-2'>
                    <label htmlFor='email'>Email</label>
                    <input
                      name='email'
                      value={formValues.email}
                      onChange={handleInputChange}
                      type='email'
                      id='email'
                      className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                      placeholder='Email'
                      required={true}
                    />
                  </div>

                  <div className='flex flex-col gap-1 mb-2'>
                    <label htmlFor='password'>Password</label>
                    <input
                      name='password'
                      value={formValues.password}
                      onChange={handleInputChange}
                      type='password'
                      id='password'
                      className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                      placeholder='Password'
                      required={true}
                    />
                  </div>

                  <div className='flex items-center w-full gap-1 mb-2 py-3'>
                    <input
                      checked={isSeller}
                      onChange={handleCheckboxChange}
                      type='checkbox'
                      id='role-type'
                      className='w-4 h-4 mr-2 text-blue-600 overflow-hidden bg-gray-200 rounded border-gray-300 focus:ring-blue-500 cursor-pointer'
                    />
                    <label htmlFor='role-type' className='cursor-pointer'>
                      Register as seller
                    </label>
                  </div>

                  <button
                    disabled={isLoading}
                    className='px-8 w-full py-2 bg-[#059473] shadow-lg hover:shadow-green-500/40 text-white rounded-md'
                  >
                    {isLoading ? <ButtonLoadingIndicator /> : 'Register'}
                  </button>
                </form>

                <div className='flex items-center justify-center text-center gap-2 text-slate-600 pt-1 mt-3'>
                  <p>Already have an account?</p>
                  <Link className='text-blue-500' to='/auth/login'>
                    Login
                  </Link>
                </div>

                <div className='flex justify-center items-center py-2'>
                  <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                  <span className='px-3 text-slate-600'>Or</span>
                  <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                </div>

                <button className='px-8 w-full py-2 bg-indigo-500 shadow hover:shadow-indigo-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                  <span>
                    <FaFacebookF />
                  </span>
                  <span>Login With Facebook</span>
                </button>

                <button className='px-8 w-full py-2 bg-red-500 shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                  <span>
                    <FaGoogle />
                  </span>
                  <span>Login With Google</span>
                </button>
              </div>
            </div>

            <div className='w-full h-full py-4 pr-4 hidden md:block'>
              <img
                className='w-full h-full'
                src='/images/auth.png'
                alt='Auth image'
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
