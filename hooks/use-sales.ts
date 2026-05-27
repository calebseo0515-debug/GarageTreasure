import { useEffect, useState } from 'react';
import { Sale, supabaseHeaders, supabaseUrl } from '../lib/supabase';
import { FilterState, getWeekendDates, getTodayDate } from '../store/filter-store';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...supabaseHeaders,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

function buildSalesQuery(filters?: Partial<FilterState>): string {
  const today = getTodayDate();
  let query = `${supabaseUrl}/rest/v1/sales?status=eq.active&end_date=gte.${today}&select=*`;

  // 날짜 필터
  if (filters?.date === 'This Weekend') {
    const { start, end } = getWeekendDates();
    query += `&start_date=lte.${end}&end_date=gte.${start}`;
  } else if (filters?.date === 'Today') {
    query += `&start_date=lte.${today}&end_date=gte.${today}`;
  }

  // 세일 타입 필터
  if (filters?.saleType) {
    query += `&sale_type=eq.${filters.saleType}`;
  }

  query += '&order=start_date.asc';
  return query;
}

export function useSales(filters?: Partial<FilterState>) {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSales();
  }, [filters?.date, filters?.saleType]);

  async function fetchSales() {
    try {
      setLoading(true);
      const data = await fetchJson<Sale[]>(buildSalesQuery(filters));
      setSales(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { sales, loading, error, refetch: fetchSales };
}

export function useNearbySales(
  latitude: number,
  longitude: number,
  radiusMiles = 25,
  filters?: Partial<FilterState>
) {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNearbySales();
  }, [latitude, longitude, radiusMiles, filters?.date, filters?.saleType]);

  async function fetchNearbySales() {
    try {
      setLoading(true);

      // 날짜 필터 계산
      let startDate: string | undefined;
      let endDate: string | undefined;

      if (filters?.date === 'This Weekend') {
        const dates = getWeekendDates();
        startDate = dates.start;
        endDate = dates.end;
      } else if (filters?.date === 'Today') {
        startDate = getTodayDate();
        endDate = getTodayDate();
      }

      const data = await fetchJson<Sale[]>(`${supabaseUrl}/rest/v1/rpc/get_nearby_sales`, {
        method: 'POST',
        body: JSON.stringify({
          lat: latitude,
          lng: longitude,
          radius_miles: radiusMiles,
        }),
      });

      // 클라이언트 사이드 필터링
      let filtered = data.filter(s => s.end_date >= getTodayDate());

      if (startDate && endDate) {
        filtered = filtered.filter(s =>
          s.start_date <= endDate! && s.end_date >= startDate!
        );
      }

      if (filters?.saleType) {
        filtered = filtered.filter(s => s.sale_type === filters.saleType);
      }

      setSales(filtered);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      try {
        const fallback = await fetchJson<Sale[]>(buildSalesQuery(filters));
        setSales(fallback);
      } catch {
        setSales([]);
      }
    } finally {
      setLoading(false);
    }
  }

  return { sales, loading, error, refetch: fetchNearbySales };
}

export function useSale(id?: string) {
  const [sale, setSale] = useState<Sale | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    fetchSale();
  }, [id]);

  async function fetchSale() {
    try {
      setLoading(true);
      const rows = await fetchJson<Sale[]>(
        `${supabaseUrl}/rest/v1/sales?id=eq.${id}&select=*`
      );
      setSale(rows[0] ?? null);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { sale, loading, error, refetch: fetchSale };
}
