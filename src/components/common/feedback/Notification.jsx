import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { useSelector, useDispatch } from '@/store/store';
import {
  selectNotification,
  hideNotification,
} from '@/store/features/notification/notificationSlice';

const Notification = () => {
  const dispatch = useDispatch();

  const { type, message } = useSelector(selectNotification);

  useEffect(() => {
    if (type && message) {
      toast[type](message);
    }

    dispatch(hideNotification());
  }, [dispatch, type, message]);

  return null;
};

export default Notification;
