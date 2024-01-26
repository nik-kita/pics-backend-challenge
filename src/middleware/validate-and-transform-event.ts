import { RequestHandler } from "express";
import { Analyzer, Event } from "../types";
import { EventDto } from "../validation/event.dto";
import { transformStrategyToAnalyzer } from "../validation/transform-strategy-to-analyzer";

export const validateAndTransformEvent: (
  analyzer: Analyzer,
) => RequestHandler = (analyzer) => (req, _, next) => {
  const body: Event<boolean> = EventDto.parse(req.body);

  if (body.strategy) {
    const transformation = transformStrategyToAnalyzer(
      body.strategy as string,
    );

    if (transformation.success) {
      (body as Event<true>).strategy = transformation.analyzer;
    } else {
      return next(new Error(transformation.reason));
    }
  } else {
    body.strategy = analyzer;
  }

  req.body = body;

  return next();
};
