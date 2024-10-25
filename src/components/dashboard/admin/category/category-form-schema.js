import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const categoryFormSchema = z.object({
  categoryName: z.string().min(1, { message: 'Category name is required' }),
  categoryImage: z
    .array(z.instanceof(File))
    .nonempty('An image is required')
    .refine((files) => files.length > 0 && files[0].type.startsWith('image/'), {
      message: 'The selected file must be an image',
    }),
});

export const resolver = zodResolver(categoryFormSchema);
