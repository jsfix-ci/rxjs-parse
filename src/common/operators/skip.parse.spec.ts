/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { create } from '../../core/create';
import { Parser } from '../../interface/parser';
import { skipParse } from './skip.parse';

describe('common/rxjs/operators/skip', () => {
  let provider: Parser;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    provider = create().chain(skipParse);
  });
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  const operatorConfig = {
    operator: 'skip',
    args: {
      count: 2,
    },
  };

  it('should parse', () => {
    const operator = provider.parseOperator!(operatorConfig, provider);
    expect(operator).toBeDefined();
  });

  it('should skip', () => {
    const operator = provider.parseOperator!(operatorConfig, provider);

    const source$ = of(1, 2, 3).pipe(operator!);
    testScheduler.run(({ expectObservable }) => {
      const expectedMarble = '(a|)';
      const expectedIngredients = { a: 3 };
      expectObservable(source$).toBe(expectedMarble, expectedIngredients);
    });
  });
});
