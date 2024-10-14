import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { useLoginMutation } from '@/store/services/users';
import SubmitButton from '@/components/common/buttons/SubmitButton';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Must be 8 or more characters long' })
    .max(30, { message: 'Must be 30 or fewer characters long' })
    .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter' })
    .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
    .regex(/\d/, { message: 'Must contain at least one digit' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message:
        'Must contain at least one special character (!@#$%^&*(),.?":{}|<>)',
    }),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '1Q2w3E$R',
    },
  });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = (values) => {
    login(values);
  };

  return (
    <div>
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
                          <div className='relative'>
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder='Your password'
                              {...field}
                              className='pr-10'
                            />
                            <button
                              type='button'
                              onClick={() =>
                                setShowPassword((prevState) => !prevState)
                              }
                              className='absolute inset-y-0 right-0 flex items-center px-2'
                            >
                              {showPassword ? (
                                <EyeOff className='h-5 w-5' />
                              ) : (
                                <Eye className='h-5 w-5' />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <SubmitButton isLoading={isLoading} className='w-full'>
                    Login
                  </SubmitButton>
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
    </div>
  );
};

export default Login;
