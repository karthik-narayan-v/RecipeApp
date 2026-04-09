import { createStackNavigator } from '@react-navigation/stack';

import RecipeNavigator from './recipe/navigator';

export type RootStackParamList = {
  Recipes: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Recipes" component={RecipeNavigator} />
    </Stack.Navigator>
  );
}
