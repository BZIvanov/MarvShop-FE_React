import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useRegisterMutation } from '@/store/services/users';
import SubmitButton from '@/components/common/buttons/SubmitButton';

const formSchema = z.object({
  username: z.string().min(3, { message: 'Must be 3 or more characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Must be 8 or more characters long' }),
  isSeller: z.boolean().default(false).optional(),
});

const Register = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      isSeller: false,
    },
  });

  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit = (values) => {
    const { username, email, password, isSeller } = values;
    register({
      username,
      email,
      password,
      role: isSeller ? 'seller' : 'buyer',
    });
  };

  return (
    <div>
      <div className='bg-slate-200 mt-4'>
        <div className='w-full justify-center items-center p-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 w-[95%] xl:w-[60%] mx-auto bg-white rounded-md'>
            <div className='w-full px-8 py-8'>
              <h2 className='text-center w-full text-xl font-bold mb-3'>
                Register your account
              </h2>

              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'
                  >
                    <FormField
                      control={form.control}
                      name='username'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              type='text'
                              placeholder='Your username'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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

                    <FormField
                      control={form.control}
                      name='isSeller'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Register as seller?</FormLabel>
                        </FormItem>
                      )}
                    />

                    <SubmitButton isLoading={isLoading} className='w-full'>
                      Register
                    </SubmitButton>
                  </form>
                </Form>

                <div className='flex items-center justify-end my-2'>
                  <p>Already have an account?</p>
                  <Button variant='link' asChild={true}>
                    <Link to='/auth/login'>Login</Link>
                  </Button>
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
    </div>
  );
};

export default Register;
