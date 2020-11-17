/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { create } from '../../core/create';
import { Parser } from '../../interface/parser';
import { mapToParse } from './map-to.parse';

describe('common/rxjs/operators/map-to', () => {
  let provider: Parser;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    provider = create().chain(mapToParse);
  });
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  const mockValue = 'mock-some-value';

  const operatorConfig = {
    operator: 'mapTo',
    args: mockValue,
  };

  it('should be defined', () => {
    const operator = provider.parseOperator!(operatorConfig, provider);

    // sync assertion
    expect(operator).toBeDefined();
  });

  it('should map to', () => {
    const operator = provider.parseOperator!(operatorConfig, provider);

    // async assertion
    const source$ = of(1, 2, 3).pipe(operator!);
    testScheduler.run(({ expectObservable }) => {
      const expectedMarble = '(abc|)';
      const expectedIngredients = { a: mockValue, b: mockValue, c: mockValue };
      expectObservable(source$).toBe(expectedMarble, expectedIngredients);
    });
  });
});
