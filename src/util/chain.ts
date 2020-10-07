// eslint-disable-next-line @typescript-eslint/ban-types
type AnyFunction = Function;

/**
 * Chains function calls. Calls the provided functions one after the other.
 * If any of the given arguments is not a function, it will be ignored.
 *
 * @param chain
 */
export function chain<T extends AnyFunction>(chain: (T | undefined)[]) {
  return (...args: unknown[]) => {
    for (const item of chain) {
      // Check if the chain item provides the createPipeOperator function
      if (typeof item === 'function') {
        const operator = item(...args);
        // If an operator was successfully created, we want to return it
        if (operator) {
          return operator;
        }
      }
    }

    return undefined;
  };
}
