import { z } from 'zod'

export const loginSchema = z.object({
  Nome: z.string().nonempty('Nome é obrigatório!'),
  Senha: z.string().nonempty('Senha é obrigatória!')
})

export type LoginSchema = z.infer<typeof loginSchema>
