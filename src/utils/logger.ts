export function logger<T>(
  arg: T,
  provider: (arg: T) => void | Promise<void> = console.info,
): T {
  provider(arg);

  return arg;
}
