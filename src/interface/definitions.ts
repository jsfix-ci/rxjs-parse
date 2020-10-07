/**
 * Definition for instanciating an `Observable` with a pipe
 */
export interface ObservableDefinition<TSourceOptions = unknown | unknown[]> {
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
  pipe?: OperatorDefinition[];
}

/**
 * Definition for an instantiable operator
 */
export interface OperatorDefinition<T = unknown> {
  /**
   * The name of the operator function
   */
  operator: string;
  /**
   * The arguments to pass to the operator function
   */
  args: T;
}
