'use client'

import { useEffect, useState } from 'react'

import type { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Modal, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'

import TextFieldMax from '@/@core/components/textFieldMax'
import { useLoading } from '@/store/loading'
import { useClientes } from '@/hooks/useClientes'
import { AlterarEmailClienteSchema } from '@/validations/AlterarEmailCliente'
import { useClientesStore } from '@/store/clientes'

type AlterarEmailClienteForm = z.infer<typeof AlterarEmailClienteSchema>

const ModalFormClientes = () => {
  const { openEditarModal, setOpenEditarModal, clienteClicado, setClientes } = useClientesStore()
  const { setLoading } = useLoading()
  const { enqueueSnackbar } = useSnackbar()
  const { putAtualizarEmail, getAllClientes } = useClientes()

  const [, setErrorForm] = useState({
    mensage: '',
    active: false
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AlterarEmailClienteForm>({
    defaultValues: {
      email: clienteClicado.Email,
      confirmEmail: ''
    },
    resolver: zodResolver(AlterarEmailClienteSchema)
  })

  useEffect(() => {
    if (clienteClicado?.Email) {
      reset({
        email: clienteClicado.Email,
        confirmEmail: ''
      })
    }
  }, [clienteClicado, reset])

  const onClose = () => {
    setOpenEditarModal(false)
    setErrorForm({ mensage: '', active: false })
  }

  const onSubmit = async ({ confirmEmail }: AlterarEmailClienteForm) => {
    setLoading(true)

    try {
      await putAtualizarEmail.mutateAsync({ Id: clienteClicado.IdCliente, Email: confirmEmail })

      const { data: clientesData } = await getAllClientes.refetch()

      if (clientesData) {
        await setClientes(clientesData)
        reset({
          email: clienteClicado.Email,
          confirmEmail: ''
        })
        onClose()

        enqueueSnackbar('Email atualizado com sucesso!', { variant: 'success' })
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error)
      setErrorForm({ mensage: 'Erro ao se conectar', active: true })

      enqueueSnackbar('Erro ao atualizar o email', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={openEditarModal} onClose={onClose}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%'
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--mui-palette-background-default)',
            padding: '16px',
            width: '25%',
            height: 'auto',
            minWidth: '300px',
            minHeight: '100px',
            borderRadius: '8px',
            boxShadow: '1px 2px 8px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography variant='h5'>Alterar Email</Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ gap: '8px', display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <TextFieldMax
                control={control}
                name='email'
                label='Email Atual'
                error={!!errors.email}
                disabled={true}
                helperText={errors.email?.message}
              />
              <TextFieldMax
                control={control}
                name='confirmEmail'
                label='Novo Email'
                error={!!errors.confirmEmail}
                helperText={errors.confirmEmail?.message}
              />
              <div
                style={{
                  marginTop: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Button fullWidth variant='contained' type='submit'>
                  Confirmar
                </Button>
                <Button fullWidth variant='contained' color='error' onClick={onClose}>
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalFormClientes
