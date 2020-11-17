import { pluck as _pluck } from 'rxjs/operators';

import { namedOperator } from '../../core';
import { OperatorDefinition } from '../../interface/definitions';

function pluck(def: OperatorDefinition<string[]>) {
  return _pluck(...def.args);
}

export const pluckParse = namedOperator('pluck', pluck);
