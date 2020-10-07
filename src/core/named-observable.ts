import { ObservableParser, CustomParser } from '../interface/parser';
import { propertyValueGuard } from '../guards';

import { ObservableDefinition } from '../interface/definitions';

/**
 * Creates a parser for a named observable
 *
 * @param name The name of the observable
 * @param parser The parser function
 */
export function namedObservable<T, O>(
  name: string,
  parser: ObservableParser<T, O>,
) {
  return (): CustomParser => {
    return {
      parseObservable: propertyValueGuard(
        name,
        (def: ObservableDefinition) => def.name,
        parser,
      ),
    };
  };
}
