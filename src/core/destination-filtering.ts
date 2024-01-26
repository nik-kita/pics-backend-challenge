import { Destination } from "../types";

export function destinationsFiltering(
  { available, from_client }: {
    from_client: Destination[];
    available: Map<string, Destination>;
  },
): Destination[] {
  return from_client.filter((d) => available.has(d.name));
}
