import React, { FC, JSX, useMemo } from 'react';
import { Typography } from '@mui/material';
import { Chart } from '@/app/table/[tableName]/chart';
import { Statistics } from '@/app/table/[tableName]/statistics';
import { cardValues, getValueColor } from '@/app/table/[tableName]/game-state';
import { PlayerState } from '@/app/table/[tableName]/player-state';
import { CatImage } from '@/app/table/[tableName]/cat-image';

interface ResultsProps {
  playerStates: PlayerState[];
}

export const Results: FC<ResultsProps> = (props): JSX.Element => {
  const validPlayerStates = props.playerStates.filter(
    (state) => state.selectedValue != null,
  );
  const usedValues = cardValues.filter((value) =>
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
                  color: getValueColor(commonValue)?.regular,
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
              return count;
            })}
            labels={usedValues}
          />
          <Statistics playerStates={validPlayerStates} />
        </>
      )}
    </div>
  );
};
