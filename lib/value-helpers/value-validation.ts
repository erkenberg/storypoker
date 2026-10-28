import { filter, includes, uniq } from 'lodash';

const maxValueCount = 30;
const maxValueLength = 16;
const maxDescriptionLength = 100;

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
    : typeof valueString === 'string'
      ? valueString.split(',').map((value) => value.trim())
      : null;

  if (!valueArray || valueArray.length < 2) {
    return {
      errorMessage: "Enter at least two ',' separated values!",
      error: true,
    };
  }
  if (valueArray.length > maxValueCount) {
    return {
      errorMessage: `Enter at most ${maxValueCount} values!`,
      error: true,
    };
  }
  if (valueArray.some((value) => typeof value !== 'string' || !value)) {
    return {
      errorMessage: 'Values must not be empty!',
      error: true,
    };
  }
  if (valueArray.some((value) => value.length > maxValueLength)) {
    return {
      errorMessage: `Values must have at most ${maxValueLength} characters!`,
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

/**
 * Validates the optional description of a value set.
 * Returns an error message if the description is invalid, otherwise null.
 */
export const validateValueDescription = (
  description: unknown,
): string | null => {
  if (description == null) return null;
  if (typeof description !== 'string') return 'Invalid description!';
  if (description.length > maxDescriptionLength) {
    return `Description must have at most ${maxDescriptionLength} characters!`;
  }
  return null;
};
