import { allStrategyAnalyzer } from "../core/all-strategy-analyzer";
import { anyStrategyAnalyzer } from "../core/any-strategy-analyzer";
import { Event } from "../types";
import { validateAndTransformEvent } from "./validate-and-transform-event";

describe.each([
  allStrategyAnalyzer,
  anyStrategyAnalyzer,
  () => ({ ok: true }),
])("Check validateAndTransformEvent middleware", (defaultAnalyzer) => {
  it.each(
    [
      {
        body: {
          payload: "",
          possibleDestinations: [],
        },
      },
    ] satisfies { body: Event<boolean> }[],
  )("should validate and add default analyzer", (req) => {
    const middleware = validateAndTransformEvent(defaultAnalyzer);

    middleware(req as any, {} as any, () => ({}));

    expect((req.body as any).strategy.name).toBe(defaultAnalyzer.name);
  });
});
