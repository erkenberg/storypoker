import { filter, includes, uniq } from 'lodash';

interface ParseValueResult {
  values: string[];
  error: false;
}

interface ParseValueError {
  errorMessage: string;
  error: true;
}

export const parseAndValidateValueInput = (
  valueString: string | string[],
): ParseValueResult | ParseValueError => {
  const valueArray = Array.isArray(valueString)
    ? valueString
    : valueString.split(',').map((value) => value.trim());

  if (!valueArray || valueArray.length < 2) {
    return {
      errorMessage: "Enter at least two ',' separated values!",
      error: true,
    };
  }
  const duplicates = uniq(
    filter(valueArray, (value, index, array) =>
      includes(array, value, index + 1),
    ),
  );
  if (duplicates.length > 0) {
    return {
      errorMessage: `All values must be unique! Duplicates: ${duplicates.join(',')}`,
      error: true,
    };
  }
  return { values: valueArray, error: false };
};
