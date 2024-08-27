export class Database<T> {
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }

  list(): T[] {
    return this.data;
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.data.find(predicate);
  }
}
