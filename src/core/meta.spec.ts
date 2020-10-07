import { Observable, of, range } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { RxJsObservable, RxJsOperator, RxJsProvider } from './meta';
import { SourceOperatorDefinition } from './types';

describe('core/meta', () => {
  const mockOperatorFn = jest.fn();
  const mockObserveableFn = jest.fn().mockImplementation(v => of(v));

  @RxJsProvider({
    namespace: 'test',
  })
  class MockProvider {
    @RxJsObservable()
    someObservable(def: SourceOperatorDefinition<unknown>) {
      return of(def.args);
    }

    @RxJsOperator('operator')
    someOperator(def: SourceOperatorDefinition<string[]>) {
      return tap(next => mockOperatorFn(next));
    }
  }

  let testScheduler: TestScheduler;
  let provider: MockProvider;
  beforeEach(() => {
    provider = new MockProvider();
  });
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('source', () => {
    const observeableConfig = {
      name: 'test/someObservable',
      args: { 'mock-arg': true },
    };
    it('should create', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const source$ = provider.parseSource(observeableConfig);

      testScheduler.run(({ expectObservable }) => {
        const expectedMarble = '(a|)';
        const expectedIngredients = { a: observeableConfig.args };
        expectObservable(source$).toBe(expectedMarble, expectedIngredients);
      });
    });
  });
  describe('operator', () => {
    const operatorConfig = {
      operator: 'test/operator',
      args: ['test'],
    };

    it('should create', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const operator = provider.parseOperator(operatorConfig);
      const source$ = range(0, 1).pipe(operator);

      testScheduler.run(({ expectObservable }) => {
        const expectedMarble = '(a|)';
        const expectedIngredients = { a: 0, b: 1 };
        expectObservable(source$).toBe(expectedMarble, expectedIngredients);
      });
    });
  });
});
