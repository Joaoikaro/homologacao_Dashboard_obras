import type { AxiosResponseHeaders } from 'axios'

import type { PaginationData, PaginationHeadersResponse } from '@/types/common/pagination'

export function parsePaginationHeaders(headers: AxiosResponseHeaders): PaginationData {
  const headersPagination: PaginationHeadersResponse = JSON.parse(headers.pagination)

  return {
    totalPages: headersPagination.total_Pagina,
    totalItems: headersPagination.total_Itens,
  }
}
