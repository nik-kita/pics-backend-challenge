import { z } from "zod";
import { Destination, TransportTypeMap } from "../types";

const HttpTransportDto = z.object({
  transport: z.string().regex(/http.(post|get|put)/) as z.ZodType<
    TransportTypeMap["http"]["transport"]
  >,
  url: z.string(),
}) satisfies z.ZodType<TransportTypeMap["http"]>;
const ConsoleTransportDto = z.object({
  transport: z.string().regex(/console.(warn|log)/) as z.ZodType<
    TransportTypeMap["console"]["transport"]
  >,
}) satisfies z.ZodType<TransportTypeMap["console"]>;
export const DestinationDto = z.array(
  z.object({ name: z.string() }).and(HttpTransportDto.or(ConsoleTransportDto)),
) satisfies z.ZodType<Destination[]>;
