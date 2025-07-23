import type { DefaultDataType } from '../defaultDataType'

export interface Pagination<T = DefaultDataType> {
  pageNumber: number
  pageSize: number
  sortBy?: string
  sortOrderDesc?: boolean
  search?: {
    inColumns: string[]
    value: string
  }
  appliedFilters?: T
}

export interface PaginationQueryParams {
  page: string
  pageSize: string
  sortBy?: string
  sortOrderDesc?: string
  search?: string | string[]
  searchValue?: string
}

export type PaginationParams<T = DefaultDataType> = Pagination<T> & Partial<T>

export interface PaginationResponse {
  page_number: number
  page_size: number
  sort_by?: string
  sort_order_desc?: boolean
  search?: string[]
  search_value?: string
}

export type PaginationResponseParams<T = DefaultDataType> = PaginationResponse & Partial<T>

export interface PaginationHeadersResponse {
  itens_Por_Pagina: number
  pagina_Atual: number
  total_Itens: number
  total_Pagina: number
}

export interface PaginationData {
  totalPages: number
  totalItems: number
}

export interface PaginatedResponse<T> extends PaginationData {
  rows: T[]
}
