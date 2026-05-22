import { useEffect, useState } from 'react';
import { Sale, supabaseHeaders, supabaseUrl } from '../lib/supabase';

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

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSales();
  }, []);

  async function fetchSales() {
    try {
      setLoading(true);
      const data = await fetchJson<Sale[]>(
        `${supabaseUrl}/rest/v1/sales?status=eq.active&select=*&order=created_at.desc`
      );
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

export function useNearbySales(latitude: number, longitude: number, radiusMiles = 25) {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNearbySales();
  }, [latitude, longitude, radiusMiles]);

  async function fetchNearbySales() {
    try {
      setLoading(true);
      const data = await fetchJson<Sale[]>(`${supabaseUrl}/rest/v1/rpc/get_nearby_sales`, {
        method: 'POST',
        body: JSON.stringify({
          lat: latitude,
          lng: longitude,
          radius_miles: radiusMiles,
        }),
      });
      setSales(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      try {
        const fallback = await fetchJson<Sale[]>(
          `${supabaseUrl}/rest/v1/sales?status=eq.active&select=*&order=created_at.desc`
        );
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
