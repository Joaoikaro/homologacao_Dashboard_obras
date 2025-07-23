// Next Imports
import type { Metadata } from 'next'

import Sistemas from '@/views/Sistemas'

export const metadata: Metadata = {
  title: 'Sistemas',
  description: 'Selecione um sistema'
}

const SistemasPage = async () => {

  return <Sistemas />
}

export default SistemasPage
