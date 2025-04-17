import type { ISessionRepositoryPort } from "@/core/domain/ports/repositories/session.port";
import { sessionRepository } from "@/core/infrastructure/repositories/session.repository";
import { queryOptions } from "@tanstack/react-query";

export class SessionQuery {
  keys = {
    sessions: () => ["sessions"],
    details: (id: string) => [...this.keys.sessions(), id],
  };

  constructor(private readonly _repository: ISessionRepositoryPort) {}

  getAllSessionsQuery = () => {
    return queryOptions({
      queryKey: this.keys.sessions(),
      queryFn: async () => {
        const sessions = await this._repository.getAll();
        return Object.fromEntries(sessions.map((s) => [s.id, s]));
      },
    });
  };

  getDetailsQuery = (id: string) => {
    return queryOptions({
      queryKey: this.keys.details(id),
      queryFn: ({ queryKey }) => {
        const [, id] = queryKey;
        return this._repository.getById(id);
      },
    });
  };
}

export const sessionQuery = new SessionQuery(sessionRepository);
