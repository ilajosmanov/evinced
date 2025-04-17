export class SessionEntity {
  constructor(
    private _name: string,
    private _isAttached = false,
    private readonly _id: string = crypto.randomUUID(),
  ) {}

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get isAttached() {
    return this._isAttached;
  }

  attach() {
    this._isAttached = true;
  }

  detach() {
    this._isAttached = false;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      isAttached: this.isAttached,
    };
  }

  static create(props: SessionEntityProps) {
    return new SessionEntity(props.name, props.isAttached, props.id);
  }
}

export type SessionEntityProps = {
  id?: string;
  name: string;
  isAttached?: boolean;
};
