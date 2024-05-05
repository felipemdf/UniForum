export interface Pagination {
  total: number;
  page: number;
  pageSize: number;
  peerPage: number;
}

export interface Pageable<T> {
  result: T[];
  pagination: Pagination;
}
