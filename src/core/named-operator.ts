import { propertyValueGuard } from '../guards';
import { OperatorParser, CustomParser } from '../interface/parser';

import { OperatorDefinition } from '../interface/definitions';

/**
 * Creates a named operator parser with the given `name`.
 *
 * @param name The name of the operator
 * @param parser The parser function
 */
export function namedOperator<T, OP1, OP2>(
  name: string,
  parser: OperatorParser<T, OP1, OP2>,
) {
  return (): CustomParser => {
    return {
      parseOperator: propertyValueGuard(
        name,
        (def: OperatorDefinition<T>) => def.operator,
        parser,
      ),
    };
  };
}
