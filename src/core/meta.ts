import { Observable, OperatorFunction } from 'rxjs';
import {
  makeObserveableDecorator,
  makeOperatorDecorator,
  OBSERVEABLE_METADATA,
  OPERATOR_METADATA,
} from '../util/decorators';
import {
  FieldSourceProvider,
  FieldSourceService,
  OperatorFn,
  SourceDefinition,
  SourceFn,
  SourceOperatorDefinition,
} from './types';

interface ProviderConfig {
  namespace: string;
}
/**
 *
 * @param constructor The class to decorate
 */
export function RxJsProvider<T extends { new (...args: any[]): any }>(
  config: ProviderConfig,
) {
  return function (constructor: T) {
    return class extends constructor implements FieldSourceProvider {
      protected readonly __rxjs_provider_config = config;
      /**
       * Parses a definition `def` to an `Observable`.
       *
       * @param def Definition for the source
       * @param fieldComponent Component for which the source is created
       * @param factory The factory to use to create sources or operators
       *
       * @returns
       * An observable.
       * If the provider provides no matching definition,
       * `undefined` is returned.
       */
      parseSource(
        def: SourceDefinition,
        factory: FieldSourceService & FieldSourceProvider,
      ): Observable<any> | void {
        const { name } = def;
        const { namespace } = this.__rxjs_provider_config;

        // Check, if this is event the right namespace
        if (!name.startsWith(namespace)) {
          return;
        }

        // Check if it has a valid observeable name
        const result = name.match(/.*\/(\w+)/);
        if (!result) {
          throw new Error(`observeable ${name} seems to be invalid`);
        }

        const [_, observeableName] = result;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const meta: Map<string, SourceFn> = this['constructor'][
          OBSERVEABLE_METADATA
        ];

        // Get the operator function
        const observeableFn = meta.get(observeableName);
        if (observeableFn) {
          return observeableFn(def, factory);
        }
      }

      /**
       * Parses a definition `def` to an `OperatorFunction`.
       *
       * @param def Definition for the operator
       * @param fieldComponent Component for which the operator is used
       * @param factory The factory to use to create sources or operators
       *
       * @returns
       * A pipeable operator to be used with observables like in `observable$.pipe(...)`.
       * If the provider does not provide an operator with this definition,
       * `undefined` is returned.
       *
       * @example
       * observable$.pipe(
       *  createPipeOperator({ operator: 'pluck', args:['id']})
       * )
       * // is equivalent to
       * observable$.pipe(pluck('id'));
       */
      parseOperator(
        def: SourceOperatorDefinition,
        factory: FieldSourceService & FieldSourceProvider,
      ): OperatorFunction<unknown, unknown> | void {
        const { operator } = def;
        const { namespace } = this.__rxjs_provider_config;

        // Check, if this is event the right namespace
        if (!operator.startsWith(namespace)) {
          return;
        }

        // Check if it has a valid operator name
        const result = operator.match(/.*\/(\w+)/);
        if (!result) {
          throw new Error(`operator ${operator} seems to be invalid`);
        }

        const [_, operatorName] = result;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const meta: Map<string, OperatorFn> = this['constructor'][
          OPERATOR_METADATA
        ];

        // Get the operator function
        const operatorFn = meta.get(operatorName);
        if (operatorFn) {
          return operatorFn(def, factory);
        }
      }
    };
  };
}

export interface RxJsOperatorDecorator {
  /**
   * Decorator that marks a class field as an input property and supplies configuration metadata.
   * The input property is bound to a DOM property in the template. During change detection,
   * Angular automatically updates the data property with the DOM property's value.
   *
   * @usageNotes
   *
   * You can supply an optional name to use in templates when the
   * component is instantiated, that maps to the
   * name of the bound property. By default, the original
   * name of the bound property is used for input binding.
   *
   * The following example creates a component with two input properties,
   * one of which is given a special binding name.
   *
   * ```typescript
   * @Component({
   *   selector: 'bank-account',
   *   template: `
   *     Bank Name: {{bankName}}
   *     Account Id: {{id}}
   *   `
   * })
   * class BankAccount {
   *   // This property is bound using its original name.
   *   @Input() bankName: string;
   *   // this property value is bound to a different property name
   *   // when this component is instantiated in a template.
   *   @Input('account-id') id: string;
   *
   *   // this property is not bound, and is not automatically updated by Angular
   *   normalizedBankName: string;
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `
   *     <bank-account bankName="RBC" account-id="4747"></bank-account>
   *   `
   * })
   * class App {}
   * ```
   *
   * @see [Input and Output properties](guide/inputs-outputs)
   */
  (bindingPropertyName?: string): any;
  new (bindingPropertyName?: string): any;
}

export interface RxJsOperator {
  /**
   * The name of the operator
   */
  name?: string;
}
export const RxJsOperator = makeOperatorDecorator;

export interface RxJsObservableDecorator {
  /**
   * Decorator that marks a class field as an input property and supplies configuration metadata.
   * The input property is bound to a DOM property in the template. During change detection,
   * Angular automatically updates the data property with the DOM property's value.
   *
   * @usageNotes
   *
   * You can supply an optional name to use in templates when the
   * component is instantiated, that maps to the
   * name of the bound property. By default, the original
   * name of the bound property is used for input binding.
   *
   * The following example creates a component with two input properties,
   * one of which is given a special binding name.
   *
   * ```typescript
   * @Component({
   *   selector: 'bank-account',
   *   template: `
   *     Bank Name: {{bankName}}
   *     Account Id: {{id}}
   *   `
   * })
   * class BankAccount {
   *   // This property is bound using its original name.
   *   @Input() bankName: string;
   *   // this property value is bound to a different property name
   *   // when this component is instantiated in a template.
   *   @Input('account-id') id: string;
   *
   *   // this property is not bound, and is not automatically updated by Angular
   *   normalizedBankName: string;
   * }
   *
   * @Component({
   *   selector: 'app',
   *   template: `
   *     <bank-account bankName="RBC" account-id="4747"></bank-account>
   *   `
   * })
   * class App {}
   * ```
   *
   * @see [Input and Output properties](guide/inputs-outputs)
   */
  (bindingPropertyName?: string): any;
  new (bindingPropertyName?: string): any;
}

export interface RxJsObservable {
  /**
   * The name of the observeable
   */
  name?: string;
}
export const RxJsObservable = makeObserveableDecorator;
