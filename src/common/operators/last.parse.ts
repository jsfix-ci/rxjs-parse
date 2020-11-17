import { last as _last } from 'rxjs/operators';

import { namedOperator } from '../../core';
import { OperatorDefinition } from '../../interface/definitions';

function last(def: OperatorDefinition<unknown>) {
  return _last();
}

export const lastParse = namedOperator('last', last);
