import { Values } from '@/lib/supabase/types';

export const defaultValueOptions: Omit<Values, 'id' | 'active'>[] = [
  {
    values: ['1', '2', '3', '5', '8', '13', '21', '?', '☕'],
    description: 'Fibonacci',
  },
  {
    values: ['😁', '😏', '😃', '😒', '😓', '😡', '?', '☕'],
    description: 'Emoji',
  },
];
