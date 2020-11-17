import { Observable, OperatorFunction } from 'rxjs';

import { ObservableDefinition, OperatorDefinition } from './definitions';

export interface OperatorParser<T, OP1, OP2 = OP1> {
  (def: OperatorDefinition<T>, parser: Parser): OperatorFunction<OP1, OP2>;
}

export interface ObservableParser<T, O> {
  (def: ObservableDefinition<T>, parser: Parser): Observable<O>;
}

export type PipeableParser = () => CustomParser;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ParseOperatorResult = OperatorFunction<any, unknown> | undefined;

/**
 * An interface for a parser.
 *
 * A provider can provide factories to create
 * - source observables
 * - operators
 * - fake definitions
 */
export interface CustomParser {
  /**
   * Parses a definition `def` to an `Observable`.
   *
   * @param def Definition for the source
   * @param parser Root parser
   *
   * @returns
   * An observable.
   * If the provider provides no matching definition,
   * `undefined` is returned.
   */
  parseObservable?(
    def: ObservableDefinition<unknown>,
    parser: Parser,
  ): Observable<unknown> | undefined;

  /**
   * Parses a definition `def` to an `OperatorFunction`.
   *
   * @param def Definition for the operator
   * @param parser Root parser
   *
   * @returns
   * A pipeable operator to be used with observables like in `observable$.pipe(...)`.
   * If the provider does not provide an operator with this definition,
   * `undefined` is returned.
   *
   * @example
   * observable$.pipe(
   *  createPipeOperator({ operator: 'pluck', args:['id']})
   * )
   * // is equivalent to
   * observable$.pipe(pluck('id'));
   */
  parseOperator?(
    def: OperatorDefinition<unknown>,
    parser: Parser,
  ): ParseOperatorResult;
}

export interface Parser extends CustomParser {
  /**
   * Parses a definition to an `Observable`.
   *
   * @param def The definition
   *
   * @returns
   * An `Observable`. If the definition couldn't be parsed, `undefined`
   * is returned.
   */
  parse(def: ObservableDefinition<unknown>): Observable<unknown> | undefined;
  chain(...customParsers: PipeableParser[]): Parser;
}
