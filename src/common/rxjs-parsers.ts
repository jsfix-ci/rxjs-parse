import { withNamespace } from '../core';

import { rangeParse } from './range.parse';
import { rxjsOperators } from './operators';

/**
 * Parses `rxjs` observables and operators
 */
export function rxjsParsers() {
  return withNamespace('rxjs', [
    // observables
    rangeParse,
    // operators
    rxjsOperators(),
  ]);
}
