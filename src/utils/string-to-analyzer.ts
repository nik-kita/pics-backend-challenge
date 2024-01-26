import { Analyzer } from "../types";

export function stringToAnalyzer(
  str: string,
): Analyzer | null {
  try {
    const fn = eval(str) as Analyzer;
    Function.prototype.toString.call(fn);

    if (Object.values(fn([])).every((v) => typeof v === "boolean")) {
      return fn as Analyzer;
    }

    throw new Error(
      "The function created from given string is not valid array-predicate",
    );
  } catch (_) {
    return null;
  }
}
