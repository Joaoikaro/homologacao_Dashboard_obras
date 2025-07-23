/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

import { createStore, useStore } from 'zustand'

import type { TableState } from '@/store/dynamicTableStore'


type HookOptions<T> = {
  defaultSortBy?: keyof T
  fetcher: (params: {
    page: number
    pageSize: number
    sortBy: keyof T
    sortDesc: boolean
    searchTerm?: string
    filters?: Record<string, any>
  }) => Promise<{
    rows: T[]
    totalItems: number
    totalPages: number
  }>
}

export const createDynamicTableHook = <T>(options: HookOptions<T>) => {
  const store = createStore<TableState<T>>((set) => ({
    data: [],
    totalItems: 0,
    totalPages: 1,
    page: 1,
    pageSize: 10,
    sortBy: options.defaultSortBy || ('' as keyof T),
    sortDesc: false,
    searchTerm: '',
    filters: {},
    isHydrated: false,
    isLoading: false,
    setState: (updater: Partial<TableState<T>> | ((prev: TableState<T>) => Partial<TableState<T>>)) =>
      set((prev: TableState<T>) =>
        typeof updater === 'function'
          ? { ...prev, ...(updater(prev) || {}) }
          : { ...prev, ...(typeof updater === 'object' && updater !== null ? updater : {}) },
      ),

    setFilters: (newFilters: any) =>
      set((prev: any) => ({
        ...prev,
        filters: newFilters,
        page: 1,
        isHydrated: true,
      })),
  }))

  const useDynamicTable = () => {
    const state = useStore(store)

    const fetchData = async () => {
      state.setState({ isLoading: true })

      try {
        const response = await options.fetcher({
          page: state.page,
          pageSize: state.pageSize,
          sortBy: state.sortBy,
          sortDesc: state.sortDesc,
          searchTerm: state.searchTerm,
          filters: state.filters,
        })

        state.setState({
          data: response.rows,
          totalItems: response.totalItems,
          totalPages: response.totalPages,
        })
      } catch (err) {
        console.error('Erro ao buscar dados da tabela:', err)
      } finally {
        state.setState({ isLoading: false })
      }
    }

    useEffect(() => {
      if (!state.isHydrated) {
        return
      }

      fetchData()
    }, [
      state.page,
      state.pageSize,
      state.sortBy,
      state.sortDesc,
      state.searchTerm,
      JSON.stringify(state.filters),
      state.isHydrated,
    ])

    return {
      ...state,
      setFilters: (filters: Record<string, any>) => {
        state.setState(() => ({
          filters,
          page: 1,
          isHydrated: true,
        }))
      },
      setState: state.setState,
      refetch: fetchData,
    }
  }

  return useDynamicTable
}
