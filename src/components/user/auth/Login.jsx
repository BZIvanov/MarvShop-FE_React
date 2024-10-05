import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ForgotPasswordDialog from './ForgotPasswordDialog';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import { useLoginMutation } from '@/store/services/users';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Must be 8 or more characters long' }),
});

const Login = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = (values) => {
    login(values);
  };

  return (
    <div>
      <Header />
      <div className='bg-slate-200 mt-4'>
        <div className='w-full justify-center items-center p-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 w-[95%] xl:w-[60%] mx-auto bg-white rounded-md'>
            <div className='w-full px-8 py-8'>
              <h2 className='text-center w-full text-xl font-bold mb-3'>
                Login with your account
              </h2>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-4'
                >
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type='email'
                            placeholder='Your email'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type='password'
                            placeholder='Your password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    disabled={isLoading}
                    type='submit'
                    size='lg'
                    className='w-full'
                  >
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
              </Form>

              <div className='flex items-center justify-end my-2'>
                <p>Don&apos;t have an account?</p>
                <Button variant='link' asChild={true}>
                  <Link to='/auth/register'>Register</Link>
                </Button>
              </div>

              <ForgotPasswordDialog />
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
