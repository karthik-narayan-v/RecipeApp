import { createStackNavigator } from "@react-navigation/stack";
import RecipeList from "../../features/recipes/screens/RecipeList";
import RecipeDetail from "../../features/recipes/screens/RecipeDetail";

export type RecipeStackParamList = {
  RecipeList: undefined;
  RecipeDetail: { id: number };
};

const Stack = createStackNavigator<RecipeStackParamList>();

export default function RecipeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RecipeList" component={RecipeList} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
    </Stack.Navigator>
  );
}
