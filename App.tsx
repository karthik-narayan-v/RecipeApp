import { Provider } from "react-redux";
import { store } from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeDetail from "./src/screens/RecipeDetail";
import RecipeList from "./src/screens/RecipeList";
import { NativeBaseProvider } from "native-base";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="RecipeList">
            <Stack.Screen name="RecipeList" component={RecipeList} />
            <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
