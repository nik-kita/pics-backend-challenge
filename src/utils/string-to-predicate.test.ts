import { stringToPredicate } from "./string-to-predicate";

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
      const fn = stringToPredicate(str);

      if (isValid) {
        expect(typeof fn).toBe("function");
        expect(typeof (fn as Function)([])).toBe("boolean");
      } else {
        expect(fn).toBeNull();
      }
    },
  );
});
