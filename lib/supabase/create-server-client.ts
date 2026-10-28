import 'server-only';

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/database.types';

// NOTE: Uses the service role key, which bypasses row level security.
// Only use this in server actions/components that validate their input.
export const createServerClient = async (): Promise<
  SupabaseClient<Database>
> => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
    { auth: { persistSession: false } },
  );
};
