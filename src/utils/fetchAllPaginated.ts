import type { PaginatedResponse, PaginationParams } from '@/types/common/pagination'

export async function fetchAllPaginated<T>(
  fetchFn: (params: PaginationParams) => Promise<PaginatedResponse<T>>,
  baseParams: Partial<PaginationParams> = {},
): Promise<T[]> {
  const pageSize = baseParams.pageSize ?? 100
  let pageNumber = 1
  let totalPages = 1
  const all: T[] = []

  do {
    const resp = await fetchFn({
      ...baseParams,
      pageNumber,
      pageSize,
    } as PaginationParams)

    all.push(...resp.rows)
    totalPages = resp.totalPages
    pageNumber += 1
  } while (pageNumber <= totalPages)

  return all
}
