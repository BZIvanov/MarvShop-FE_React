import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useResetPasswordMutation } from '@/store/services/users';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import SubmitButton from '@/components/common/buttons/SubmitButton';
import PasswordField from '@/components/form/PasswordField';
import { resolver } from './password-reset-form-schema';
import AuthFormBanner from './AuthFormBanner';

const PasswordReset = () => {
  const navigate = useNavigate();

  const { token } = useParams();

  const form = useForm({
    resolver,
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();

  const onSubmit = (values) => {
    resetPassword({ ...values, token });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/auth/login');
    }
  }, [isSuccess, navigate]);

  return (
    <div className='bg-slate-200 mt-4'>
      <div className='w-full justify-center items-center p-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 w-[95%] xl:w-[60%] mx-auto bg-white rounded-md'>
          <div className='w-full px-8 py-8'>
            <h2 className='text-center w-full text-xl font-bold mb-3'>
              Password Reset Form
            </h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <PasswordField
                  control={form.control}
                  name='newPassword'
                  label='New Password'
                />

                <PasswordField
                  control={form.control}
                  name='confirmNewPassword'
                  label='Confirm New Password'
                />

                <SubmitButton isLoading={isLoading} className='w-full'>
                  Reset Password
                </SubmitButton>

                <div className='flex justify-center items-center'>
                  <Button
                    disabled={isLoading}
                    type='button'
                    onClick={() => form.reset()}
                    variant='ghost'
                  >
                    Reset Form
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <AuthFormBanner />
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
