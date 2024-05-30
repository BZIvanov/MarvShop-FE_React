import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useLoginMutation } from '../../../store/services/users';
import { PropagateLoader } from 'react-spinners';

const AdminLogin = () => {
  const [login, { isLoading, isSuccess }] = useLoginMutation();

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

    login(formValues);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Successfull login');
    }
  }, [isSuccess]);

  return (
    <div className='min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center'>
      <div className='w-[350px] text-[#ffffff] p-2'>
        <div className='bg-[#6f68d1] p-4 rounded-md'>
          <div className='h-[70px] flex justify-center items-center'>
            <div className='w-[180px] h-[50px]'>
              <img
                className='w-full h-full'
                src='/images/logo.png'
                alt='App logo'
              />
            </div>
          </div>

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
                required
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
                required
              />
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
                    alignItem: 'center',
                  }}
                />
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
