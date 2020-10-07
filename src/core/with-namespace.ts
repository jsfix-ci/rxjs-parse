import { chain } from '../util/chain';

import {
  ObservableDefinition,
  OperatorDefinition,
  PipeableParser,
} from '../interface';

/**
 * Applies a namespace on the given `parsers`.
 *
 * @param namespace The namespace
 * @param parsers The parsers on which the namespace should be applied
 */
export function withNamespace(
  namespace: string,
  parsers: PipeableParser[],
): PipeableParser {
  return () => {
    const allParsers = parsers.map(p => p());
    const namespaceStr = `${namespace}/`;

    return {
      parseObservable: (def, ...args: unknown[]) => {
        // Check if namespace is matching
        if (def.name.startsWith(namespaceStr)) {
          // Transform name for checks
          const newName = def.name.substr(namespaceStr.length);
          const newDef: ObservableDefinition<unknown> = {
            ...def,
            name: newName,
          };

          // Chain parsers with the new definition
          return chain(allParsers.map(p => p.parseObservable))(newDef, ...args);
        }

        return undefined;
      },
      parseOperator: (def, ...args: unknown[]) => {
        // Check if namespace is matching
        if (def.operator.startsWith(namespaceStr)) {
          // Transform name for checks
          const newOperator = def.operator.substr(namespaceStr.length);
          const newDef: OperatorDefinition<unknown> = {
            ...def,
            operator: newOperator,
          };

          // Chain parsers with the new definition
          return chain(allParsers.map(p => p.parseOperator))(newDef, ...args);
        }

        return undefined;
      },
    };
  };
}
