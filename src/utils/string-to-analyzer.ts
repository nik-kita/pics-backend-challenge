export function stringToAnalyzer(
  str: string,
): ((arg: unknown[]) => boolean) | null {
  try {
    const fn = eval(str) as (arg: unknown) => unknown;
    Function.prototype.toString.call(fn);

    if (typeof fn([]) === "boolean") {
      return fn as (arg: unknown[]) => boolean;
    }

    throw new Error(
      "The function created from given string is not valid array-predicate",
    );
  } catch (_) {
    return null;
  }
}
