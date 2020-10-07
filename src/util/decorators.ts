import { OperatorFn, SourceFn } from '../core/types';

/**
 * Key for the operator meta data
 */
export const OPERATOR_METADATA = '__rxjs-parse-operator__';

/**
 * Factory for operator decorator
 *
 * @param name the name of the operator
 */
export const makeOperatorDecorator = (name?: string) => (
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  const constructor = target.constructor;
  const operatorName = name !== undefined ? name : propertyKey;

  // Create the operator map on the constructor, if it doesn't
  // already exist
  const meta: Map<string, OperatorFn> = constructor.hasOwnProperty(
    OPERATOR_METADATA,
  )
    ? (constructor as any)[OPERATOR_METADATA]
    : Object.defineProperty(constructor, OPERATOR_METADATA, {
        value: new Map(),
      })[OPERATOR_METADATA];

  // Add the operator by its name
  meta.set(operatorName, (def, factory) => descriptor.value(def, factory));
};

export const OBSERVEABLE_METADATA = '__rxjs-parse-observeable__';

export const makeObserveableDecorator = (name?: string) => (
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  const constructor = target.constructor;
  const observeableName = name !== undefined ? name : propertyKey;

  // Create the operator map on the constructor, if it doesn't
  // already exist
  const meta: Map<string, SourceFn> = constructor.hasOwnProperty(
    OBSERVEABLE_METADATA,
  )
    ? (constructor as any)[OBSERVEABLE_METADATA]
    : Object.defineProperty(constructor, OBSERVEABLE_METADATA, {
        value: new Map(),
      })[OBSERVEABLE_METADATA];

  // Add the operator by its name
  meta.set(observeableName, (def, factory) => descriptor.value(def, factory));
};
