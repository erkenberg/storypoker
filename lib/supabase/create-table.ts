'use server';

// used as server action by the creation form
import { Columns, DbTables } from '@/lib/supabase/constants';
import { createServerClient } from '@/lib/supabase/create-server-client';

interface CreateTableResult {
  ok: boolean;
  tableName: string;
  error?: string;
}

interface CreateTableArgs {
  tableName: string;
  values: string[];
}

export async function createTable({
  tableName,
  values,
}: CreateTableArgs): Promise<CreateTableResult> {
  const supabase = createServerClient();

  const columns = Columns[DbTables.TABLES];
  const { count, error: countError } = await supabase
    .from(DbTables.TABLES)
    .select('name', { count: 'estimated' })
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
    .insert({ [columns.name]: tableName, [columns.values]: values });

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
