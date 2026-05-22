export const supabaseUrl = 'https://crisavfoqfvrjrzqtcdl.supabase.co';

export const supabaseKey = 'sb_publishable_Ejm8seXoBRJyKJbxnad0UA_EBBVGXGV';

export const supabaseHeaders = {
  apikey: supabaseKey,
  Authorization: `Bearer ${supabaseKey}`,
  'Content-Type': 'application/json',
};

export type Sale = {
  id: string;
  title: string;
  description: string;
  sale_type: 'garage' | 'estate' | 'moving' | 'yard';
  status: 'pending' | 'active' | 'ended' | 'rejected';
  address: string;
  city: string;
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  categories: string[];
  view_count: number;
  source_url?: string | null;
  is_scraped?: boolean;
  created_at: string;
};
