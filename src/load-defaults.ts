import { Destination } from "./types";
import { transformStrategyToAnalyzer } from "./validation/transform-strategy-to-analyzer";
import { config } from "dotenv";

export async function loadDefaults() {
  await config();
  console.log(process.env.PATH_TO_DEFAULT_CONFIGURATION);

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
