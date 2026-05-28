import { createClient } from '@supabase/supabase-js';

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


// import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing");
}

if (!supabaseAnonKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is missing");
}

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseAnonKey
);