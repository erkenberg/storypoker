import React, { JSX } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';
import { Color } from '@/lib/value-helpers/value-colors';
import { useTheme, alpha } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface ChartProps {
  data: { value: string; count: number; color: Color }[];
}

export const Chart = ({ data }: ChartProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Pie
      style={{ margin: 'auto' }}
      options={{
        plugins: {
          datalabels: {
            anchor: 'center',
            formatter: (value, context): string => {
              return data[context.dataIndex].value;
            },
            labels: {
              title: {
                font: {
                  weight: 'bold',
                  size: 22,
                },
                color: theme.palette.mode === 'light' ? 'gray' : 'white',
              },
            },
          },
        },
      }}
      data={{
        datasets: [
          {
            label: '# of Votes',
            data: data.map(({ count }) => count),
            backgroundColor: data.map(({ color }) => {
              return alpha(color.regular, 0.4);
            }),
            borderColor: data.map(({ color }) => color.dark),
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};
