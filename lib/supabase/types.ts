import { Tables } from '@/database.types';

export type Values = Pick<
  Tables<'values'>,
  'id' | 'values' | 'active' | 'description'
>;

export type Table = Pick<Tables<'tables'>, 'name' | 'revealed' | 'image_index'>;
