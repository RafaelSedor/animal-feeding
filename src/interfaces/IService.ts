export interface IService<T> {
  criar(item: T): void;
  listar(): T[];
}
