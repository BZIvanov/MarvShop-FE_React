import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { useLoginMutation } from '@/store/services/users';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import { Button } from '@/components/ui/button';

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [login, { isLoading }] = useLoginMutation();

  const handleInputChange = (event) => {
    setFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = formValues;
    login({ email, password });
  };

  return (
    <div>
      <Header />
      <div className='bg-slate-200 mt-4'>
        <div className='w-full justify-center items-center p-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 w-[95%] xl:w-[60%] mx-auto bg-white rounded-md'>
            <div className='w-full px-8 py-8'>
              <h2 className='text-center w-full text-xl text-slate-600 font-bold mb-3'>
                Login with your account
              </h2>

              <div>
                <form onSubmit={handleSubmit} className='text-slate-600'>
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

                  <Button disabled={isLoading} size='lg' className='w-full'>
                    {isLoading ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        Loading
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </form>

                <div className='flex items-center justify-end my-2'>
                  <p>Don&apos;t have an account?</p>
                  <Button variant='link' asChild={true}>
                    <Link to='/auth/register'>Register</Link>
                  </Button>
                </div>

                <div className='flex justify-end my-2'>
                  <Button variant='ghost'>Forgot your password?</Button>
                </div>
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

export default Login;
