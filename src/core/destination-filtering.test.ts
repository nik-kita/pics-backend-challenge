import { Destination } from "../types";
import { destinationsFiltering } from './destination-filtering';


describe("Check destinationFiltering function", () => {
  it.each(
    [
      {
        available: new Map(([
          {
            name: 'first',
            transport: 'console.log',
          },
          {
            name: 'second',
            transport: 'http.get',
            url: 'http://localhost:3000',
          },
        ] as Destination[]).map((d) => [d.name, d])),
        expected: [],
        from_client: [
          {
            name: 'unexpected',
            transport: 'console.log',
          },
        ],
      },
      {
        available: new Map(([
          {
            name: 'first',
            transport: 'console.log',
          },
          {
            name: 'second',
            transport: 'http.get',
            url: 'http://localhost:3000',
          },
        ] as Destination[]).map((d) => [d.name, d])),
        expected: [
          {
            name: 'first',
            transport: 'console.log',
          },
        ],
        from_client: [
          {
            name: 'unexpected',
            transport: 'console.log',
          },
          {
            name: 'first',
            transport: 'console.log',
          },
        ],
      }
    ] satisfies {
      from_client: Destination[];
      available: Map<string, Destination>;
      expected: Destination[];
    }[],
  )("%# test-case", ({ available, expected, from_client }) => {
    expect(destinationsFiltering({ from_client, available })).toEqual(expected);
  });
});
