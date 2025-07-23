/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'

import { Modal, CircularProgress } from '@mui/material'

import { useClientesStore } from '@/store/clientes'
import { useLoading } from '@/store/loading'
import { useAuthStore } from '@/store/useAuthStore'
import TableMax from '@/@core/components/table2'
import { useClientes } from '@/hooks/useClientes'
import { getColumns } from '../../helpers/columnsClientes'
import { useFilteredClientes } from '@/hooks/useFilteredClientes'
import type { ClientesGeral } from '@/types/clientes'

const ClientesTable = () => {
  const { setClientes, setClienteClicado, setOpenEditarModal } = useClientesStore()
  const { signOut } = useAuthStore()
  const { loading } = useLoading()

  const { getAllClientes } = useClientes()
  const filteredRows = useFilteredClientes()

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

      const response = await getAllClientes.refetch()

      if (response?.data) {
        setClientes(response.data)
      }
    }

    fetchData()
  }, [timer])

  const handleEditClick = (row: ClientesGeral) => {
    setClienteClicado(row)
    setOpenEditarModal(true)
  }

  return (
    <>
      <Modal open={loading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size={100} />
      </Modal>

      <TableMax
        rows={filteredRows}
        columns={getColumns(handleEditClick)}
        getRowId={row => row.IdCliente}
        isloading={loading}
        minHeight={45}
        maxHeight={500}
      />
    </>
  )
}

export default ClientesTable
