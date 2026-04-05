import { PaginationParams, SortParams } from "./types";

export const buildSortQuery = (params?: SortParams) => {
  if (!params) return "";

  const query = new URLSearchParams();
  query.append("sortBy", params.sortBy);
  query.append("order", params.order);

  return query.toString();
};

export const buildPaginationQuery = (params?: PaginationParams) => {
  if (!params) return "";

  const query = new URLSearchParams();
  query.append("limit", String(params.limit));
  query.append("skip", String(params.skip));

  if (params.select?.length) {
    query.append("select", params.select.join(","));
  }

  return query.toString();
};

export const combineQueries = (...queries: string[]) => {
  const valid = queries.filter(Boolean);
  return valid.length ? `?${valid.join("&")}` : "";
};