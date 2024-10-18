import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const forgotPasswordFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export const resolver = zodResolver(forgotPasswordFormSchema);
