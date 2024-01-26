export type Transport = TransportTypeMap[keyof TransportTypeMap];
export type Analyzer =
  | ((args: unknown[]) => Record<string, boolean>)
  | ((args: Record<string, boolean>[]) => Record<string, boolean>);
export type Event<T = false> = {
  payload: unknown;
  possibleDestinations: Record<string, boolean>[];
  strategy?: T extends false ? (Strategy | string)
    : Analyzer;
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
