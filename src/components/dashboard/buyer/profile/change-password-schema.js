import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const passwordSchema = z
  .string()
  .min(8, { message: 'Must be 8 or more characters long' })
  .max(30, { message: 'Must be 30 or fewer characters long' })
  .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter' })
  .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
  .regex(/\d/, { message: 'Must contain at least one digit' })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, {
    message:
      'Must contain at least one special character (!@#$%^&*(),.?":{}|<>)',
  });

const changePasswordFormSchema = z
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords should match',
    path: ['confirmNewPassword'],
  });

export const resolver = zodResolver(changePasswordFormSchema);
