'use server';

import { createServerClient } from '@/lib/supabase/create-server-client';

interface UpdateValueArgs {
  tableName: string;
  id: number;
}

export async function updateActiveValues({
  tableName,
  id,
}: UpdateValueArgs): Promise<void> {
  if (typeof tableName !== 'string' || !Number.isInteger(id)) return;

  const supabase = await createServerClient();

  // Restrict to the current table, so that value sets of other tables can't be activated.
  const { data, error } = await supabase
    .from('values')
    .update({ active: true })
    .eq('id', id)
    .eq('table_name', tableName)
    .select('id');

  if (error || !data?.length) {
    console.error(
      `Error activating values with id ${id} for table ${tableName}`,
      error?.message,
    );
    return;
  }

  await supabase
    .from('values')
    .update({ active: false })
    .neq('id', id)
    .eq('table_name', tableName);
}
