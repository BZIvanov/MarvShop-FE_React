import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import PasswordField from '@/components/form/PasswordField';
import SubmitButton from '@/components/common/buttons/SubmitButton';
import { resolver } from './change-password-schema';

const BuyerProfile = () => {
  const form = useForm({
    resolver,
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = (values) => {
    console.log(values);

    form.reset();
  };

  return (
    <div className='m-7 p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]'>
      <h2 className='text-[#000000] font-semibold text-lg mb-3'>
        Change Password
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PasswordField
            control={form.control}
            name='oldPassword'
            label='Old Password'
            placeholder='Old password'
          />

          <PasswordField
            control={form.control}
            name='newPassword'
            label='New Password'
            placeholder='New password'
          />

          <PasswordField
            control={form.control}
            name='confirmNewPassword'
            label='Confirm New Password'
            placeholder='Confirm new password'
          />

          <div className='mt-2'>
            <SubmitButton isLoading={false}>Update Password</SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BuyerProfile;
