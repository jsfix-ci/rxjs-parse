import { take as _take } from 'rxjs/operators';

import { namedOperator } from '../../core';
import { OperatorDefinition } from '../../interface/definitions';

export interface TakeOptions {
  count: number;
}

function take(def: OperatorDefinition<TakeOptions>) {
  return _take(def.args.count);
}

export const takeParse = namedOperator('take', take);
