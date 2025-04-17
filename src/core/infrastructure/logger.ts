import type { ILoggerPort } from "../domain/ports/logger.port";

export class Logger implements ILoggerPort {
  constructor(private readonly _adapter: Adapter = console) {}
  log(...args: unknown[]): void {
    this._adapter.log(...args);
  }
}

interface Adapter {
  log(...args: unknown[]): void;
}
