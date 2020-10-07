![CI](https://github.com/ckapps/rxjs-parse/workflows/CI/badge.svg)
[![npm version](https://badge.fury.io/js/%40ckapp%2Frxjs-parse.svg)](https://www.npmjs.com/@ckapp/rxjs-parse)
[![Coverage Status](https://coveralls.io/repos/github/ckapps/rxjs-parse/badge.svg?branch=master)](https://coveralls.io/github/ckapps/rxjs-parse?branch=master)

# @ckapp/rxjs-parse

Dynamic creation of `rxjs` observables and operators from data.

## Branches / Versions

- [master](https://github.com/ckapps/rxjs-parse/commits/master) - Contains the most recent and unreleased changes
- [stable](https://github.com/ckapps/rxjs-parse/tree/release/stable/1.x) - Contains the latest version you'd get if you do `npm install @ckapp/rxjs-parse`

Most PRs should be made to **master**.

Check our [branching and release strategy](https://github.com/ckapps/.github/blob/master/docs/branching.md).

## Installation and Usage

### ES6 via npm

```sh
npm i @ckapp/rxjs-parse
```

### Usage

1. Create a parser
2. Chain other parsers
3. Use parser

```ts
import { create } from '@ckapp/rxjs-parse/core';
import { rxjsParsers } from '@ckapp/rxjs-parse/common';

// Create a parser
const parser = create().chain(
  // Chain specific parsers
  rxjsParsers()
);

// Create observables
const observable = parser.parse(...);
```

## Building/Testing

- `npm test` run tests
