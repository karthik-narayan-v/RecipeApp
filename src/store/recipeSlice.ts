import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Recipe = {
  id: number;
  name: string;
  image: string;
  caloriesPerServing: number;
  cookTimeMinutes: number;
  isLiked: boolean;
  tags: string[];
  rating: number;
  cuisine: string;
  reviewCount: number;
  prepTimeMinutes: number;
  servings: number;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
};

interface RecipeState {
  recipes: Recipe[];
  trendingRecipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [],
  trendingRecipes: [],
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipes(state, action: PayloadAction<Recipe[]>) {
      state.recipes = action.payload;
    },
    setTrendingRecipes(state, action: PayloadAction<Recipe[]>) {
      state.trendingRecipes = action.payload;
    },
    toggleLike(state, action: PayloadAction<number>) {
      const recipe = state.recipes.find((r) => r.id === action.payload);
      if (recipe) recipe.isLiked = !recipe.isLiked;
    },
  },
});

export const { setRecipes, setTrendingRecipes, toggleLike } = recipeSlice.actions;
export default recipeSlice.reducer;
