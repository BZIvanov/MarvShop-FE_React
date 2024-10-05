import { useEffect, useState } from 'react';

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
import { Label } from '@/components/ui/label';
import { useDispatch } from '@/store/store';
import { useForgotPasswordMutation } from '@/store/services/users';
import { showNotification } from '@/store/features/notification/notificationSlice';

const ForgotPasswordDialog = () => {
  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState('');

  const [forgotPassword, { data, isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!email) {
      return;
    }

    forgotPassword({ email });
    setEmail('');
    setIsDialogOpen(false);
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
        <form onSubmit={handleFormSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='email' className='text-right'>
                Email
              </Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                id='email'
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' disabled={isLoading}>
              Send Reset Link
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
