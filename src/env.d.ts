declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PATH_TO_DEFAULT_CONFIGURATION?: string;
    }
  }
}

export {};
