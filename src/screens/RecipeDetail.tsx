import { RouteProp, useRoute } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";

import { RootStackParamList } from "../../App";

type RecipeDetailRouteProp = RouteProp<RootStackParamList, "RecipeDetail">;

const RecipeDetail = () => {
  const route = useRoute<RecipeDetailRouteProp>();
  const { id } = route.params;
  return (
    <View style={styles.container}>
      <Text>Recipe ID: {id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
});

export default RecipeDetail;
