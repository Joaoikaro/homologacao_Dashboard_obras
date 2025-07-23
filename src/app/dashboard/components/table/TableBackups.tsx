/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'

import { Modal, CircularProgress } from '@mui/material'

import { useBackupClientes } from '@/store/backups'
import { useBackupCliente } from '@/hooks/useBackupCliente'
import { useFilteredBackups } from '@/hooks/useFilteredBackups'
import { useLoading } from '@/store/loading'
import { useAuthStore } from '@/store/useAuthStore'

import TableMax from '@/@core/components/table2'
import { getColumns } from '../../helpers/columnsBackups'
import type { BackupClientesGeral } from '@/types/backups'

const BackupsTable = () => {
  const { setOpenNaoEnviarModal, setBackupClicado, setBackupClientes, setBackupsTotais } = useBackupClientes()

  const { signOut } = useAuthStore()
  const { loading } = useLoading()

  const { getAllBackups, getAllTotais } = useBackupCliente()
  const filteredRows = useFilteredBackups()

  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const userLogado = localStorage.getItem('usuario')

      if (!userLogado) {
        await signOut()
        window.location.href = '/login'

        return
      }

      const [backupsResponse, totaisResponse] = await Promise.all([getAllBackups.refetch(), getAllTotais.refetch()])

      if (backupsResponse?.data && totaisResponse?.data) {
        setBackupClientes(backupsResponse.data)
        setBackupsTotais(totaisResponse.data)
      }
    }

    fetchData()
  }, [timer])

  const handleDeleteClick = (row: BackupClientesGeral) => {
    setBackupClicado(row)
    setOpenNaoEnviarModal(true)
  }

  return (
    <>
      <Modal open={loading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size={100} />
      </Modal>

      <TableMax
        getRowId={row => row.Id}
        columns={getColumns(handleDeleteClick)}
        rows={filteredRows}
        isloading={loading}
        minHeight={45}
        maxHeight={500}
      />
    </>
  )
}

export default BackupsTable
