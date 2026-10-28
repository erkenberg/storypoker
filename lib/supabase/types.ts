import { Tables } from '@/database.types';

export type Values = Pick<
  Tables<'values'>,
  'id' | 'values' | 'active' | 'description'
>;

export type Table = Pick<Tables<'tables'>, 'name' | 'revealed' | 'image_index'>;

export interface TableState extends Table {
  /* Currently active values. */
  values: Omit<Values, 'id' | 'active'>;
  /* All possible value sets, including the active values. */
  valueSets: Values[];
}
