export interface Pagination {
  total: number;
  page: number;
}

export interface Pageable<T> {
  result: T[];
  pagination: Pagination;
}
