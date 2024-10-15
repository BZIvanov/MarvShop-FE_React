import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useRegisterMutation } from '@/store/services/users';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import TextField from '@/components/form/TextField';
import PasswordField from '@/components/form/PasswordField';
import CheckboxField from '@/components/form/CheckboxField';
import SubmitButton from '@/components/common/buttons/SubmitButton';
import { resolver } from './register-form-schema';
import AuthFormBanner from './AuthFormBanner';

const Register = () => {
  const form = useForm({
    resolver,
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

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-4'
                >
                  <TextField
                    control={form.control}
                    name='username'
                    label='Username'
                    placeholder='Your username'
                  />

                  <TextField
                    control={form.control}
                    name='email'
                    type='email'
                    label='Email'
                    placeholder='Your email'
                  />

                  <PasswordField
                    control={form.control}
                    name='password'
                    label='Password'
                    placeholder='Your password'
                  />

                  <CheckboxField
                    control={form.control}
                    name='isSeller'
                    label='Register as seller?'
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

            <AuthFormBanner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
