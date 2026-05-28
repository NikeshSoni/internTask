// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// // This client is safe for use in the browser/Client Components
// export const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey);

// // Use this function ONLY in Server Components or API routes
// export const getAdminClient = () => {
//   const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
//   if (!serviceKey) throw new Error("Admin key is missing (Server-side only)");
//   return createClient(supabaseUrl, serviceKey);
// };





// lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy singleton — only created when first called, not at module evaluation
let _browserClient: SupabaseClient | null = null;

export const supabaseAdmin = {
  // Proxy every property access to the lazily-created client
  get auth() { return getBrowserClient().auth; },
  from: (...args: Parameters<SupabaseClient['from']>) => getBrowserClient().from(...args),
};

function getBrowserClient() {
  if (_browserClient) return _browserClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Supabase env vars are missing. Check your .env.local and Vercel/hosting environment variables.');
  }

  _browserClient = createClient(url, key);
  return _browserClient;
}

// Server-side only
export const getAdminClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) throw new Error('Admin key is missing (Server-side only)');
  return createClient(url, serviceKey);
};

