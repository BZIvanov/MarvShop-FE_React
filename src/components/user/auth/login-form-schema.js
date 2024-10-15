import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Must be 8 or more characters long' })
    .max(30, { message: 'Must be 30 or fewer characters long' })
    .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter' })
    .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
    .regex(/\d/, { message: 'Must contain at least one digit' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message:
        'Must contain at least one special character (!@#$%^&*(),.?":{}|<>)',
    }),
});

export const resolver = zodResolver(loginFormSchema);
