import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { emailSchema, passwordSchema } from './form-field-schemas';

const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const resolver = zodResolver(loginFormSchema);
