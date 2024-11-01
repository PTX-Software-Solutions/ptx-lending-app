import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, { message: 'Email is required' })
    .email('Email is invalid'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, { message: 'Password is required' })
})

export type LoginType = z.infer<typeof loginSchema>
