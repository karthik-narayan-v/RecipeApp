import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Recipe = {
  id: number;
  name: string;
  image: string;
  caloriesPerServings: number;
  cookTimeMinutes: number;
  isLiked: boolean;
  ingredients: string[];
  instructions: string[];
};

interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [],
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipes(state, action: PayloadAction<Recipe[]>) {
      state.recipes = action.payload;
    },
    toggleLike(state, action: PayloadAction<number>) {
      const recipe = state.recipes.find((r) => r.id === action.payload);
      if (recipe) recipe.isLiked = !recipe.isLiked;
    },
  },
});

export const { setRecipes, toggleLike } = recipeSlice.actions;
export default recipeSlice.reducer;
