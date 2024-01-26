import { Analyzer } from "../types";
import { z } from "zod";

export function stringToAnalyzer(
  str: string,
): Analyzer | null {
  try {
    const fn = eval(str) as Analyzer;
    Function.prototype.toString.call(fn);
    z.record(z.string(), z.boolean()).parse(fn([]));
    return fn as Analyzer;
  } catch (_) {
    return null;
  }
}
