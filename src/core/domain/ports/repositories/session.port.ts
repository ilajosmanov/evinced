import type { SessionEntity } from "../../entities/session.entity";

export interface ISessionRepositoryPort {
  save(session: SessionEntity[]): void;

  getAll(): Promise<SessionEntity[]>;

  getById(id: string): Promise<SessionEntity | null>;
}
