abstract class StorageItem {
  private readonly key: string;
  private readonly storage: Storage;

  protected constructor(storage: Storage, key: string) {
    this.key = key;
    this.storage = storage;
  }

  public set(payload: any) {
    try {
      const serializedPayload = JSON.stringify(payload);
      this.storage.setItem(this.key, serializedPayload);
    } catch (error) {
      console.error(error);
    }
  }

  public get(): any {
    try {
      const serializedItem = this.storage.getItem(this.key);

      if (serializedItem === null) return undefined;

      return JSON.parse(serializedItem);
    } catch (error) {
      return undefined;
    }
  }

  public remove(): void {
    this.storage.removeItem(this.key);
  }
}

export class LocalStorageItem extends StorageItem {
  constructor(key: string) {
    super(localStorage, key);
  }
}

export class SessionStorageItem extends StorageItem {
  constructor(key: string) {
    super(sessionStorage, key);
  }
}
