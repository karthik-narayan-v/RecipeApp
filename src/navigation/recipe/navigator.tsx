import { createStackNavigator } from "@react-navigation/stack";
import RecipeList from "../../screens/RecipeList";
import RecipeDetail from "../../screens/RecipeDetail";

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
