import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import RecipeDetail from "./src/screens/RecipeDetail";
import RecipeList from "./src/screens/RecipeList";
import { store } from "./src/store";

export type RootStackParamList = {
  RecipeList: undefined;
  RecipeDetail: { id: number };
};

export default function App() {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="RecipeList">
          <Stack.Screen name="RecipeList" component={RecipeList} />
          <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
