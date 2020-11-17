import { first as _first } from 'rxjs/operators';

import { namedOperator } from '../../core';
import { OperatorDefinition } from '../../interface/definitions';

function first(def: OperatorDefinition<unknown>) {
  return _first();
}

export const firstParse = namedOperator('first', first);
