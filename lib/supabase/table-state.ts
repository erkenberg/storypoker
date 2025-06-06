'use server';

import { createServerClient } from '@/lib/supabase/create-server-client';
import { Table, Values } from '@/lib/supabase/types';
import { defaultValueOptions } from '@/lib/value-helpers/predefined-values';

export interface TableState extends Table {
  /* Currently active values. */
  values: Omit<Values, 'id' | 'active'>;
  /* All possible value sets, including the active values. */
  valueSets: Values[];
}

export async function getTableState(
  tableName: string,
): Promise<TableState | null> {
  const supabase = await createServerClient();

  const { error, data } = await supabase
    .from('tables')
    .select(
      `
      name,
      revealed,
      image_index,
      values (
        id,
        values,
        active,
        description
      )
    `,
    )
    .eq('name', tableName)
    .limit(1)
    .single();
  if (error) {
    console.error(
      `Error checking for existing table ${tableName}:`,
      error.message,
    );
    return null;
  }

  const { values, revealed, name, image_index } = data;
  return {
    revealed,
    name,
    image_index,

    values:
      values.find(({ active }) => active) ??
      values.at(0) ??
      // NOTE: currently falling back to a default value when no entries are set without id/active
      defaultValueOptions[0],
    valueSets: values,
  };
}
