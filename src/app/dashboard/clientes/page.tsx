import { ReactQueryProvider } from '@/providers/ReactProvider'
import ClientesTable from '../components/table/TableClientes'
import FiltrosClientes from '../components/filters/cards/FiltrosClientes'
import ModalFormClientes from '../components/modalForm/modalFormClientes'

export default function Page() {
  return (
    <ReactQueryProvider>
      <FiltrosClientes />
      <ClientesTable />
      <ModalFormClientes />
    </ReactQueryProvider>
  )
}
