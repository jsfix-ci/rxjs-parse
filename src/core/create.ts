import { Observable, OperatorFunction } from 'rxjs';

import { chain } from '../util/chain';

import { CustomParser, Parser } from '../interface/parser';
import {
  ObservableDefinition,
  OperatorDefinition,
} from '../interface/definitions';

type parseObservable = (def: ObservableDefinition) => Observable<unknown>;
type ParseOperator = (
  def: OperatorDefinition<unknown>,
) => OperatorFunction<unknown, unknown>;

/**
 * Creates a function that uses the given `parseObservable` and `parseOperator`
 * functions.
 *
 * @param parseObservable Function to parse observable from definition
 * @param parseOperator Function to parse operator from definition
 */
function parse(parseObservable: parseObservable, parseOperator: ParseOperator) {
  return (def: ObservableDefinition) => {
    // First, we create the source
    let source$;
    try {
      source$ = parseObservable(def);
      // Only proceed if a source was created
      if (!source$) {
        // console.warn('No factory for source$', def.name);
        return;
      }
    } catch (error) {
      // console.warn(`Error creating source$`, def, error);
      return;
    }

    // Then, create the pipe if defined
    const operations: OperatorFunction<unknown, unknown>[] = [];
    if (Array.isArray(def.pipe)) {
      for (const operatorDef of def.pipe) {
        try {
          const operator = parseOperator(operatorDef);

          // If no operator was created, abort source creation
          if (!operator) {
            // console.warn('No factory for pipe operator', pipeDef.operator);
            return;
          }

          operations.push(operator);
        } catch (error) {
          // If operator creation failed, abort source creation
          // console.warn('Error creating pipeable operator', pipeDef, error);
          return;
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return source$.pipe(...operations);
  };
}

/**
 * Creates a new parser to which other parsers can be chained
 */
export function create(): Parser {
  const parserChain: CustomParser[] = [];

  const x: Parser = {
    parse: () => undefined,
    chain: (...args) => {
      parserChain.push(...args.map(p => p()));
    },
  };

  const parseOperator: ParseOperator = def =>
    chain(parserChain.map(p => p.parseOperator))(def, x);

  const parseObservable: parseObservable = def =>
    chain(parserChain.map(p => p.parseObservable))(def, x);

  x.parseOperator = parseOperator;
  x.parseObservable = parseObservable;
  x.parse = parse(parseObservable, parseOperator);

  return x;
}
