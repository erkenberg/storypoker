'use server';

import { createServerClient } from '@/lib/supabase/create-server-client';
import { Tables } from '@/database.types';

export async function setTableRevealed({
  name,
  revealed,
  image_index,
}: Pick<Tables<'tables'>, 'name' | 'revealed'> &
  Partial<Pick<Tables<'tables'>, 'image_index'>>): Promise<void> {
  if (
    typeof name !== 'string' ||
    typeof revealed !== 'boolean' ||
    (image_index !== undefined &&
      (!Number.isInteger(image_index) || image_index < 0))
  ) {
    return;
  }

  const supabase = await createServerClient();

  await supabase
    .from('tables')
    .update({
      revealed,
      image_index,
      updated: new Date().toISOString(),
    })
    .eq('name', name)
    .is('revealed', !revealed); // only update if state differs
}
