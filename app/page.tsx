'use client';

import React, { JSX, ReactNode, useState } from 'react';
import {
  Autocomplete,
  Button,
  CircularProgress,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { createTable } from '@/lib/supabase/create-table';
import { useRouter, useSearchParams } from 'next/navigation';
import { filter, uniq, includes } from 'lodash';
import { defaultValueOptions } from '@/lib/value-helpers/predefined-values';

const Page = (): JSX.Element => {
  const searchParams = useSearchParams();
  const [tableName, setTableName] = useState<string>(
    searchParams.get('tableName') ?? '',
  );

  const [pendingCreateTable, setPendingCreateTable] = useState(false);
  const [tableNameError, setTableNameError] = useState<string | null>(null);
  const [valuesError, setValuesError] = useState<string | null>(null);
  const [creationError, setCreationError] = useState<string | null>(null);
  const router = useRouter();

  const options = defaultValueOptions.map((values) => ({
    label: `${values.description}: ${values.values.join(', ')}`,
    value: values,
  }));

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const onSubmit = async (): Promise<void> => {
    setCreationError(null);
    setTableNameError(null);
    setValuesError(null);

    let hasError = false;
    if (!tableName || tableName.length < 2) {
      setTableNameError('Table name must have at least two characters!');
      hasError = true;
    }
    const valueArray = selectedOption.value.values.map((value) => value.trim());

    if (!valueArray || valueArray.length < 2) {
      setValuesError("Please enter at least two ',' separated values!");
      hasError = true;
    }
    const duplicates = uniq(
      filter(valueArray, (value, index, array) =>
        includes(array, value, index + 1),
      ),
    );
    if (duplicates.length > 0) {
      setValuesError(
        `All values must be unique! Duplicates: ${duplicates.join(',')}`,
      );
      hasError = true;
    }
    if (hasError) return;

    setPendingCreateTable(true);
    const result = await createTable({
      tableName,
      values: selectedOption.value,
    });
    if (result.ok) {
      router.push(`/table/${encodeURIComponent(result.tableName)}`);
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
          <Stack direction="column" spacing={2} sx={{ width: '300px' }}>
            <FormLabel>Create a new poker table</FormLabel>
            <TextField
              id="table-name"
              required
              focused
              label="Table name"
              value={tableName}
              error={Boolean(tableNameError)}
              helperText={tableNameError}
              onChange={(event): void => {
                setTableName(event.target.value);
              }}
            />
            <Autocomplete
              id="table-values"
              options={options}
              defaultValue={options[0]}
              value={selectedOption}
              disableClearable
              onChange={(_, option): void => {
                setSelectedOption(option);
              }}
              forcePopupIcon
              // @ts-expect-error key actually does exist on params
              renderInput={({ key, ...params }): ReactNode => (
                <TextField
                  key={key}
                  {...params}
                  label="Values"
                  required
                  error={Boolean(valuesError)}
                  helperText={valuesError}
                />
              )}
            />
            {creationError && (
              <Typography
                component="p"
                sx={{ color: '#d32f2f', fontSize: '0.75rem' }}
              >
                {creationError}
              </Typography>
            )}
            <Button type="submit" variant="contained">
              Create
            </Button>
          </Stack>
        )}
      </form>
    </Grid>
  );
};
export default Page;
