// Letters, numbers, '-' and '_' only. This keeps table names safe to use in URLs and in
// Supabase realtime filters (e.g. `name=eq.${tableName}`).
const tableNamePattern = /^[\p{L}\p{N}_-]{2,64}$/u;

/**
 * Validates the name for a new table.
 * Returns an error message if the name is invalid, otherwise null.
 */
export const validateTableName = (tableName: unknown): string | null => {
  if (typeof tableName !== 'string' || tableName.length < 2) {
    return 'Table name must have at least two characters!';
  }
  if (tableName.length > 64) {
    return 'Table name must have at most 64 characters!';
  }
  if (!tableNamePattern.test(tableName)) {
    return "Table name may only contain letters, numbers, '-' and '_'!";
  }
  return null;
};
