'use server';

import { Columns, DbTables } from '@/lib/supabase/constants';
import { createServerClient } from '@/lib/supabase/create-server-client';

export interface TableData {
  name: string;
}

export async function getTableData(
  tableName: string,
): Promise<TableData | null> {
  const supabase = createServerClient();

  const columns = Columns[DbTables.TABLES];
  const { error, data } = await supabase
    .from(DbTables.TABLES)
    .select('name')
    .eq(columns.name, tableName);
  if (error) {
    console.error(
      `Error checking for existing table ${tableName}:`,
      error.message,
    );
    return null;
  }
  return data && data.length === 1 ? { name: data[0].name } : null;
}
