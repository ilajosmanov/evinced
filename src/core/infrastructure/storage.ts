import type { Base, IStoragePort } from "../domain/ports/storage.port";

export class Storage implements IStoragePort {
  constructor(private readonly _key: string) {}

  get #storage() {
    return typeof window !== 'undefined' ? window.localStorage : null;
  }

  commit<T>(payload: T[]): { success: boolean } {
    try {
      if (!this.#storage) {
        throw new Error("localStorage not available");
      }

      this.#storage.setItem(this._key, JSON.stringify(payload));

      return {
        success: true,
      };
    } catch (ex) {
      throw Error("Cannot write to the storage");
    }
  }

  getAll<T>() {
    if (!this.#storage) {
      return [];
    }

    const data = this.#storage.getItem(this._key);

    if (!data) {
      return [];
    }

    const parsedData = JSON.parse(data) as T[];
    return parsedData;
  }

  getById<T extends Base>(id: string) {
    const data = this.getAll<T>();
    const item = data.find((item) => item.id === id);

    if (!item) {
      return null;
    }

    return item;
  }
}
