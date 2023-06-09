import React, { FC, JSX, useMemo } from 'react';
import { PlayerState } from '@/app/table/[tableId]/player-state';
import {
  Card,
  TableCell,
  TableRow,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  SxProps,
} from '@mui/material';
import { getValueColor } from '@/app/table/[tableId]/game-state';

interface StatisticsProps {
  playerStates: PlayerState[];
}

export const Statistics: FC<StatisticsProps> = ({
  playerStates,
}): JSX.Element => {
  const values = useMemo(
    () => playerStates.map((state) => state.selectedValue as string),
    [playerStates],
  );
  const numbers = useMemo(
    () =>
      values.flatMap((value) => (isNaN(Number(value)) ? [] : [Number(value)])),
    [values],
  );

  const min = useMemo(
    () => (numbers.length === 0 ? null : Math.min(...numbers)),
    [numbers],
  );
  const max = useMemo(
    () => (numbers.length === 0 ? null : Math.max(...numbers)),
    [numbers],
  );
  const mean = useMemo(
    () =>
      numbers.length === 0
        ? null
        : Math.round(
            (numbers.reduce((prev, current) => prev + current, 0) * 10) /
              numbers.length,
          ) / 10,
    [numbers],
  );
  const median = useMemo(() => {
    if (numbers.length === 0) return null;
    const sortedNumbers = [...numbers].sort(function (a, b) {
      return a - b;
    });
    const half = Math.floor(sortedNumbers.length / 2);
    return sortedNumbers.length % 2 === 1
      ? sortedNumbers[half]
      : (sortedNumbers[half - 1] + sortedNumbers[half]) / 2.0;
  }, [numbers]);
  if (numbers.length <= 0) return <></>;

  const getSx = (value: string): SxProps => ({
    color: getValueColor(value)?.regular,
    fontWeight: 'bold',
  });

  return (
    <TableContainer
      component={Card}
      sx={{ width: 'fit-content', margin: 'auto', marginTop: '16px' }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Min</TableCell>
            <TableCell>Max</TableCell>
            <TableCell>Mean</TableCell>
            <TableCell>Median</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={getSx(`${min}`)}>{min}</TableCell>
            <TableCell sx={getSx(`${max}`)}>{max}</TableCell>
            <TableCell sx={getSx(`${mean}`)}>{mean}</TableCell>
            <TableCell sx={getSx(`${median}`)}>{median}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
