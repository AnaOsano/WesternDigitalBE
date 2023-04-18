export interface IPaginatedType<T> {
  items: T[];
  skip: number;
  limit: number;
  total: number;
}
type Constructable<T> = abstract new () => T;
export function Paginated<T>(): Constructable<IPaginatedType<T>> {
  abstract class PaginatedType {
    items: T[];
    total: number;
    skip: number;
    limit: number;
  }
  return PaginatedType;
}
