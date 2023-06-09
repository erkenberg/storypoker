import React, { FC, JSX } from 'react';
import { Grid, Stack } from '@mui/material';
import { Chart } from '@/app/table/[tableId]/chart';
import { Statistics } from '@/app/table/[tableId]/statistics';
import { cardValues } from '@/app/table/[tableId]/game-state';
import { PlayerState } from '@/app/table/[tableId]/player-state';

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
  return (
    <Grid item xs={12} lg={4}>
      <Stack direction="column" spacing={2}>
        <div style={{ margin: 'auto' }}>
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
        </div>
      </Stack>
    </Grid>
  );
};
