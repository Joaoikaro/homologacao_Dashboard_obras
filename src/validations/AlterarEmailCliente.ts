import { z } from 'zod'

export const AlterarEmailClienteSchema = z.object({
  email: z.string().email('Email inválido'),
  confirmEmail: z.string().email('Email inválido'),
})

export type AlterarEmailClienteForm = z.infer<typeof AlterarEmailClienteSchema>
