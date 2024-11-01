import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const productFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(30, { message: 'Must be 30 or fewer characters long' }),
  brand: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(30, { message: 'Must be 30 or fewer characters long' }),
  category: z.string().min(1, { message: 'Please select category' }),
  price: z
    .string()
    .min(0, { message: 'Must be positive number' })
    .max(100000, { message: 'Must be 100000 or lower' }),
  stock: z
    .string()
    .min(0, { message: 'Must be positive number' })
    .max(100000, { message: 'Must be 100000 or lower' }),
  discount: z
    .string()
    .min(0, { message: 'Must be positive number' })
    .max(100, { message: 'Must be 100 or lower' }),
  description: z
    .string()
    .min(10, {
      message: 'Must be at least 10 characters.',
    })
    .max(160, {
      message: 'Must not be longer than 1000 characters.',
    }),
});

export const resolver = zodResolver(productFormSchema);
