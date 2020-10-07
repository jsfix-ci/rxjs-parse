import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { RxJsCommonProvider } from './rxjs';

describe('common/rxjs', () => {
  let provider: RxJsCommonProvider;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    provider = new RxJsCommonProvider();
  });
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('observeables', () => {
    const mockPropName = 'some-prop';
    const mockObj = {
      [mockPropName]: 5,
    };

    it('range', () => {
      const source$ = provider.range({
        operator: 'rxjs/range',
        args: {
          start: 1,
          count: 5,
        },
      });

      testScheduler.run(({ expectObservable }) => {
        const expectedMarble = '(abcde|)';
        const expectedIngredients = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
        expectObservable(source$).toBe(expectedMarble, expectedIngredients);
      });
    });
    it('parse', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const source$ = provider.parseSource({
        name: 'rxjs/range',
        args: {
          start: 1,
          count: 5,
        },
      });

      testScheduler.run(({ expectObservable }) => {
        const expectedMarble = '(abcde|)';
        const expectedIngredients = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
        expectObservable(source$).toBe(expectedMarble, expectedIngredients);
      });
    });
  });

  describe('operators', () => {
    const mockPropName = 'some-prop';
    const mockObj = {
      [mockPropName]: 5,
    };

    const operatorConfig = {
      operator: 'rxjs/pluck',
      args: [mockPropName],
    };

    const a = mockObj[mockPropName];
    it('pluck', () => {
      const operator = provider.pluck(operatorConfig);
      const source$ = of(mockObj).pipe(operator);

      testScheduler.run(({ expectObservable }) => {
        const expectedMarble = '(a|)';
        const expectedIngredients = { a };
        expectObservable(source$).toBe(expectedMarble, expectedIngredients);
      });
    });
    it('parse', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const operator = provider.parseOperator(operatorConfig);
      const source$ = of(mockObj).pipe(operator);

      testScheduler.run(({ expectObservable }) => {
        const expectedMarble = '(a|)';
        const expectedIngredients = { a };
        expectObservable(source$).toBe(expectedMarble, expectedIngredients);
      });
    });
  });
});
