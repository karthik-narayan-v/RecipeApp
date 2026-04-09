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
  savedRecipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [],
  trendingRecipes: [],
  savedRecipes: [],
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
      if (recipe) {
        recipe.isLiked = !recipe.isLiked;
        if (recipe.isLiked) {
          if (!state.savedRecipes.find((r) => r.id === recipe.id)) {
            state.savedRecipes.push({ ...recipe });
          }
        } else {
          state.savedRecipes = state.savedRecipes.filter(
            (r) => r.id !== recipe.id,
          );
        }
      } else {
        state.savedRecipes = state.savedRecipes.filter(
          (r) => r.id !== action.payload,
        );
      }
    },
    saveRecipe(state, action: PayloadAction<Recipe>) {
      const recipe = action.payload;
      const existing = state.savedRecipes.find((r) => r.id === recipe.id);
      if (!existing) {
        state.savedRecipes.push({ ...recipe, isLiked: true });
      }
      const storedRecipe = state.recipes.find((r) => r.id === recipe.id);
      if (storedRecipe) {
        storedRecipe.isLiked = true;
      }
    },
    unsaveRecipe(state, action: PayloadAction<number>) {
      state.savedRecipes = state.savedRecipes.filter(
        (r) => r.id !== action.payload,
      );
      const storedRecipe = state.recipes.find((r) => r.id === action.payload);
      if (storedRecipe) {
        storedRecipe.isLiked = false;
      }
    },
    setSavedRecipes(state, action: PayloadAction<Recipe[]>) {
      state.savedRecipes = action.payload;
    },
  },
});

export const {
  setRecipes,
  setTrendingRecipes,
  toggleLike,
  saveRecipe,
  unsaveRecipe,
  setSavedRecipes,
} = recipeSlice.actions;
export default recipeSlice.reducer;
