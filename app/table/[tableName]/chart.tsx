import React, { JSX } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';
import { getValueColor } from '@/app/table/[tableName]/game-state';
import { useTheme, alpha } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface ChartProps {
  labels: string[];
  data: number[];
}

export const Chart = (props: ChartProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Pie
      style={{ margin: 'auto' }}
      options={{
        plugins: {
          datalabels: {
            anchor: 'center',
            formatter: (value, context): string => {
              return props.labels[context.dataIndex];
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
            data: props.data,
            backgroundColor: props.labels.map((value) =>
              alpha(getValueColor(value)?.regular ?? 'gray', 0.4),
            ),
            borderColor: props.labels.map(
              (value) => getValueColor(value)?.dark,
            ),
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};
