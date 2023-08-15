'use server';

import { Columns, DbTables } from '@/lib/supabase/constants';
import { createServerClient } from '@/lib/supabase/create-server-client';

interface SetTableRevealedArgs {
  tableName: string;
  revealed: boolean;
}

export async function setTableRevealed({
  tableName,
  revealed,
}: SetTableRevealedArgs): Promise<void> {
  const supabase = createServerClient();

  const columns = Columns[DbTables.TABLES];

  await supabase
    .from(DbTables.TABLES)
    .update({ [columns.revealed]: revealed })
    .eq(columns.name, tableName);
}
