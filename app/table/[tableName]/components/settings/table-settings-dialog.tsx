import React, { FC, JSX, useCallback, useEffect, useState } from 'react';
import {
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import { Values } from '@/lib/supabase/types';
import TextField from '@mui/material/TextField';
import { parseAndValidateValueInput } from '@/lib/value-helpers/value-validation';
import { createValues } from '@/lib/supabase/create-values';
import { updateActiveValues } from '@/lib/supabase/update-active-values';

export type TableSettingsDialogProps = {
  tableName: string;
  valueSets: Values[];
};

const CREATE_NEW = 'CREATE_NEW';

export const TableSettingsDialog: FC<TableSettingsDialogProps> = ({
  valueSets,
  tableName,
}): JSX.Element => {
  const [open, setOpen] = useState(false);
  const getCurrentlyActiveValues = useCallback(
    (): string => `${valueSets.find(({ active }) => active)?.id ?? CREATE_NEW}`,
    [valueSets],
  );
  const [selectedValues, setSelectedValues] = useState<string>(
    getCurrentlyActiveValues(),
  );
  const [valuesError, setValuesError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedValues(getCurrentlyActiveValues());
  }, [getCurrentlyActiveValues]);

  const handleClose = (): void => {
    setOpen(false);
    setSelectedValues(getCurrentlyActiveValues());
    setValuesError(null);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setValuesError(null);

    if (selectedValues !== CREATE_NEW) {
      if (
        valueSets.some(({ active, id }) => active && `${id}` === selectedValues)
      ) {
        return;
      }
      await updateActiveValues({ tableName, id: Number(selectedValues) });
    } else {
      const formData = new FormData(event.currentTarget);
      const description = formData.get('description') as string;
      const newValues = formData.get('values') as string;

      const parsedResult = parseAndValidateValueInput(newValues);

      if (parsedResult.error) {
        setValuesError(parsedResult.errorMessage);
        return;
      }
      await createValues({
        values: { values: parsedResult.values, description },
        tableName,
      });
    }

    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        color="primary"
        sx={{ padding: 0 }}
      >
        <SettingsIcon fontSize="small" />
        <Typography component={'h2'} sx={{ marginLeft: 1 }}>
          Table Settings
        </Typography>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{ paper: { component: 'form', onSubmit: handleSubmit } }}
        fullWidth
        maxWidth="xs"
      >
        <DialogContent>
          <DialogTitle sx={{ paddingLeft: 0 }}>Table Settings</DialogTitle>
          <FormControl fullWidth variant="standard">
            <InputLabel id="active-value-select-label">
              Active Table Values
            </InputLabel>
            <Select
              labelId="active-value-select-label"
              value={selectedValues}
              onChange={(event: SelectChangeEvent) => {
                setSelectedValues(event.target.value);
              }}
              fullWidth
            >
              <MenuItem
                key={CREATE_NEW}
                value={CREATE_NEW}
                sx={{ color: 'primary.main' }}
              >
                Create new values
              </MenuItem>
              {valueSets.map(({ id, values, description }) => (
                <MenuItem key={id} value={`${id}`}>
                  {`${description ? description + ': ' : ''}${values.join(', ')}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedValues === CREATE_NEW && (
            <>
              <TextField
                sx={{ marginTop: 1 }}
                name="description"
                label="Description"
                fullWidth
                variant="standard"
              />
              <TextField
                sx={{ marginTop: 1 }}
                required
                name="values"
                label="Values (comma separated)"
                fullWidth
                variant="standard"
                error={Boolean(valuesError)}
                helperText={valuesError}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
