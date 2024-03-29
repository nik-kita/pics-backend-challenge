import { Analyzer } from "../types";
import { stringToAnalyzer } from "./string-to-analyzer";

describe("Check string as valid array-predicate function", () => {
  it.each([
    ["console.debug", "is not"],
    ["() => {}", "is"],
    ["() => ({ ok: true });", "is"],
    ["{}", "is not"],
    ["", "is not"],
    ["() => { return false; }", "is not"],
    ["() => true", "is not"],
    ["() => { ok: true }", "is"],
    ["() => { ok: true, not_ok: false }", "is"],
  ])(
    "eval('%s') %s of type () => boolean",
    ([str, _isValid]) => {
      const isValid = _isValid === "is";
      const fn = stringToAnalyzer(str);

      if (isValid) {
        expect(typeof fn).toBe("function");
        const result = fn as Analyzer;
        expect(Object.values(result([])).every((v) => typeof v === "boolean"))
          .toBe(true);
      } else {
        expect(fn).toBeNull();
      }
    },
  );
});
