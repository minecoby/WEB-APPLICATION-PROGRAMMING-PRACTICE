export class HashTable<K, V> {

  private Table: Map<K, V>;
  constructor() {
    this.Table = new Map<K, V>();
  }

  public set(key: K, value: V): void {
    this.Table.set(key, value);
  }

  public get(key: K): V | undefined {
    return this.Table.get(key);
  }

  public has(key: K): boolean {
    return this.Table.has(key);
  }

  public clear(): void {
    this.Table.clear();
  }

  public entries(): [K, V][] {
    return Array.from(this.Table.entries());
  }
}