'use server';

import { Columns, DbTables } from '@/lib/supabase/constants';
import { createServerClient } from '@/lib/supabase/create-server-client';

// TODO: generate type from database schema
export interface TableState {
  values: string[];
  revealed: boolean;
  image_index: number;
}

export async function getTableState(
  tableName: string,
): Promise<TableState | null> {
  const supabase = createServerClient();

  const columns = Columns[DbTables.TABLES];
  const { error, data } = await supabase
    .from(DbTables.TABLES)
    .select('values, revealed, image_index')
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
