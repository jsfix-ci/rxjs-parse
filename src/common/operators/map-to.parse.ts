import { mapTo as _mapTo } from 'rxjs/operators';

import { namedOperator } from '../../core';
import { OperatorDefinition } from '../../interface/definitions';

function mapTo<T>(def: OperatorDefinition<T>) {
  return _mapTo(def.args);
}

export const mapToParse = namedOperator('mapTo', mapTo);
