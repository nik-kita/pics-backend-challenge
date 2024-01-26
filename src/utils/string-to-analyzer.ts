export function stringToAnalyzer(
  str: string,
): ((arg: unknown[]) => Record<string, boolean>) | null {
  try {
    const fn = eval(str) as (arg: unknown[]) => Record<string, boolean>;
    Function.prototype.toString.call(fn);

    if (Object.values(fn([])).every((v) => typeof v === "boolean")) {
      return fn as (arg: unknown[]) => Record<string, boolean>;
    }

    throw new Error(
      "The function created from given string is not valid array-predicate",
    );
  } catch (_) {
    return null;
  }
}
