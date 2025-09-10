import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { RootStackParamList } from "../../App";
import { fetchRecipes } from "../api/api";
import RecipeCard from "../components/RecipeCard";
import { RootState } from "../store";
import { Recipe, setRecipes } from "../store/recipeSlice";

type RecipeListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RecipeList"
>;

const RecipeList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state: RootState) => state.recipe.recipes);
  const navigation = useNavigation<RecipeListNavigationProp>();

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes();
        dispatch(setRecipes(data));
      } catch (error) {
        console.log("Failed to load recipes:", error);
      }
    };
    loadRecipes();
  }, [dispatch]);

  const renderItem = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("RecipeDetail", { id: item.id });
      }}
    >
      <RecipeCard
        id={item.id}
        name={item.name}
        image={item.image}
        cookTimeMinutes={item.cookTimeMinutes}
        caloriesPerServing={item.caloriesPerServing}
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={10}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
    backgroundColor: "white",
  },
});

export default RecipeList;
