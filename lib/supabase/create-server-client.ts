'use server';

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

export const createServerClient = (): SupabaseClient => {
  // we always need fresh data and cannot cache the results.
  // In client components we can use `export const revalidate = 0;`, but for e.g. server actions this doesn't work.
  // thus we revalidate the complete path whenever creating a server client.
  revalidatePath('/');
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
    { auth: { persistSession: false } },
  );
};
