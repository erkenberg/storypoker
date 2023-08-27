/**
 * Table names used in the Supabase postgres db.
 */
export enum DbTables {
  TABLES = 'tables',
}

/**
 * Column names of tables used in the Supabase postgres db.
 */
export const Columns = {
  [DbTables.TABLES]: {
    id: 'id',
    name: 'name',
    revealed: 'revealed',
    values: 'values',
    created: 'created',
    updated: 'updated',
    image_index: 'image_index',
  },
} as const;
