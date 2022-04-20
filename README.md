# multik 🤹🏼‍♂️

Functional utility for control flow and conditional operator for functions.

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
  - Simple predicate as value
  - Custom predicate
  - OR predicate
  - Default predicate
- [Use-cases](#use-cases)
- [Typescript](#typescript)
- [Alternatives](#alternatives)
- [Contributing](#contributing)

## Installation

NPM

```shell
npm install multik
```

Yarn

```shell
yarn add multik
```

## Features

- 🐣 **small** API and size
- 🌊 **pipable**
- 🙌🏻 **usefull** access to data/selector in predicates
- 🔗 **better** typing

## Usage

**multik** is a single function:

```sh
multik(
  selectorFunction,
  ...predicatesAsAction,
);
```

### Simple predicate as value

Matching **Number** values

```ts
import multik from 'multik';

const nominalDegreesOfThousand = multik(
  (n: number) => n,
  [1000, () => 'thousand'],
  [1000000, () => 'million'],
  [1000000000, () => 'billion'],
  [1000000000000, () => 'trillion'],
  [1000000000000000, () => 'quadrillion'],
);

nominalDegreesOfThousand(1000); // 'thousand'
nominalDegreesOfThousand(1000000); // 'million'
nominalDegreesOfThousand(1000000000); // 'billion'
nominalDegreesOfThousand(1000000000000); // 'trillion'
nominalDegreesOfThousand(1000000000000000); // 'quadrillion'
```

Matching **String** values

```ts
import multik from 'multik';

const greet = multik(
  (data) => data.lang,
  ["english", () => "Hello"),
  ["french", () => "Bonjour")
);

greet({ id: 1, lang: "french" }); // "Bonjour"
```

Matching **Array** values

```js
import multik from 'multik';

const shot = multik(
  (data) => data.coord,
  [[30, 40], () => 'hitted!'],
  [[90, 40], () => 'hitted your building!'],
);

shot({ coord: [30, 40] }); // "hitted!"
shot({ coord: [90, 40] }); // "hitted your building!"
shot({ coord: [0, 0] }); // undefined
```

Matching **Object** values

```ts
import multik from 'multik';

interface Response {
  code: number;
}

const getResult = multik(
  (data: Response) => data,
  [{ code: 200 }, () => 'complete'],
  [{ code: 500 }, () => 'error'],
);

getResult({ code: 200 }); // "complete"
getResult({ code: 500 }); // "error"
```

### Custom predicate

```ts
import multik from 'multik';

const fizzBuzz = multik(
  (n: number) => n,
  [(n) => n % 3 === 0 && n % 5 === 0, () => 'FizzBuzz'],
  [(n) => n % 3 === 0, () => 'Fizz'],
  [(n) => n % 5 === 0, () => 'Buzz'],
);

fizzBuzz(3); // "Fizz"
fizzBuzz(5); // "Buzz"
fizzBuzz(15); // "Buzz"
```

### OR predicate

```ts
import multik from 'multik';

enum UserRole {
  Admin = 'admin',
  Guest = 'guest',
  Editor = 'editor',
}
type User = { fullname: string; age: number; role: UserRole };

const adminUser: User = { fullname: 'John Smith', age: 20, role: UserRole.Admin };
const guestUser: User = { fullname: 'Evan Martinez', age: 24, role: UserRole.Guest };
const editorUser: User = { fullname: 'Tod Parker', age: 17, role: UserRole.Editor };

const getInformation = multik(
  (data: User) => data.role,
  [[UserRole.Admin, UserRole.Editor], () => 'secret information'],
  [UserRole.Guest, () => 'no access'],
);

getInformation(adminUser); // "secret information"
getInformation(editorUser); // "secret information"
getInformation(guestUser); // "no access"
```

### Default predicate

```ts
import multik from 'multik';

const greet = multik(
  (data) => data.lang,
  ["english", () => "Hello"),
  ["french", () => "Bonjour"),
  [() => 'not matched'] // default method
);

greet({ id: 1, lang: "germany" }); // "not matched"
```

## Use-cases

TODO

## Typescript

TODO

## Alternatives

Let's overview simple code with **multik**:

```ts
import multik from "multik";

const greet = multik(
  (data) => data.lang,
  ["english", () => "Hello"),
  ["french", () => "Bonjour")
);

greet({ id: 1, lang: "french" }); // "Bonjour"
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
