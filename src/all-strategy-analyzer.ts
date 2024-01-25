import { Event } from "./types";

export function allStrategyAnalyzer(
  possibleDestinations: Event["possibleDestinations"],
) {
  return possibleDestinations.reduce((acc, variant) => {
    for (const [k, v] of Object.entries(variant)) {
      if (acc[k] === undefined) {
        acc[k] = v;
      } else if (acc[k] && !v) {
        acc[k] = v;
      }
    }

    return acc;
  }, {} as Record<string, boolean>);
}
