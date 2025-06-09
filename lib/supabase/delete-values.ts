'use server';

import { createServerClient } from '@/lib/supabase/create-server-client';
import { updateActiveValues } from '@/lib/supabase/update-active-values';

interface DeleteValueArgs {
  id: number;
  tableName: string;
}

export async function deleteValues({
  id,
  tableName,
}: DeleteValueArgs): Promise<void> {
  const supabase = await createServerClient();

  const valueDeleteResult = await supabase.from('values').delete().eq('id', id);

  if (valueDeleteResult.error) {
    console.error(
      `Error deleting values with id ${id}`,
      valueDeleteResult.error.message,
    );
  }

  // Make sure there still is an active value, if not just set any set as active.
  const { data } = await supabase
    .from('values')
    .select('id, active')
    .eq('table_name', tableName);

  if (!data) return;
  if (data.length > 0 && !data.some((value) => value.active)) {
    await updateActiveValues({ id: data[0].id, tableName });
  }
}
