'use client'

import { Button, Modal, Typography } from '@mui/material'

import { useSnackbar } from 'notistack'

import { useLoading } from '@/store/loading'
import { useBackupClientes } from '@/store/backups'
import { useBackupCliente } from '@/hooks/useBackupCliente'

const ModalNaoEnviar = () => {
  const { backupClicado, setOpenNaoEnviarModal, setBackupsTotais, setBackupClientes, openNaoEnviarModal } =
    useBackupClientes()

  const { putNaoEnviar, getAllBackups, getAllTotais } = useBackupCliente()
  const { setLoading } = useLoading()
  const { enqueueSnackbar } = useSnackbar()

  const onClose = () => {
    setLoading(false)
    setOpenNaoEnviarModal(false)
  }

  const onSubmit = async () => {
    setLoading(true)

    try {
      await putNaoEnviar.mutateAsync({ Id: backupClicado.Id })

      const [backupsResponse, totaisResponse] = await Promise.all([getAllBackups.refetch(), getAllTotais.refetch()])

      if (backupsResponse?.data && totaisResponse?.data) {
        setBackupClientes(backupsResponse.data)
        setBackupsTotais(totaisResponse.data)
        enqueueSnackbar('Tarefa desativada com sucesso!', { variant: 'success' })
        onClose()
      }
    } catch (error) {
      console.error('Erro ao desativar tarefa:', error)
      enqueueSnackbar('Erro ao desativar a tarefa.', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={openNaoEnviarModal} onClose={onClose}>
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
            <Typography variant='h5'>Você deseja realmente desativar essa tarefa?</Typography>
            <div>
              <Typography>Codigo: {backupClicado.Id}</Typography>
              <Typography>Tarefa: {backupClicado.NomeTarefa}</Typography>
            </div>
          </div>
          <div
            style={{ marginTop: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
          >
            <Button fullWidth variant='contained' type='submit' color='error' onClick={onSubmit}>
              Desativar
            </Button>
            <Button fullWidth variant='outlined' onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalNaoEnviar
