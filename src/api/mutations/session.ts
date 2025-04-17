import { SessionEntity } from "@/core/domain/entities/session.entity";
import type { ISessionRepositoryPort } from "@/core/domain/ports/repositories/session.port";
import { sessionRepository } from "@/core/infrastructure/repositories/session.repository";
import { queryClient } from "../client";
import { sessionQuery } from "../queries/session";

export class SessionMutation {
  constructor(private readonly _repository: ISessionRepositoryPort) {}

  #exclude(id: string) {
    const { [id]: _, ...sessions } = this.#getAllSessions();
    return sessions;
  }

  #getAllSessions() {
    return (
      queryClient.getQueryData<Record<string, SessionEntity>>(
        sessionQuery.keys.sessions(),
      ) ?? {}
    );
  }

  createSession = async (name: string) => {
    const session = SessionEntity.create({
      name,
    });

    this._repository.save(
      Object.values({
        ...this.#getAllSessions(),
        [session.id]: session,
      }),
    );

    return session;
  };

  deleteSession = async (id: string) => {
    return this._repository.save(Object.values(this.#exclude(id)));
  };

  attachSession = async (session: SessionEntity) => {
    session.attach();

    return this._repository.save(
      Object.values({
        ...this.#getAllSessions(),
        [session.id]: session,
      }),
    );
  };

  detachSession = async (session: SessionEntity) => {
    session.detach();

    return this._repository.save(
      Object.values({
        ...this.#getAllSessions(),
        [session.id]: session,
      }),
    );
  };
}

export const sessionMutation = new SessionMutation(sessionRepository);
