import React, { FC, JSX } from 'react';
import { Typography } from '@mui/material';
import { Chart } from '@/app/table/[tableName]/components/chart';
import { Statistics } from '@/app/table/[tableName]/components/statistics';
import { TableState } from '@/lib/supabase/table-state';
import { PlayerState } from '@/app/table/[tableName]/state/player-state';
import { Images } from '@/app/table/[tableName]/components/images';
import { getValueColor } from '@/lib/value-helpers/value-colors';

interface ResultsProps {
  playerStates: PlayerState[];
  tableState: TableState;
}

export const Results: FC<ResultsProps> = ({
  playerStates,
  tableState,
}): JSX.Element => {
  const values = tableState.values.values;
  const validPlayerStates = playerStates.filter(
    ({ selectedValue, isOffline }) => selectedValue != null && !isOffline,
  );
  const usedValues = values.filter((value) =>
    validPlayerStates.some((state) => state.selectedValue === value),
  );
  const allValuesIdentical = usedValues.every(
    (value) => value === usedValues[0],
  );
  const commonValue = allValuesIdentical ? usedValues[0] : null;

  return (
    <div style={{ margin: 'auto' }}>
      {allValuesIdentical ? (
        <Images
          imageIndex={tableState.image_index}
          label={
            <Typography
              variant="h6"
              component="div"
              sx={{ margin: 'auto', width: 'fit-content' }}
            >
              All players voted for:{' '}
              <Typography
                variant="h6"
                sx={{
                  color:
                    commonValue && getValueColor(commonValue, values).regular,
                  fontWeight: 'bold',
                  display: 'inline',
                }}
              >
                {commonValue}
              </Typography>
            </Typography>
          }
        />
      ) : (
        <>
          <Chart
            data={usedValues.map((value) => {
              let count = 0;
              for (const state of validPlayerStates) {
                if (state.selectedValue === value) count++;
              }
              return {
                value,
                count,
                color: getValueColor(value, values),
              };
            })}
          />
          <Statistics
            playerStates={validPlayerStates}
            tableState={tableState}
          />
        </>
      )}
    </div>
  );
};
