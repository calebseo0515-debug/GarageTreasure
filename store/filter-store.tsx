import React, { createContext, useContext, useState } from 'react';

export type SaleTypeFilter = '' | 'estate' | 'garage' | 'moving' | 'yard';
export type DateFilter = 'This Weekend' | 'Today' | 'This Week' | 'All';

export type FilterState = {
  distance: number;
  date: DateFilter;
  categories: string[];
  saleType: SaleTypeFilter;
};

export type FilterContextType = {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
};

const defaultFilters: FilterState = {
  distance: 25,
  date: 'All',
  categories: [],
  saleType: '',
};

export const FilterContext = createContext<FilterContextType>({
  filters: defaultFilters,
  setFilters: () => {},
  updateFilter: () => {},
});

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  return useContext(FilterContext);
}

function formatLocalDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getWeekendDates(): { start: string; end: string } {
  const now = new Date();
  const day = now.getDay();
  const sat = new Date(now);

  if (day === 0) {
    sat.setDate(now.getDate() - 1);
  } else if (day !== 6) {
    sat.setDate(now.getDate() + ((6 - day + 7) % 7));
  }

  const sun = new Date(sat);
  sun.setDate(sat.getDate() + 1);

  return { start: formatLocalDate(sat), end: formatLocalDate(sun) };
}

export function getTodayDate(): string {
  return formatLocalDate(new Date());
}
