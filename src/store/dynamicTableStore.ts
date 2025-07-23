import { create } from 'zustand'

export type TableState<T> = {
  data: T[]
  totalItems: number
  totalPages: number
  page: number
  pageSize: number
  sortBy: keyof T
  sortDesc: boolean
  searchTerm: string
  filters: Record<string, any>
  isHydrated: boolean
  isLoading: boolean
  setState: (
    updater: Partial<TableState<T>> | ((prev: TableState<T>) => Partial<TableState<T>>),
  ) => void
  setFilters: (filters: Record<string, any>) => void
}

export const createDynamicTableStore = <T>() =>
  create<TableState<T>>((set) => ({
    data: [],
    totalItems: 0,
    totalPages: 1,
    page: 1,
    pageSize: 10,
    sortBy: '' as keyof T,
    sortDesc: false,
    searchTerm: '',
    filters: {},
    isHydrated: false,
    isLoading: false,
    setState: (updater) =>
      set((prev) =>
        typeof updater === 'function' ? { ...prev, ...updater(prev) } : { ...prev, ...updater },
      ),

    setFilters: (newFilters) =>
      set((prev) => ({
        ...prev,
        filters: newFilters,
        page: 1,
        isHydrated: true,
      })),
  }))
