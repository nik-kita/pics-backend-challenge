import { Destination, Event } from "../types";
import { destinationsFiltering } from "./destination-filtering";

describe("Check destinationFiltering function", () => {
  it.each(
    [
      {
        available: new Map(([
          {
            name: "first",
            transport: "console.log",
          },
          {
            name: "second",
            transport: "http.get",
            url: "http://localhost:3000",
          },
        ] as Destination[]).map((d) => [d.name, d])),
        expected: [
          {
            unexpected: false,
            transport: false,
          },
        ],
        from_client: [
          {
            unexpected: true,
            transport: false,
          },
        ],
      },
      {
        available: new Map(([
          {
            name: "first",
            transport: "console.log",
          },
          {
            name: "second",
            transport: "http.get",
            url: "http://localhost:3000",
          },
        ] as Destination[]).map((d) => [d.name, d])),
        expected: [
          {
            unexpected: false,
          },
          {
            first: true,
          },
        ],

        from_client: [
          {
            unexpected: true,
          },
          {
            first: true,
          },
        ],
      },
    ] as {
      from_client: Event["possibleDestinations"];
      available: Map<string, Destination>;
      expected: Event["possibleDestinations"];
    }[],
  )("%# test-case", ({ available, expected, from_client }) => {
    expect(destinationsFiltering({ from_client, available })).toEqual(expected);
  });
});
