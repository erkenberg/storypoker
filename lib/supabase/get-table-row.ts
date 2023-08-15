'use server';

import { Columns, DbTables } from '@/lib/supabase/constants';
import { createServerClient } from '@/lib/supabase/create-server-client';

// TODO: generate type from database schema
export interface TableRow {
  values: string[];
  revealed: boolean;
}

export async function getTableRow(tableName: string): Promise<TableRow | null> {
  const supabase = createServerClient();

  const columns = Columns[DbTables.TABLES];
  const { error, data } = await supabase
    .from(DbTables.TABLES)
    .select('values, revealed')
    .eq(columns.name, tableName);
  if (error) {
    console.error(
      `Error checking for existing table ${tableName}:`,
      error.message,
    );
    return null;
  }
  return data && data.length === 1 ? data[0] : null;
}
