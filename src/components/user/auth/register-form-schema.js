import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  usernameSchema,
  emailSchema,
  passwordSchema,
  isSellerSchema,
} from './form-field-schemas';

export const registerFormSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  isSeller: isSellerSchema,
});

export const resolver = zodResolver(registerFormSchema);
