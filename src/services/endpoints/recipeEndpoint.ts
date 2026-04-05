import { PaginationParams, SortParams } from "../recipes/types";
import { buildSortQuery, buildPaginationQuery, combineQueries } from "../recipes/utils";

export const RECIPE_ENDPOINTS = {
  RECIPES: (options?: {
    sort?: SortParams;
    pagination?: PaginationParams;
  }) => {
    const sortQuery = buildSortQuery(options?.sort);
    const paginationQuery = buildPaginationQuery(options?.pagination);

    return `/recipes${combineQueries(sortQuery, paginationQuery)}`;
  },

  RECIPE_BY_ID: (id: number) => `/recipes/${id}`,
  SEARCH: (query: string) => `/recipes/search?q=${query}`,
  TAGS: "/recipes/tags",
  BY_TAG: (tag: string) => `/recipes/tag/${tag}`,
  BY_MEAL: (meal: string) => `/recipes/meal-type/${meal}`,
};