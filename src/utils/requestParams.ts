
import qs from 'qs';

import type { PaginationParams } from '@/types/common/pagination'

import { mapFiltersToApi } from './mapFiltersToApi'
import { removePropertyEmpty } from './removePropertyEmpty'

export function buildPaginationQuery(
  params: PaginationParams,
  filterMapper?: Record<string, string>,
) {
  return removePropertyEmpty({
    page_number: params.pageNumber,
    page_size: params.pageSize,
    sort_by: params.sortBy,
    sort_order_desc: params.sortOrderDesc,
    search: params.search?.inColumns,
    search_value: params.search?.value,
    ...mapFiltersToApi(params.appliedFilters ?? {}, filterMapper ?? {}),
  })
}

export const defaultParamsSerializer = (params: any) =>
  qs.stringify(params, { arrayFormat: 'repeat' })
