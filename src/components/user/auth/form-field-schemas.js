import { z } from 'zod';

export const usernameSchema = z
  .string()
  .min(3, { message: 'Must be 3 or more characters long' })
  .max(30, { message: 'Must be 30 or fewer characters long' });

export const emailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export const passwordSchema = z
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

export const isSellerSchema = z.boolean().default(false).optional();
