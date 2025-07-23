import { create } from "zustand";


 interface FilterState {
  filterQuery: string;
  setFilterQuery: (query: string) => void;
 }

 export const useFilterState = create<FilterState>((set) => ({
   filterQuery: '',
  setFilterQuery: (filterQuery: string) => set(() => ({
    filterQuery,
   })),
 }))
