import { Values } from '@/lib/supabase/types';
import { defaultValueOptions } from '@/lib/value-helpers/predefined-values';

export const getActiveValues = (
  values: Values[],
): Omit<Values, 'id' | 'active'> =>
  values.find(({ active }) => active) ?? values.at(0) ?? defaultValueOptions[0];
