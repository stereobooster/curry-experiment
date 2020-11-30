import reflector from "js-function-reflector";

const memoize = (fn) => {
  const store = new WeakMap();
  return (arg) => {
    if (!store.has(arg)) {
      store.set(arg, fn(arg));
    }
    return store.get(arg);
  };
};

const getMinMax = memoize((fn) => {
  try {
    const reflectedArgs = reflector(fn).args;
    const lastParameter = reflectedArgs[reflectedArgs.length - 1];
    const isRestParameter = lastParameter && lastParameter.includes("...");
    const isObjectArg = lastParameter && lastParameter.includes("}");
    const min = reflectedArgs.filter(
      (x) => !Array.isArray(x) && (isObjectArg ? !x.includes("...") : true)
    ).length;
    const max = isRestParameter ? Infinity : reflectedArgs.length;
    return [min, max, isObjectArg];
  } catch {
    // failed to do reflection
    return [fn.length, fn.length, undefined];
  }
});

const emptyObj = {};
export const curry = (fn, args1 = emptyObj) => {
  const [min, max, isObject] = getMinMax(fn);
  if (fn.length !== 1 || !isObject) {
    throw new TypeError(`Expect function with one object argument`);
  }
  const curriedFunction = (args2) => {
    if (Object.keys(args2).length === 0) {
      throw new TypeError(`Expects at least one argument`);
    }
    const fullArgs = { ...args1, ...args2 };
    if (Object.keys(fullArgs).length > max) {
      throw new TypeError(
        `Expected ${min - Object.keys(args1).length}...${
          max - Object.keys(args1).length
        } arguments, but got ${args2.length}`
      );
    }
    if (Object.keys(fullArgs).length >= min) {
      return fn(fullArgs);
    }
    return curry(fn, fullArgs);
  };
  curriedFunction.toString = () =>
    `/* curried[${Object.keys(args1).length}/${min}...${max}] */ ${fn}`;
  return curriedFunction;
};
