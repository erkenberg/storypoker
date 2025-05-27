'use server';

// used as server action by the creation form
import { createServerClient } from '@/lib/supabase/create-server-client';
import { Values } from '@/lib/supabase/types';

interface CreateTableResult {
  ok: boolean;
  tableName: string;
  error?: string;
}

interface CreateTableArgs {
  tableName: string;
  values: Pick<Values, 'values' | 'description'>;
}

export async function createTable({
  tableName,
  values,
}: CreateTableArgs): Promise<CreateTableResult> {
  const supabase = await createServerClient();

  const { count, error: countError } = await supabase
    .from('tables')
    .select('name', { count: 'exact' })
    .eq('name', tableName);

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
    .from('tables')
    .insert({ name: tableName });

  if (insertError) {
    console.error(`Error creating table ${tableName}:`, insertError.message);
    return {
      ok: false,
      tableName,
      error: `Error creating table ${tableName}.`,
    };
  }

  const { error: valueInsertError } = await supabase.from('values').insert({
    table_name: tableName,
    values: values.values,
    description: values.description,
    active: true,
  });
  if (valueInsertError) {
    console.error(
      `Error adding values for table ${tableName}:`,
      valueInsertError.message,
    );
    return {
      ok: false,
      tableName,
      error: `Error adding values for table ${tableName}.`,
    };
  }

  return { ok: true, tableName };
}
