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

export const cardValues = ['1', '2', '3', '5', '8', '13', '21', '?', '☕'];

interface Color {
  regular: string;
  dark: string;
}

export const getValueColor = (value: string | null): Color | undefined => {
  switch (value) {
    case '1':
      return { regular: teal[400], dark: teal[600] };
    case '2':
      return { regular: green[400], dark: green[600] };
    case '3':
      return { regular: lightGreen[400], dark: lightGreen[600] };
    case '5':
      return { regular: amber[400], dark: amber[600] };
    case '8':
      return { regular: orange[400], dark: orange[600] };
    case '13':
      return { regular: deepOrange[400], dark: deepOrange[600] };
    case '21':
      return { regular: red[400], dark: red[600] };
    case '?':
      return { regular: blueGrey[400], dark: blueGrey[600] };
    case '☕':
      return { regular: grey[400], dark: grey[600] };
    default:
      return undefined;
  }
};
