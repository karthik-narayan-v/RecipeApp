import axios from "axios";

export const fetchRecipes = async () => {
  const response = await axios.get("https://dummyjson.com/recipes");
  return response.data.recipes;
};
