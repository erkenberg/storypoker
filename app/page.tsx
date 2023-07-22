'use client';

import React, { JSX, useState } from 'react';
import {
  Button,
  CircularProgress,
  FormLabel,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { createTable } from '@/lib/supabase/create-table';
import { useRouter } from 'next/navigation';

export default function Page(): JSX.Element {
  const [tableName, setTableName] = useState<string>('');
  const [pendingCreateTable, setPendingCreateTable] = useState(false);
  const [tableNameError, setTableNameError] = useState<string | null>(null);
  const [creationError, setCreationError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (): Promise<void> => {
    setCreationError(null);
    if (!tableName || tableName.length < 2) {
      setTableNameError('Table name must have at least length 2!');
      return;
    }
    setTableNameError(null);
    setPendingCreateTable(true);
    const result = await createTable({ tableName: tableName });
    if (result.ok) {
      router.push(`/table/${result.tableName}`);
    } else {
      setPendingCreateTable(false);
      setCreationError(
        result.error ?? `Error creating table ${result.tableName}.`,
      );
    }
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <form autoComplete="off" action={onSubmit}>
        {pendingCreateTable ? (
          <CircularProgress color="secondary" />
        ) : (
          <Stack direction="column" spacing={2} sx={{ maxWidth: '500px' }}>
            <FormLabel>Create a new table</FormLabel>
            <TextField
              id="table-name"
              required
              focused
              label="Table name"
              value={tableName}
              error={Boolean(tableNameError || creationError)}
              helperText={tableNameError ?? creationError}
              onChange={(event): void => {
                setTableName(event.target.value);
              }}
            />
            <Button type="submit">Submit</Button>
          </Stack>
        )}
      </form>
    </Grid>
  );
}
