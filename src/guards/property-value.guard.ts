import { Arg1Fn, Arg2Fn } from '../interface/functions';

export function propertyValueGuard<R, TP, T>(
  value: TP,
  getNameFromObjFn: Arg1Fn<TP, T>,
  fn: Arg1Fn<R, T>,
): Arg1Fn<R | undefined, T>;
export function propertyValueGuard<R, TP, T1, T2>(
  value: TP,
  getNameFromObjFn: Arg2Fn<TP, T1, T2>,
  fn: Arg2Fn<R, T1, T2>,
): Arg2Fn<R | undefined, T1, T2>;

/**
 * Calls the given function, if `value` is equal to the value returned by `getPropFromObjFn`.
 *
 * @param value The value which should be equal
 * @param getPropFromObjFn Function to get the "to-be-equal" prop from an object
 * @param fn Function to be called
 */
export function propertyValueGuard<R, TP>(
  value: TP,
  getPropFromObjFn: (...args: unknown[]) => TP,
  fn: (...args: unknown[]) => R,
): (...args: unknown[]) => R | undefined {
  return (...args: unknown[]) => {
    const objName = getPropFromObjFn(...args);

    if (objName === value) {
      return fn(...args);
    }

    return undefined;
  };
}
