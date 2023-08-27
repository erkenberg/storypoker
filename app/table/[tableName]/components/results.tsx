import React, { FC, JSX, useMemo } from 'react';
import { Typography } from '@mui/material';
import { Chart } from '@/app/table/[tableName]/components/chart';
import { Statistics } from '@/app/table/[tableName]/components/statistics';
import { TableState } from '@/app/table/[tableName]/state/table-state';
import { PlayerState } from '@/app/table/[tableName]/state/player-state';
import { CatImage } from '@/app/table/[tableName]/components/cat-image';
import { getValueColor } from '@/lib/value-helpers/value-colors';

interface ResultsProps {
  playerStates: PlayerState[];
  tableState: TableState;
}

export const Results: FC<ResultsProps> = ({
  playerStates,
  tableState,
}): JSX.Element => {
  const validPlayerStates = playerStates.filter(
    (state) => state.selectedValue != null,
  );
  const usedValues = tableState.values.filter((value) =>
    validPlayerStates.some((state) => state.selectedValue === value),
  );
  const allValuesIdentical = usedValues.every(
    (value) => value === usedValues[0],
  );
  const commonValue = allValuesIdentical ? usedValues[0] : null;
  const catSeed = useMemo(() => {
    const date = new Date();
    // We only update the time component of the seed every 3 Minutes to reduce the probability of two users
    // getting a different seed when they get the results at slightly different times.
    return `${commonValue}-${date.getMinutes() % 20}`;
  }, [commonValue]);

  return (
    <div style={{ margin: 'auto' }}>
      {allValuesIdentical ? (
        <CatImage
          seed={catSeed}
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
                    commonValue &&
                    getValueColor(commonValue, tableState.values).regular,
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
                color: getValueColor(value, tableState.values),
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
