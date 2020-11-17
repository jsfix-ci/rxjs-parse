/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TestScheduler } from 'rxjs/testing';

import { create } from '../core/create';
import { Parser } from '../interface/parser';

import { rangeParse } from './range.parse';

describe('common/rxjs/parse', () => {
  let provider: Parser;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    provider = create().chain(rangeParse);
  });
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should parse', () => {
    const source$ = provider.parseObservable!(
      {
        name: 'range',
        args: {},
      },
      provider,
    );

    expect(source$).toBeDefined();
  });

  it('range', () => {
    const source$ = provider.parseObservable!(
      {
        name: 'range',
        args: {
          start: 1,
          count: 5,
        },
      },
      provider,
    );

    testScheduler.run(({ expectObservable }) => {
      const expectedMarble = '(abcde|)';
      const expectedIngredients = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
      expectObservable(source$!).toBe(expectedMarble, expectedIngredients);
    });
  });
});
