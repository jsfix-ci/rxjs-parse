import { skip as _skip } from 'rxjs/operators';

import { namedOperator } from '../../core';
import { OperatorDefinition } from '../../interface/definitions';

export interface SkipOptions {
  count: number;
}

function skip(def: OperatorDefinition<SkipOptions>) {
  return _skip(def.args.count);
}

export const skipParse = namedOperator('skip', skip);
