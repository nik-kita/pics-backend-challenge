import { anyStrategyAnalyzer } from "./any-strategy-analyzer";

describe("Analyze possible destinations with ANY strategy should work", () => {
  it.each([
    [
      [{ a: true }, { a: true }],
      { a: true },
    ],
    [
      [{ a: true, b: true }, { a: true, b: false }],
      { a: true, b: true },
    ],
    [
      [{ a: true, b: false }, { a: false, b: true }],
      { a: true, b: true },
    ],
    [
      [{ a: true, d: false }, { b: true, a: true }, {
        a: false,
        b: false,
        c: true,
      }],
      { a: true, b: true, c: true, d: false },
    ],
  ] as [Record<string, boolean>[], Record<string, boolean>][])(
    "test-case №%#",
    (possibleDestinations, expected) => {
      const actual = anyStrategyAnalyzer(possibleDestinations);

      expect(actual).toEqual(expected);
    },
  );
});
