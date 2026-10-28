'use server';

import { createServerClient } from '@/lib/supabase/create-server-client';
import { Values } from '@/lib/supabase/types';
import { updateActiveValues } from '@/lib/supabase/update-active-values';
import {
  parseAndValidateValueInput,
  validateValueDescription,
} from '@/lib/value-helpers/value-validation';

interface CreateValueArgs {
  tableName: string;
  values: Pick<Values, 'values' | 'description'>;
}

export async function createValues({
  tableName,
  values,
}: CreateValueArgs): Promise<void> {
  if (typeof tableName !== 'string') return;
  const parsedValues = parseAndValidateValueInput(values?.values);
  const descriptionError = validateValueDescription(values?.description);
  if (parsedValues.error || descriptionError) {
    console.error(`Invalid values for table ${tableName}`);
    return;
  }

  const supabase = await createServerClient();

  // Inserting for a non-existing table fails due to the foreign key on table_name.
  const valueInsertResult = await supabase
    .from('values')
    .insert({
      table_name: tableName,
      values: parsedValues.values,
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
