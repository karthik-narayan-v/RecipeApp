export type SortParams = {
  sortBy?: string;
  order?: "asc" | "desc";
};

export type PaginationParams = {
  limit?: number;
  skip?: number;
  select?: string[];
};