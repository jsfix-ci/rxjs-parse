import { withNamespace } from '../../core/with-namespace';

import { firstParse } from './first.parse';
import { lastParse } from './last.parse';
import { mapToParse } from './map-to.parse';
import { pluckParse } from './pluck.parse';
import { skipParse } from './skip.parse';
import { takeParse } from './take.parse';

/**
 * `rxjs` operators
 */
export function rxjsOperators() {
  return withNamespace('operators', [
    firstParse,
    lastParse,
    mapToParse,
    pluckParse,
    //skip
    skipParse,
    // take
    takeParse,
  ]);
}
