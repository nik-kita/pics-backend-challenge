import { z } from "zod";
import { Event, Strategy } from "../types";

const EventDto: z.ZodType<Event> = z.object(
  {
    possibleDestinations: z.array(
      z.record(z.string(), z.boolean()).and(
        z.custom((v) => Object.keys(v || {}).length, {
          message: "should not be empty",
        }),
      ),
    ),
    payload: z.custom<z.ZodUnknown>((v) => v !== undefined, {
      message: "should be defined",
    }),
    strategy: z.string().optional(),
  } satisfies Record<keyof Event, unknown>,
).strict();

describe("EventDto", () => {
  it.each(
    [
      {
        value: {},
        invalid_paths: ["payload", "possibleDestinations"],
      },
      {
        value: { payload: null, possibleDestinations: [], unexpected: true },
        invalid_paths: [],
      },
      {
        value: { payload: {}, possibleDestinations: {}, strategy: "ALL" },
        invalid_paths: ["possibleDestinations"],
      },
      {
        value: {
          payload: {},
          possibleDestinations: [{ ok: true }, { ok: false, wtf: "wtf" }],
          strategy: "ALL",
        },
        invalid_paths: ["possibleDestinations"],
      },
      {
        value: { payload: {}, possibleDestinations: [{}, {}], strategy: "ALL" },
        invalid_paths: ["possibleDestinations"],
      },
      {
        value: {
          payload: {},
          possibleDestinations: [{
            ok: true,
          }, {}],
          strategy: "ALL",
        },
        invalid_paths: ["possibleDestinations"],
      },
      {
        value: {
          payload: {},
          possibleDestinations: [{
            is_not_boolean: "oops",
          }],
          strategy: "ALL",
        },
        invalid_paths: ["possibleDestinations"],
      },
    ] satisfies { value: unknown; invalid_paths: (keyof Event)[] }[],
  )("Should not pass validation for $value", ({ value, invalid_paths }) => {
    const parseResult = EventDto.safeParse(value);
    if (parseResult.success) {
      expect("not").toBe("here");
    } else {
      for (const invalid_path of invalid_paths) {
        const is_error_detected = parseResult
          .error
          .errors
          .some((err) => err.path.includes(invalid_path));
        expect(invalid_path).toBe(is_error_detected && invalid_path);
      }
    }
  });

  it.each(
    [
      { payload: null, possibleDestinations: [] },
      {
        payload: {},
        possibleDestinations: [{
          d: true,
          d2: false,
        }],
        strategy: "ALL",
      },

      {
        payload: {},
        possibleDestinations: [{ d: true }, { d: false, d2: true }],
        strategy: "ALL",
      },
    ] satisfies Event[],
  )("Should pass validation for %o", (value) => {
    const parseResult = EventDto.safeParse(value);
    if (!parseResult.success) {
      expect("not").toBe("here");
    }
  });
});
