
import { Type } from '@nestjs/common';

export interface IPaginatedType<T> {
  items: T[];
  skip: number;
  limit: number;
  total: number;
}
type Constructable<T> = abstract new (...args: any) => T;
export function Paginated<T>(
  classRef: Type<T>,
): Constructable<IPaginatedType<T>> {
  abstract class PaginatedType {
    items: T[];
    total: number;
    skip: number;
    limit: number;
  }
  return PaginatedType;
}