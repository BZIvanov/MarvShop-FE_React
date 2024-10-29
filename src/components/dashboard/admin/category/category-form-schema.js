import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const categoryFormSchema = z.object({
  categoryName: z.string().min(1, { message: 'Category name is required' }),
  categoryImage: z.union([
    z.instanceof(File).refine((file) => file.size > 0, 'Image is required'),
    z.string().url('Image is required').optional(),
  ]),
});

export const resolver = zodResolver(categoryFormSchema);
