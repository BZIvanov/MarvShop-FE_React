import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useDispatch } from '@/store/store';
import { useForgotPasswordMutation } from '@/store/services/users';
import { showNotification } from '@/store/features/notification/notificationSlice';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/common/buttons/SubmitButton';
import { resolver } from './forgot-password-form-schema';

const ForgotPasswordDialog = () => {
  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm({
    resolver,
    defaultValues: {
      email: '',
    },
  });

  const [forgotPassword, { data, isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const onSubmit = (values) => {
    forgotPassword(values);
    setIsDialogOpen(false);
    form.reset();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showNotification({
          type: 'success',
          message: data?.message,
        })
      );
    }
  }, [dispatch, isSuccess, data?.message]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild={true}>
        <div className='flex justify-end my-2'>
          <Button variant='ghost'>Forgot your password?</Button>
        </div>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogDescription>
            Please enter your email address to receive a password reset link.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <div className='flex flex-col gap-2'>
                  <FormItem className='flex items-center gap-2'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='Your email'
                        {...field}
                        style={{ marginTop: 0 }}
                      />
                    </FormControl>
                  </FormItem>
                  <FormMessage />
                </div>
              )}
            />
            <DialogFooter className='mt-2'>
              <SubmitButton size='sm' isLoading={isLoading}>
                Send Reset Link
              </SubmitButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
