/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TestScheduler } from 'rxjs/testing';

import { create } from '../core/create';
import { ObservableDefinition, Parser } from '../interface';
import { rxjsParsers } from './rxjs-parsers';

describe('common/rxjs', () => {
  let provider: Parser;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    provider = create().chain(rxjsParsers());
  });
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  const mockMapToValue = true;
  const mockDefinition: ObservableDefinition = {
    name: 'rxjs/range',
    args: {
      count: 2,
    },
    pipe: [
      {
        operator: 'rxjs/operators/mapTo',
        args: mockMapToValue,
      },
    ],
  };

  it('should create', () => {
    const obs$ = provider.parse(mockDefinition);

    // sync assertion
    expect(obs$).toBeDefined();
  });

  it('should behave correctly', () => {
    const obs$ = provider.parse(mockDefinition);

    testScheduler.run(({ expectObservable }) => {
      const expectedMarble = '(ab|)';
      const expectedIngredients = { a: mockMapToValue, b: mockMapToValue };
      expectObservable(obs$!).toBe(expectedMarble, expectedIngredients);
    });
  });
});
