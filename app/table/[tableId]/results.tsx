import React, { FC, JSX } from 'react';
import { Typography } from '@mui/material';
import { Chart } from '@/app/table/[tableId]/chart';
import { Statistics } from '@/app/table/[tableId]/statistics';
import { cardValues, getValueColor } from '@/app/table/[tableId]/game-state';
import { PlayerState } from '@/app/table/[tableId]/player-state';
import { CatImage } from '@/app/table/[tableId]/cat-image';

interface ResultsProps {
  playerStates: PlayerState[];
}

export const Results: FC<ResultsProps> = (props): JSX.Element => {
  const validPlayerStates = props.playerStates.filter(
    (state) => state.selectedValue != null,
  );
  if (validPlayerStates.length === 0) return <></>;
  const usedValues = cardValues.filter((value) =>
    validPlayerStates.some((state) => state.selectedValue === value),
  );
  const allTipsIdentical = usedValues.every((value) => value === usedValues[0]);

  return (
    <div style={{ margin: 'auto' }}>
      {allTipsIdentical ? (
        <CatImage
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
                  color: getValueColor(usedValues[0])?.regular,
                  fontWeight: 'bold',
                  display: 'inline',
                }}
              >
                {usedValues[0]}
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
