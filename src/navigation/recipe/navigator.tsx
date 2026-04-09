import { createStackNavigator } from "@react-navigation/stack";
import RecipeDetail from "../../features/recipes/screens/RecipeDetail";
import AppHeader from "../../components/AppHeader";
import RecipeHome from "../../features/recipes/screens/RecipeHome";
import RecipeSearch from "../../features/recipes/screens/RecipeSearch";
import RecipeSaved from "../../features/recipes/screens/RecipeSaved";

export type RecipeStackParamList = {
  RecipeList: undefined;
  RecipeDetail: { id: number };
  RecipeHome: undefined;
  RecipeSaved: undefined;
  RecipeSearch: undefined;
};

const headerConfig = {
  RecipeHome: { back: false, saved: true },
  RecipeList: { back: false, saved: true },
  RecipeDetail: { back: true, saved: true },
  RecipeSearch: { back: true, saved: true },
  RecipeSaved: { back: true, saved: false },
} as const;

const Stack = createStackNavigator<RecipeStackParamList>();

export default function RecipeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => {
        const config = headerConfig[route.name];

        return {
          header: () => (
            <AppHeader
              onBackPress={config.back ? () => navigation.goBack() : undefined}
              onSavedPress={
                config.saved
                  ? () => navigation.navigate("RecipeSaved")
                  : undefined
              }
            />
          ),
        };
      }}
    >
      <Stack.Screen name="RecipeHome" component={RecipeHome} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} />

      <Stack.Screen name="RecipeSearch" component={RecipeSearch} />

      <Stack.Screen name="RecipeSaved" component={RecipeSaved} />
    </Stack.Navigator>
  );
}
