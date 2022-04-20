# multik

Functional utility for control flow and conditional operator for functions.

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
  - [Simple predicate as value](#usage-simple-predicate)
  - [Custom predicate](#usage-custom-predicate)
  - [OR predicate](#usage-or-predicate)
  - [Default predicate](#usage-simple-predicate)
- [Use-cases](#use-cases)
- [Alternatives](#alternatives)
- [Contributing](#contributing)

---

## Installation

NPM

```shell
npm install multik
```

Yarn

```shell
yarn add multik
```

---

## Features

- 🐣 **small** API and size
- 🌊 **pipable**
- 🙌🏻 **usefull** access to data/selector in predicates

---

## Usage

**multik** is a single function:

```sh
multik(
  selectorFunction,
  ...predicatesAsAction,
);
```

### Simple predicate as value

### Custom predicate

### OR predicate

### Default predicate

---

## Use-cases

TODO

---

## Alternatives

Let's overview simple code with **multik**:

```ts
import multik from "multik";

const greet = multik(
  (data) => data.lang,
  ["english", () => "Hello"),
  ["french", () => "Bonjour")
);

greet({ id: 1, lang: "french" });
```

you can also consider alternatives

### Lodash (Ramda like libs)

If you love lodash and you dont want install multik - you can implement DIY multik yourself. 😉

```js
import _ from 'lodash';

const multik = (dispatcher, predicates) =>
  _.flow([
    (data) => dispatcher(data),
    _.cond([...predicates, [_.stubTrue, _.constant('no match')]]),
  ]);

const greet = multik(
  (data) => data.lang,
  [
    [(lang) => lang === 'english', () => 'Hello'],
    [(lang) => lang === 'french', () => 'Bonjour'],
  ],
);

greet({ id: 1, lang: 'french' }); // "Bonjour"
```

### @arrows/multimethod

Powerful multimethod library. You can

```ts
import { multi, method } from '@arrows/multimethod';

const greet = multi(
  (data) => action.lang,
  method('english', () => 'Hello'),
  method('french', () => 'Bonjour'),
  method(() => 'no match'),
);

greet({ id: 1, lang: 'french' }); // "Bonjour"
```

Also you can discover next libraries:

- [ts-multimethod](https://github.com/darky/ts-multimethod)
- [rubico switchCase](https://rubico.land/docs/switchCase)
- [ts-pattern](https://github.com/gvergnaud/ts-pattern)

## Contributing

Your feedback and contributions are welcome. If you have a suggestion, please raise an issue. Prior to that, please search through the issues first in case your suggestion has been made already. If you decide to work on an issue, or feel like taking initiative and contributing anything at all, feel free to create a pull request and I will get back to you shortly.
