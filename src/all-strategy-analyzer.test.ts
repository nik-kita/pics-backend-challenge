import { allStrategyAnalyzer } from "./all-strategy-analyzer";

describe("Analyze possible destinations with ALL strategy should work", () => {
  it.each(
    [
      [
        [{ a: true }, { a: true }],
        { a: true },
      ],
      [
        [{ a: true, b: true }, { a: true, b: false }],
        { a: true, b: false },
      ],
      [
        [{ a: true, b: false }, { a: false, b: true }],
        { a: false, b: false },
      ],
      [
        [{ a: true }, { b: true, a: true }, { a: false, b: false, c: true }],
        { a: false, b: false, c: true },
      ],
    ] as [Record<string, boolean>[], Record<string, boolean>][],
  )(
    "test-case №%#",
    (possibleDestinations, expected) => {
      const actual = allStrategyAnalyzer(possibleDestinations);

      expect(actual).toEqual(expected);
    },
  );
});
