'use server';

// used as server action by the creation form
import { createServerClient } from '@/lib/supabase/create-server-client';
import { Values } from '@/lib/supabase/types';
import { validateTableName } from '@/lib/table-helpers/table-name-validation';
import {
  parseAndValidateValueInput,
  validateValueDescription,
} from '@/lib/value-helpers/value-validation';

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
  // Server actions can be called with arbitrary input, so validate again on the server.
  const tableNameError = validateTableName(tableName);
  if (tableNameError) {
    return { ok: false, tableName, error: tableNameError };
  }
  const parsedValues = parseAndValidateValueInput(values?.values);
  if (parsedValues.error) {
    return { ok: false, tableName, error: parsedValues.errorMessage };
  }
  const descriptionError = validateValueDescription(values.description);
  if (descriptionError) {
    return { ok: false, tableName, error: descriptionError };
  }

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
    values: parsedValues.values,
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
