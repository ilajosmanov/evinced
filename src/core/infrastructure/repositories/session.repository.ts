import { SessionEntity } from "@/core/domain/entities/session.entity";
import type { ILoggerPort } from "@/core/domain/ports/logger.port";
import type { ISessionRepositoryPort } from "@/core/domain/ports/repositories/session.port";
import type { IStoragePort } from "@/core/domain/ports/storage.port";
import { Storage } from "../storage";
import { Logger } from "../logger";

export class SessionRepository implements ISessionRepositoryPort {
  constructor(
    private readonly _storage: IStoragePort,
    private readonly _logger: ILoggerPort,
  ) {}

  async save(sessions: SessionEntity[]) {
    this._storage.commit(sessions.map((s) => s.toJSON()));
  }

  async getAll() {
    return this._storage
      .getAll<SessionEntity>()
      .map((s) => SessionEntity.create(s));
  }

  async getById(id: string) {
    this._logger.log(`Get session by id: ${id}`);
    const s = this._storage.getById<SessionEntity>(id);

    if (!s) {
      return null;
    }

    return SessionEntity.create(s);
  }
}

export const sessionRepository = new SessionRepository(
  new Storage("session"),
  new Logger(),
);
