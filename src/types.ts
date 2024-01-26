export type Transport = TransportTypeMap[keyof TransportTypeMap];
export type Event = {
  payload: unknown;
  possibleDestinations: Record<string, boolean>[];
  strategy?: Strategy | string;
};
export type Strategy = "ALL" | "ANY";
export type Destination = {
  name: string;
} & Transport;

type TransportTypeMap = {
  http: {
    transport: `http.${"get" | "post" | "put"}`;
    url: string;
  };
  console: {
    transport: `console.${"log" | "warn"}`;
  };
};
