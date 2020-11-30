# Code for blogpost

This is just an experiment for fun - don't use in production.

```js
const abc = ({ a, b, c }) => [a, b, c];

const curried = curry(abc);

curried({ a: 1 })({ b: 2 })({ c: 3 });
// [1, 2, 3]
curried({ a: 1, b: 2 })({ c: 3 });
// [1, 2, 3]
curried({ a: 1, b: 2, c: 3 });
// [1, 2, 3]

// In different order
curried({ c: 3 })({ b: 2 })({ a: 1 });
// [1, 2, 3]
curried({ c: 3, b: 2 })({ a: 1 });
// [1, 2, 3]

// ...
```

## See also

https://docs-lodash.com/v4/curry/

```js
var abc = function (a, b, c) {
  return [a, b, c];
};

var curried = _.curry(abc);

curried(1)(2)(3);
// => [1, 2, 3]

curried(1, 2)(3);
// => [1, 2, 3]

curried(1, 2, 3);
// => [1, 2, 3]

// Curried with placeholders.
curried(1)(_, 3)(2);
// => [1, 2, 3]
```

https://docs-lodash.com/v4/curry-right/

```js
var abc = function (a, b, c) {
  return [a, b, c];
};

var curried = _.curryRight(abc);

curried(3)(2)(1);
// => [1, 2, 3]

curried(2, 3)(1);
// => [1, 2, 3]

curried(1, 2, 3);
// => [1, 2, 3]

// Curried with placeholders.
curried(3)(1, _)(2);
// => [1, 2, 3]
```
