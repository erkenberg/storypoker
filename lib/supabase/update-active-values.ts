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
  const supabase = await createServerClient();

  await supabase
    .from('values')
    .update({ table_name: tableName, active: true })
    .eq('id', id);
  await supabase
    .from('values')
    .update({ table_name: tableName, active: false })
    .neq('id', id);
}
