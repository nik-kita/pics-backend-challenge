import { allStrategyAnalyzer } from "../core/all-strategy-analyzer";
import { anyStrategyAnalyzer } from "../core/any-strategy-analyzer";
import { Event, Strategy } from "../types";
import { stringToAnalyzer } from "../utils/string-to-analyzer";

export function transformStrategyToAnalyzer(
  strategy: string,
): { success: false } | {
  success: true;
  analyzer: (arg: Event["possibleDestinations"]) => unknown;
} {
  if (strategy === "ALL" satisfies Strategy) {
    return {
      success: true,
      analyzer: allStrategyAnalyzer,
    } as const;
  } else if (strategy === "ANY" satisfies Strategy) {
    return {
      success: true,
      analyzer: anyStrategyAnalyzer,
    } as const;
  }

  const analyzer = stringToAnalyzer(strategy);

  return analyzer
    ? {
      success: true,
      analyzer,
    } as const
    : { success: false } as const;
}
