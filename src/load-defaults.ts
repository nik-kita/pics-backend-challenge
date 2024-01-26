import { Destination } from "./types";
import { transformStrategyToAnalyzer } from "./validation/transform-strategy-to-analyzer";

// TODO
export function loadDefaults() {
  const analyzer_transformation = transformStrategyToAnalyzer(
    process.env.DEFAULT_ANALYZER_STRATEGY || "ALL",
  );

  if (!analyzer_transformation.success) {
    throw new Error("Incorrect default analyzer strategy");
  }

  return {
    analyzer: analyzer_transformation.analyzer,
    available_destinations: [
      {
        name: "this/is/not/completed",
        transport: "console.log",
      },
    ] satisfies Destination[],
  };
}
