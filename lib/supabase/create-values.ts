'use server';

import { createServerClient } from '@/lib/supabase/create-server-client';
import { Values } from '@/lib/supabase/types';
import { updateActiveValues } from '@/lib/supabase/update-active-values';

interface CreateValueArgs {
  tableName: string;
  values: Pick<Values, 'values' | 'description'>;
}

export async function createValues({
  tableName,
  values,
}: CreateValueArgs): Promise<void> {
  const supabase = await createServerClient();

  const valueInsertResult = await supabase
    .from('values')
    .insert({
      table_name: tableName,
      values: values.values,
      description: values.description,
      active: true,
    })
    .select();

  if (valueInsertResult.error) {
    console.error(
      `Error adding values for table ${tableName}:`,
      valueInsertResult.error.message,
    );
  }

  const newId = valueInsertResult.data?.at(0)?.id;
  if (newId) {
    await updateActiveValues({ tableName, id: newId });
  }
}
