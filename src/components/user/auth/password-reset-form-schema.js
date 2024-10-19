import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { passwordSchema } from './form-field-schemas';

const forgotPasswordFormSchema = z
  .object({
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords should match',
    path: ['confirmNewPassword'],
  });

export const resolver = zodResolver(forgotPasswordFormSchema);
