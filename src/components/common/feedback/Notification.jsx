import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

import { useSelector, useDispatch } from '@/store/store';
import {
  selectNotification,
  hideNotification,
} from '@/store/features/notification/notificationSlice';

const Notification = () => {
  const dispatch = useDispatch();

  const { toast } = useToast();

  const { type, message } = useSelector(selectNotification);

  useEffect(() => {
    if (type && message) {
      toast({
        variant: type || 'default',
        description: message,
      });
    }

    dispatch(hideNotification());
  }, [dispatch, toast, type, message]);

  return null;
};

export default Notification;
