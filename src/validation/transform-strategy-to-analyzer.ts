import { allStrategyAnalyzer } from "../core/all-strategy-analyzer";
import { anyStrategyAnalyzer } from "../core/any-strategy-analyzer";
import { Analyzer, Strategy } from "../types";
import { stringToAnalyzer } from "../utils/string-to-analyzer";

export function transformStrategyToAnalyzer(
  strategy: string,
) {
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
    : {
      success: false,
      reason:
        "Custom strategy should be correct js function: (...args: unknown[]) => Record<string, boolean>",
    } as const;
}
