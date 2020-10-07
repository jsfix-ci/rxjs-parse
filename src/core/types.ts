import { Observable, OperatorFunction } from 'rxjs';

/**
 * Definition for an instantiable operator
 */
export interface SourceOperatorDefinition<T = unknown> {
  /**
   * The name of the operator function
   */
  operator: string;
  /**
   * The arguments to pass to the operator function
   */
  args: T;
}

/**
 * Definition for instanciating an `Observable` with a pipe
 */
export interface SourceDefinition<TSourceOptions = unknown | unknown[]> {
  /**
   * Name of the observable factory
   */
  name: string;
  /**
   * Options to pass to the observable factory
   */
  args?: TSourceOptions;
  /**
   * Definition from which a pipe can be created
   * which is applied on the source (observable)
   */
  pipe?: SourceOperatorDefinition[];
}

export interface InputSourceDefinitions {
  [k: string]: SourceDefinition;
}

export interface FieldSourceService {
  /**
   * Parses an input source definition to an `Observable`.
   *
   * @param def The definition
   *
   * @returns
   * An `Observable`. If the definition couldn't be parsed, `undefined`
   * is returned.
   */
  parse(def: SourceDefinition): void;
}

/**
 * An interface for a provider for the `FormFieldService`.
 *
 * A provider can provide factories to create
 * - source observables
 * - operators
 * - fake definitions
 */
export interface FieldSourceProvider {
  /**
   * Parses a definition `def` to an `Observable`.
   *
   * @param def Definition for the source
   * @param fieldComponent Component for which the source is created
   * @param rootFactory The factory to use to create sources or operators
   *
   * @returns
   * An observable.
   * If the provider provides no matching definition,
   * `undefined` is returned.
   */
  parseSource?: (
    def: SourceDefinition,
    rootFactory: FieldSourceService & FieldSourceProvider,
  ) => Observable<unknown> | void;

  /**
   * Parses a definition `def` to an `OperatorFunction`.
   *
   * @param def Definition for the operator
   * @param fieldComponent Component for which the operator is used
   * @param rootFactory The factory to use to create sources or operators
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
    def: SourceOperatorDefinition,
    rootFactory: FieldSourceService & FieldSourceProvider,
  ): OperatorFunction<unknown, unknown> | void;
}

/**
 * Function to create an operator
 */
export type OperatorFn<T = unknown, R = unknown> = (
  def: SourceOperatorDefinition,
  rootFactory: FieldSourceService & FieldSourceProvider,
) => OperatorFunction<T, R>;

/**
 * Function to create source
 */
export type SourceFn<T = unknown> = (
  def: SourceDefinition,
  rootFactory: FieldSourceService & FieldSourceProvider,
) => Observable<T>;
