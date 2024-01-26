import { config } from "dotenv";
import { readFile } from "fs/promises";
import { join } from "path";
import { Destination, Strategy } from "./types";
import { transformStrategyToAnalyzer } from "./validation/transform-strategy-to-analyzer";

export async function loadDefaults() {
  await config();

  const pathToDefaultConfiguration = process.env.PATH_TO_CONFIGURATION ??
    "default-configuration.json";
  const configuration = {} as {
    analyzer: Strategy;
    available_destinations: Destination[];
  };

  try {
    const data = await readFile(
      join(process.cwd(), pathToDefaultConfiguration),
      { encoding: "utf-8" },
    );
    const { analyzer, available_destinations } = JSON.parse(data);
    // TODO add validation
    Object.assign(configuration, { analyzer, available_destinations });
  } catch (error) {
    throw new Error(`
Fail to load configuration from "${pathToDefaultConfiguration}"!
    1). Create json file with configuration (see "default-configuration.json" as example)
    2). Create .env
    2). Add path to PATH_TO_CONFIGURATION variable
`);
  }

  const analyzer_transformation = transformStrategyToAnalyzer(
    configuration.analyzer,
  );

  if (!analyzer_transformation.success) {
    throw new Error("Incorrect default analyzer strategy");
  }

  return {
    analyzer: analyzer_transformation.analyzer,
    available_destinations: configuration.available_destinations,
  };
}
