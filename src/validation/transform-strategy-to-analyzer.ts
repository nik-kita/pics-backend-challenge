import { allStrategyAnalyzer } from "../core/all-strategy-analyzer";
import { anyStrategyAnalyzer } from "../core/any-strategy-analyzer";
import { Strategy } from "../types";
import { stringToPredicate } from "../utils/string-to-predicate";

export function transformStrategyToAnalyzer(strategy: string) {
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

  const analyzer = stringToPredicate(strategy);

  return analyzer
    ? {
      success: true,
      analyzer,
    } as const
    : { success: false } as const;
}
