import { Recipe } from '../../store/recipeSlice';
import { createClient } from '../clients/createCient';
import { RECIPE_ENDPOINTS } from '../endpoints/recipeEndpoint';

import { PaginationParams, SortParams } from './types';

export const recipeClient = createClient('https://dummyjson.com');

export const fetchRecipes = async (options?: {
  sort?: SortParams;
  pagination?: PaginationParams;
}): Promise<Recipe[]> => {
  const response = await recipeClient.get(RECIPE_ENDPOINTS.RECIPES(options));
  return response.data.recipes;
};

export const fetchRecipeById = async (id: number): Promise<Recipe> => {
  const response = await recipeClient.get(RECIPE_ENDPOINTS.RECIPE_BY_ID(id));
  return response.data;
};

export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  const response = await recipeClient.get(RECIPE_ENDPOINTS.SEARCH(query));
  return response.data.recipes;
};

export const fetchTags = async (): Promise<string[]> => {
  const response = await recipeClient.get(RECIPE_ENDPOINTS.TAGS);
  return response.data;
};

export const fetchRecipesByTag = async (tag: string): Promise<Recipe[]> => {
  const response = await recipeClient.get(RECIPE_ENDPOINTS.BY_TAG(tag));
  return response.data.recipes;
};

export const fetchRecipesByMeal = async (meal: string): Promise<Recipe[]> => {
  const response = await recipeClient.get(RECIPE_ENDPOINTS.BY_MEAL(meal));
  return response.data.recipes;
};

export const fetchTrendingRecipes = async (): Promise<Recipe[]> => {
  const response = await recipeClient.get(
    RECIPE_ENDPOINTS.RECIPES({
      sort: { sortBy: 'rating', order: 'desc' },
      pagination: { limit: 3 },
    })
  );
  return response.data.recipes;
};
