/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { create } from '../../core/create';
import { Parser } from '../../interface/parser';
import { pluckParse } from './pluck.parse';

describe('common/rxjs/operators/pluck', () => {
  let provider: Parser;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    provider = create().chain(pluckParse);
  });
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  const mockPropName = 'some-prop';
  const mockObj = {
    [mockPropName]: 5,
  };

  const operatorConfig = {
    operator: 'pluck',
    args: [mockPropName],
  };

  const a = mockObj[mockPropName];

  it('should parse', () => {
    const operator = provider.parseOperator!(operatorConfig, provider);

    // sync assertion
    expect(operator).toBeDefined();
  });

  it('pluck', () => {
    const operator = provider.parseOperator!(operatorConfig, provider);

    // async assertion
    const source$ = of(mockObj).pipe(operator!);
    testScheduler.run(({ expectObservable }) => {
      const expectedMarble = '(a|)';
      const expectedIngredients = { a };
      expectObservable(source$).toBe(expectedMarble, expectedIngredients);
    });
  });
});
