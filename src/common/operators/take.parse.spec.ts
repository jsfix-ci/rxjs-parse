/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { create } from '../../core/create';
import { Parser } from '../../interface/parser';
import { takeParse } from './take.parse';

describe('common/rxjs/operators/take', () => {
  let provider: Parser;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    provider = create().chain(takeParse);
  });
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  const operatorConfig = {
    operator: 'take',
    args: {
      count: 2,
    },
  };

  it('should parse', () => {
    const operator = provider.parseOperator!(operatorConfig, provider);
    expect(operator).toBeDefined();
  });

  it('should take', () => {
    const operator = provider.parseOperator!(operatorConfig, provider);

    const source$ = of(1, 2, 3).pipe(operator!);
    testScheduler.run(({ expectObservable }) => {
      const expectedMarble = '(ab|)';
      const expectedIngredients = { a: 1, b: 2 };
      expectObservable(source$).toBe(expectedMarble, expectedIngredients);
    });
  });
});
