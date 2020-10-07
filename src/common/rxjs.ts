import { range } from 'rxjs';
import { mapTo, pluck } from 'rxjs/operators';

import { RxJsObservable, RxJsOperator, RxJsProvider } from '../core/meta';
import { SourceOperatorDefinition } from '../core/types';

import { RangeOptions } from './rxjs.types';

/**
 * Provides the basic rxjs functionality.
 *
 * For sources, the service provides
 * -
 *
 * For operators, the service provides
 * - rxjs: mapTo
 * - rxjs: pluck
 *
 */
@RxJsProvider({
  namespace: 'rxjs',
})
export class RxJsCommonProvider {
  @RxJsObservable('range')
  range(def: SourceOperatorDefinition<RangeOptions>) {
    const {
      args: { start, count },
    } = def;
    return range(start, count);
  }
  // range({ args: { start, count } }: SourceOperatorDefinition<RangeOptions>) {
  //   return range(start, count);
  // }

  @RxJsOperator('mapTo')
  mapTo<T>(def: SourceOperatorDefinition<T>) {
    return mapTo(def.args);
  }

  @RxJsOperator()
  pluck(def: SourceOperatorDefinition<string[]>) {
    return pluck(...def.args);
  }
}
