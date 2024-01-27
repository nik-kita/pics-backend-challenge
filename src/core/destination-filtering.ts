import { Destination, Event } from "../types";

export function destinationsFiltering(
  { available, from_client }: {
    from_client: Event["possibleDestinations"];
    available: Map<string, Destination>;
  },
): Event["possibleDestinations"] {
  return from_client.map((d) => {
    for (const k of Object.keys(d)) {
      if (!available.has(k)) d[k] = false;
    }

    return d;
  });
}
