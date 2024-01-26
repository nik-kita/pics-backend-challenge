import { stringToAnalyzer } from "./string-to-analyzer";

describe("Check string as valid array-predicate function", () => {
  it.each([
    ["console.log", "is not"],
    ["() => {}", "is not"],
    ["{}", "is not"],
    ["", "is not"],
    ["() => { return false; }", "is"],
    ["() => true", "is"],
  ])(
    "eval('%s') %s of type () => boolean",
    ([str, _isValid]) => {
      const isValid = _isValid === "is";
      const fn = stringToAnalyzer(str);

      if (isValid) {
        expect(typeof fn).toBe("function");
        expect(typeof (fn as (arg: unknown) => boolean)([])).toBe("boolean");
      } else {
        expect(fn).toBeNull();
      }
    },
  );
});
