import axios from "axios";

import { Recipe } from "../store/recipeSlice";

export const fetchRecipes = async () => {
  const response = await axios.get("https://dummyjson.com/recipes");
  return response.data.recipes;
};

export const fetchRecipeById = async (id: number): Promise<Recipe> => {
  const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
  return response.data;
};
