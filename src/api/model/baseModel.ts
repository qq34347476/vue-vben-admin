export interface BasicPageParams {
  pageNo: number;
  pageSize: number;
  orderBy?: string;
}

export interface BasicFetchResult<T> {
  records: T[];
  recordTotal: number;
}
