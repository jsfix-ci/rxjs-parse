import {
  FieldSourceProvider,
  OperatorFn,
  SourceDefinition,
  SourceFn,
  SourceOperatorDefinition,
} from './types';

/**
 * Basic abstract implementation of a field source provider.
 *
 * - Add source factories using `addSource`
 * - Add operators using `addOperator`
 * - implement `createFakeDefinitions` if needed
 *
 * @example
 * // Define operators and sources
 * enum OperatorName {
 *  MyOperator = 'my-operator'
 * }
 *
 * enum SourceName {
 *  MySource = 'my-source'
 * }
 *
 * // extend AbstractFieldSourceProvider
 * class Provider extends AbstractFieldSourceProvider<
 *  SourceName, OperatorName
 * > {
 *  constructor() {
 *    // Provide sources
 *    this.addSource(SourceName.MySource, ...);
 *
 *    // Provide operators
 *    this.addOperator(OperatorName.MyOperator, ...);
 *  }
 * }
 *
 */
export abstract class AbstractFieldSourceProvider<
  TSources extends string,
  TOperators extends string
> implements FieldSourceProvider {
  /**
   * Registry for the provided operator functions
   */
  protected readonly operatorMap = new Map<TOperators, OperatorFn>();
  /**
   * Registry for the provided source factories
   */
  protected readonly sourceMap = new Map<TSources, SourceFn>();

  /**
   * Adds an operator with a given `name`.
   *
   * @param name The name of the operator
   * @param fn The operator
   */
  protected addOperator(name: TOperators, fn: OperatorFn) {
    this.operatorMap.set(name, fn);
    return this;
  }

  /**
   * Adds a source factory with a given `name`.
   *
   * @param name The name of the source
   * @param fn The source factory
   */
  protected addSource(name: TSources, fn: SourceFn) {
    this.sourceMap.set(name, fn);
    return this;
  }

  parseSource(def: SourceDefinition, rootFactory) {
    const { name } = def;

    const sourceFn = this.sourceMap.get(name as TSources);
    if (sourceFn) {
      return sourceFn(def, rootFactory);
    }
  }

  parseOperator(def: SourceOperatorDefinition, factory) {
    const { operator } = def;

    const operatorFn = this.operatorMap.get(operator as TOperators);
    if (operatorFn) {
      return operatorFn(def, factory);
    }
  }
}
