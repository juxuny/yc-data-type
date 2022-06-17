export type Pagination = {
  pageNum: number;
  pageSize: number;
}

export type PaginationResp = {
  pageNum: number;
  pageSize: number;
  total: number;
}

export type Error = {
  code: number;
  msg: string;
  data: Map<string, string>;
}

export type BaseResp<Type> = {
  code: number;
  data?: Type;
  msg?: string;
}

export type QueryParams<Type> = Type & {
  current?: number | undefined;
  pageSize?: number | undefined;
  keyword?: string | undefined;
};
