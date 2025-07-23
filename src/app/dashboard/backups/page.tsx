import { ReactQueryProvider } from '@/providers/ReactProvider'
import BackupsTable from '../components/table/TableBackups'
import FiltrosTipoTarefa from '../components/filters/subCard/FiltroTipoTarefa'
import FiltrosAtrasos from '../components/filters/cards/FiltroAtrasos'
import ModalNaoEnviar from '../components/modalForm/modalNaoEnviar'

export default function Page() {
  return (
    <ReactQueryProvider>
      <FiltrosAtrasos />
      <FiltrosTipoTarefa />
      <BackupsTable />
      <ModalNaoEnviar />
    </ReactQueryProvider>
  )
}
