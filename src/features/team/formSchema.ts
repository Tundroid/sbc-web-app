import { z } from 'zod';

export const newMemberSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone number is required'),
  status: z.string().min(1, 'Status is required'),
  gender: z.enum(['Male', 'Female']).refine(val => !!val, { message: 'Gender is required' }),
  image: z.any().optional(), // or z.instanceof(File).optional()
});

export type NewMemberFormData = z.infer<typeof newMemberSchema>;
