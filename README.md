<div style="text-align: center;">

![CI][ci-main-badge]
[![Coverage Status][cov-badge]][cov-url]
[![semantic-release: angular][dep-semantic-release-badge]][dep-semantic-release-url]

</div>
<div style="text-align: center;">

[![npm version][npm-latest-badge]][npm-latest-url]
[![npm version][npm-next-badge]][npm-next-url]

</div>

# @ckapp/rxjs-parse

Dynamic creation of `rxjs` observables and operators from data.

## Branches / Versions

- [main][repo-branch-main] - Contains the most recent version

```sh
npm install @ckapp/rxjs-parse
```

- [next][repo-branch-next] - Contains the next version

```sh
npm install @ckapp/rxjs-parse@next
```

Most PRs should be made to `main`.

Check our [branching and release strategy][org-docs-branching].

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

[ci-main-badge]: https://github.com/ckapps/rxjs-parse/workflows/CI/badge.svg
[cov-badge]: https://coveralls.io/repos/github/ckapps/rxjs-parse/badge.svg?branch=main
[cov-url]: https://coveralls.io/github/ckapps/rxjs-parse?branch=main
[dep-semantic-release-badge]: https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release
[dep-semantic-release-url]: https://github.com/semantic-release/semantic-release
[npm-latest-badge]: https://img.shields.io/npm/v/@ckapp/rxjs-parse/latest.svg
[npm-latest-url]: https://www.npmjs.com/@ckapp/rxjs-parse
[npm-next-badge]: https://img.shields.io/npm/v/@ckapp/rxjs-parse/next.svg
[npm-next-url]: https://www.npmjs.com/@ckapp/rxjs-parse
[org-docs-branching]: https://github.com/ckapps/.github/blob/main/docs/branching.md
[repo-branch-main]: https://github.com/ckapps/rxjs-parse/commits/main
[repo-branch-next]: https://github.com/ckapps/rxjs-parse/tree/next
