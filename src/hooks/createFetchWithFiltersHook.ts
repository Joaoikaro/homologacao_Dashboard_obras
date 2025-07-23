/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

import { createStore, useStore } from 'zustand'

type HookOptions<TData, TFilters> = {
  fetcher: (filters: TFilters) => Promise<TData>
  initialFilters: TFilters
}

export const createFetchWithFiltersHook = <TData, TFilters extends Record<string, any>>(options: HookOptions<TData, TFilters>) => {
  const store = createStore<{
    data: TData | null
    isLoading: boolean
    filters: TFilters
    isHydrated: boolean
    setState: (updater: Partial<{
      data: TData | null
      isLoading: boolean
      filters: TFilters
      isHydrated: boolean
    }>) => void
  }>((set) => ({
    data: null,
    isLoading: false,
    filters: options.initialFilters,
    isHydrated: false,
    setState: (updater) =>
      set((prev) => ({
        ...prev,
        ...updater,
      })),
  }))

  const useFetchWithFilters = () => {
    const state = useStore(store)

    const fetchData = async () => {
      state.setState({ isLoading: true })

      try {
        const response = await options.fetcher(state.filters)

        state.setState({ data: response })
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        state.setState({ isLoading: false })
      }
    }

    useEffect(() => {
      if (!state.isHydrated) return
      fetchData()
    }, [JSON.stringify(state.filters), state.isHydrated])

    return {
      ...state,
      setFilters: (filters: TFilters) => {
        state.setState({ filters, isHydrated: true })
      },
      refetch: fetchData,
    }
  }

  return useFetchWithFilters
}
