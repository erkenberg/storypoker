import {
  lightGreen,
  green,
  teal,
  amber,
  orange,
  deepOrange,
  red,
  blueGrey,
  grey,
} from '@mui/material/colors';
import { parseInt } from 'lodash';
import moize from 'moize';

export interface Color {
  regular: string;
  dark: string;
}

type validColorKeys = keyof typeof teal;

const baseNumericColors = [
  teal,
  green,
  lightGreen,
  amber,
  orange,
  deepOrange,
  red,
] as const;

const baseNonNumericColors = [blueGrey, grey] as const;

export const createValueMap = moize((values: string[]): Map<string, Color> => {
  const map = new Map<string, Color>();
  const numericValues = values
    .filter((value) => /^\d+$/.test(value))
    .sort((a, b) => parseInt(a) - parseInt(b));
  const nonNumericValues = values.filter(
    (value) => !numericValues.includes(value),
  );

  const baseColorRange = 400;

  for (const [values, baseColors] of [
    [numericValues, baseNumericColors],
    [nonNumericValues, baseNonNumericColors],
  ] as const) {
    // If there are more values than colors we double the colors and use one more intensive variant of each color.
    // If we still have more value the highest values are all mapped to the last color.
    const colorRangeMultiplier = Math.min(
      Math.ceil(values.length / baseColors.length),
      2,
    );
    const expandedColors: Color[] = baseColors.flatMap((color) => {
      return Array(colorRangeMultiplier)
        .fill(0)
        .map((_, index) => ({
          // We have to tell TypeScript that the key actually exists.
          // Be careful when increasing the max numeric Multiplier.
          regular: color[(baseColorRange + index * 200) as validColorKeys],
          dark: color[(baseColorRange + 200 + index * 200) as validColorKeys],
        }));
    });
    const ratio = values.length / expandedColors.length;
    for (let i = 0; i < values.length; i++) {
      const colorIndex = Math.min(
        // We stretch/compress the index so that it is roughly equally distributed over all colors
        // when there are more or less values than colors.
        Math.round(i / ratio),
        expandedColors.length - 1,
      );
      map.set(values[i], expandedColors[colorIndex]);
    }
  }
  return map;
});

const defaultColor: Color = {
  regular: blueGrey[400],
  dark: blueGrey[600],
};

export const getValueColor = (value: string, values: string[]): Color => {
  return createValueMap(values).get(value) ?? defaultColor;
};
