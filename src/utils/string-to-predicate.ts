export function stringToPredicate(str: string): Function | null {
  try {
    const fn = eval(str) as Function;
    Function.prototype.toString.call(fn);

    if (typeof fn([]) === "boolean") {
      return fn;
    }

    throw new Error(
      "The function created from given string is not valid array-predicate",
    );
  } catch (err) {
    console.warn(err);

    return null;
  }
}
