export interface IStoragePort {
  commit<T>(payload: T[]): { success: boolean };

  getAll<T>(): T[];

  getById<T extends Base>(id: string): T | null;
}

export interface Base {
  id: string;
}
