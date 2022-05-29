import { range as _range } from 'rxjs';

import { namedObservable } from '../core';
import { ObservableDefinition } from '../interface';

export interface RangeOptions {
  /**
   * The value of the first integer in the sequence
   */
  start: number;
  /**
   * The number of sequential integers to generate
   */
  count?: number;
}

/**
 * Parses the given `def` as inputs for the `range`
 * function in `rxjs
 *
 * @param def Definition for the function parameters
 */
function range(def: ObservableDefinition<RangeOptions>) {
  const { args: { start, count } = { start: 0 } } = def;
  return _range(start, count);
}

export const rangeParse = namedObservable('range', range);
