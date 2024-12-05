'use server';

import { Columns, DbTables } from '@/lib/supabase/constants';
import { createServerClient } from '@/lib/supabase/create-server-client';

interface SetTableRevealedArgs {
  tableName: string;
  revealed: boolean;
  image_index?: number;
}

export async function setTableRevealed({
  tableName,
  revealed,
  image_index,
}: SetTableRevealedArgs): Promise<void> {
  const supabase = await createServerClient();

  const columns = Columns[DbTables.TABLES];

  await supabase
    .from(DbTables.TABLES)
    .update({
      [columns.revealed]: revealed,
      [columns.image_index]: image_index,
      [columns.updated]: new Date().toISOString(),
    })
    .eq(columns.name, tableName)
    .is(columns.revealed, !revealed); // only update if state differs
}
