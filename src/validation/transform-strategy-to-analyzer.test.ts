import { allStrategyAnalyzer } from "../core/all-strategy-analyzer";
import { anyStrategyAnalyzer } from "../core/any-strategy-analyzer";
import { Strategy } from "../types";
import { transformStrategyToAnalyzer } from "./transform-strategy-to-analyzer";

describe('Check "transformStrategyToAnalyzer" function', () => {
  it.each(
    [
      ["() => ({ ok: true });", "CUSTOM"],
      ["ALL", "ALL"],
      ["ANY", "ANY"],
    ] satisfies [string, (Strategy | "CUSTOM")][],
  )(
    'The "%s" strategy should be transformed as %s analyzer',
    (str, analyzerType) => {
      const result = transformStrategyToAnalyzer(str);
      if (!result.success) {
        expect("not").toBe("here");
      } else {
        expect(typeof result.analyzer).toBe("function");
        if (analyzerType === "ALL") {
          expect(result.analyzer.name).toBe(allStrategyAnalyzer.name);
        } else if (analyzerType === "ANY") {
          expect(result.analyzer.name).toBe(anyStrategyAnalyzer.name);
        }
      }
    },
  );
});
