import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { create } from '../core/create';
import { Parser } from '../interface/parser';

import { rxjsParsers } from './rxjs';

describe('common/rxjs', () => {
  let provider: Parser;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    provider = create();
    provider.chain(rxjsParsers());
  });
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('observeables', () => {
    it('range', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const source$ = provider.parseObservable({
        name: 'rxjs/range',
        args: {
          start: 1,
          count: 5,
        },
      });

      // sync assertion
      expect(source$).toBeDefined();
      if (!source$) {
        return;
      }

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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const operator = provider.parseOperator(operatorConfig);

      // sync assertion
      expect(operator).toBeDefined();
      if (!operator) {
        return;
      }

      // async assertion
      const source$ = of(mockObj).pipe(operator);
      testScheduler.run(({ expectObservable }) => {
        const expectedMarble = '(a|)';
        const expectedIngredients = { a };
        expectObservable(source$).toBe(expectedMarble, expectedIngredients);
      });
    });
  });
});
