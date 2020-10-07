import { range } from 'rxjs';
import { mapTo, pluck } from 'rxjs/operators';

import { namedObservable, namedOperator, withNamespace } from '../core';
import {
  ObservableDefinition,
  OperatorDefinition,
} from '../interface/definitions';

import { RangeOptions } from './rxjs.types';

function _range(def: ObservableDefinition<RangeOptions>) {
  const { args: { start, count } = {} } = def;
  return range(start, count);
}

function _mapTo<T>(def: OperatorDefinition<T>) {
  return mapTo(def.args);
}

function _pluck(def: OperatorDefinition<string[]>) {
  return pluck(...def.args);
}

export function rxjsParsers() {
  return withNamespace('rxjs', [
    // Observables
    namedObservable('range', _range),
    // Operators
    namedOperator('mapTo', _mapTo),
    namedOperator('pluck', _pluck),
  ]);
}

// const x = create().chain(rxjsParsers());
