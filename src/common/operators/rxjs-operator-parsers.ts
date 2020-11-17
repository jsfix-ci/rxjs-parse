import { withNamespace } from '../../core/with-namespace';

import { mapToParse } from './map-to.parse';
import { pluckParse } from './pluck.parse';

/**
 * `rxjs` operators
 */
export function rxjsOperators() {
  return withNamespace('operators', [mapToParse, pluckParse]);
}
