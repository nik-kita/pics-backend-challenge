import type { Config } from "@jest/types";

export default (): Config.InitialOptions => {
  return {
    verbose: true,
    testEnvironment: "node",
    detectOpenHandles: true,
    preset: "ts-jest",
    testRegex: ".+\\.(test|spec|e2e)\\.ts$",
  };
};
