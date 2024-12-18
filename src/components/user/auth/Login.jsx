import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useLoginMutation } from '@/store/services/users';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import SubmitButton from '@/components/common/buttons/SubmitButton';
import TextField from '@/components/form/TextField';
import PasswordField from '@/components/form/PasswordField';
import { resolver } from './login-form-schema';
import ForgotPasswordDialog from './ForgotPasswordDialog';
import AuthFormBanner from './AuthFormBanner';

const Login = () => {
  const form = useForm({
    resolver,
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

          <AuthFormBanner />
        </div>
      </div>
    </div>
  );
};

export default Login;
