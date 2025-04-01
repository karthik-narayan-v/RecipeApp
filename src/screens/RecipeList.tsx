import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { fetchRecipes } from "../api/api";
import { setRecipes } from "../store/recipeSlice";
import { Box, FlatList, Heading, Image, VStack } from "native-base";

const RecipeList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state: RootState) => state.recipe.recipes);
  console.log(recipes);

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
  return (
    <FlatList
      width={"full"}

      data={recipes}
      bgColor={"white"}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <VStack width={"full"} height={"auto"} px={4}>
          <Image
            source={{ uri: item.image }}
            alt="Recipe Image"
            height={"xs"}
            width={"xl"}
            borderTopRadius={8}
          />
          <Heading size={"md"} textAlign={"center"} py={2}>
            {item.name}
          </Heading>
        </VStack>
      )}
    />
  );
};

export default RecipeList;
