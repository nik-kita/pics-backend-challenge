import { allStrategyAnalyzer } from "../core/all-strategy-analyzer";
import { anyStrategyAnalyzer } from "../core/any-strategy-analyzer";
import { Analyzer, Strategy } from "../types";
import { stringToAnalyzer } from "../utils/string-to-analyzer";

export function transformStrategyToAnalyzer(
  strategy: string,
): { success: false } | {
  success: true;
  analyzer: Analyzer;
} {
  if (strategy === "ALL" satisfies Strategy) {
    return {
      success: true,
      analyzer: allStrategyAnalyzer as Analyzer,
    } as const;
  } else if (strategy === "ANY" satisfies Strategy) {
    return {
      success: true,
      analyzer: anyStrategyAnalyzer as Analyzer,
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
