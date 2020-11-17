/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { create } from '../../core/create';
import { Parser } from '../../interface/parser';
import { firstParse } from './first.parse';

describe('common/rxjs/operators/first', () => {
  let provider: Parser;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    provider = create().chain(firstParse);
  });
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  const operatorConfig = {
    operator: 'first',
    args: {},
  };

  it('should parse', () => {
    const operator = provider.parseOperator!(operatorConfig, provider);
    expect(operator).toBeDefined();
  });

  it('should pipe "first"', () => {
    const operator = provider.parseOperator!(operatorConfig, provider);

    const source$ = of(1, 2, 3).pipe(operator!);
    testScheduler.run(({ expectObservable }) => {
      const expectedMarble = '(a|)';
      const expectedIngredients = { a: 1 };
      expectObservable(source$).toBe(expectedMarble, expectedIngredients);
    });
  });
});
