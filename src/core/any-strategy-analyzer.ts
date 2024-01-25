import { Event } from "../types";

export function anyStrategyAnalyzer(
  possibleDestinations: Event["possibleDestinations"],
) {
  return possibleDestinations.reduce((acc, variant) => {
    for (const [k, v] of Object.entries(variant)) {
      if (!acc[k]) {
        acc[k] = v;
      }
    }

    return acc;
  }, {} as Record<string, boolean>);
}
