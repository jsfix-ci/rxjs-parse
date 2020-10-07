import { OperatorFunction, Observable } from 'rxjs';

import {
  FieldSourceProvider,
  SourceOperatorDefinition,
  SourceDefinition,
  InputSourceDefinitions,
  FieldSourceService,
} from './types';

interface InputSources {
  [k: string]: Observable<unknown>;
}

type TInputSources<T> = {
  [k in keyof T]?: Observable<unknown>;
};

/**
 * Abstract base class for creating input observables from
 * definitions.
 */
export abstract class AbstractFormFieldSourceService
  implements FieldSourceProvider, FieldSourceService {
  constructor(
    /**
     * Chain of field source providers
     */
    protected chain: FieldSourceProvider[],
  ) {}

  parseOperator(
    def: SourceOperatorDefinition,
    rootFactory: FieldSourceService & FieldSourceProvider = this,
  ): OperatorFunction<unknown, unknown> {
    for (const item of this.chain) {
      // Check if the chain item provides the createPipeOperator function
      if (item.parseOperator) {
        const operator = item.parseOperator(def, rootFactory);
        // If an operator was successfully created, we want to return it
        if (operator) {
          return operator;
        }
      }
    }
  }

  parseSource(
    def: SourceDefinition,
    rootFactory: FieldSourceService & FieldSourceProvider = this,
  ): Observable<unknown> {
    for (const item of this.chain) {
      // Check if the chain item provides the createSource function
      if (item.parseSource) {
        const source = item.parseSource(def, rootFactory);
        // If a source was successfully created, we want to return it
        if (source) {
          return source;
        }
      }
    }
  }

  parse(def: SourceDefinition) {
    // First, we create the source
    let source$;
    try {
      source$ = this.parseSource(def);
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
    const operations: OperatorFunction<any, any>[] = [];
    if (Array.isArray(def.pipe)) {
      for (const pipeDef of def.pipe) {
        try {
          const operator = this.parseOperator(pipeDef);

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

    return source$.pipe(...operations);
  }

  /**
   * Parses a definition object to an observable source.
   */
  parseDefinitionObject<T extends Record<string, unknown>>(
    def: T,
  ): TInputSources<T>;
  parseDefinitionObject(def: InputSourceDefinitions): InputSources {
    return Object.keys(def).reduce((acc, cur) => {
      const sources = this.parse(def[cur]);

      return sources ? { ...acc, [cur]: sources } : acc;
    }, {});
  }
}
