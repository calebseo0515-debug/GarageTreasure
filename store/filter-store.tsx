import React, { createContext, useContext, useState } from 'react';

export type FilterState = {
  distance: number;
  date: string;
  categories: string[];
};

export type FilterContextType = {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
};

const defaultFilters: FilterState = {
  distance: 6,
  date: 'This Weekend',
  categories: [],
};

export const FilterContext = createContext<FilterContextType>({
  filters: defaultFilters,
  setFilters: () => {},
});

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  return useContext(FilterContext);
}
