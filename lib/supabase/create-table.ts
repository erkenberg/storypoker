'use server';

// used as server action by the creation form
import { createClient } from '@supabase/supabase-js';
import { Columns, DbTables } from '@/lib/supabase/constants';

interface CreateTableResult {
  ok: boolean;
  tableName: string;
  error?: string;
}

interface CreateTableArgs {
  tableName: string;
}

export async function createTable({
  tableName,
}: CreateTableArgs): Promise<CreateTableResult> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
    { auth: { persistSession: false } },
  );

  const columns = Columns[DbTables.TABLES];
  const { count, error: countError } = await supabase
    .from(DbTables.TABLES)
    .select('*', { count: 'exact', head: true })
    .eq(columns.name, tableName);

  if (countError) {
    console.error(
      `Error checking for existing table ${tableName}:`,
      countError.message,
    );
    return {
      ok: false,
      tableName,
      error: `Error creating table ${tableName}.`,
    };
  }

  if (count && count > 0) {
    return {
      ok: false,
      tableName,
      error: `Table ${tableName} already exists!`,
    };
  }

  const { error: insertError } = await supabase
    .from(DbTables.TABLES)
    .insert({ [columns.name]: tableName, [columns.values]: [] }); // TODO: allow user to set values

  if (insertError) {
    console.error(`Error creating table ${tableName}:`, insertError.message);
    return {
      ok: false,
      tableName,
      error: `Error creating table ${tableName}.`,
    };
  }

  return { ok: true, tableName };
}
