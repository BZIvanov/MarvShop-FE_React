import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { emailSchema } from './form-field-schemas';

const forgotPasswordFormSchema = z.object({
  email: emailSchema,
});

export const resolver = zodResolver(forgotPasswordFormSchema);
