import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { RootStackParamList } from "../../App";
import { fetchRecipeById } from "../api/api";
import RecipeCard from "../components/RecipeCard";
import { Recipe } from "../store/recipeSlice";

type RecipeDetailRouteProp = RouteProp<RootStackParamList, "RecipeDetail">;

const Tab = createMaterialTopTabNavigator();

type TabContentProps = {
  data: string[];
};

const IngredientsTab = ({ data }: TabContentProps) => (
  <ScrollView style={styles.tabContainer}>
    {data.map((ingredient, index) => (
      <Text key={index} style={styles.listItem}>
        • {ingredient}
      </Text>
    ))}
  </ScrollView>
);

const InstructionsTab = ({ data }: TabContentProps) => (
  <ScrollView style={styles.tabContainer}>
    {data.map((instruction, index) => (
      <Text key={index} style={styles.listItem}>
        {index + 1}. {instruction}
      </Text>
    ))}
  </ScrollView>
);

const RecipeDetail = () => {
  const route = useRoute<RecipeDetailRouteProp>();
  const { id } = route.params;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const data = await fetchRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderTabs = () => (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        tabBarIndicatorStyle: styles.tabIndicator,
      }}
    >
      <Tab.Screen name="Ingredients">
        {() => <IngredientsTab data={recipe?.ingredients ?? []} />}
      </Tab.Screen>
      <Tab.Screen name="Instructions">
        {() => <InstructionsTab data={recipe?.instructions ?? []} />}
      </Tab.Screen>
    </Tab.Navigator>
  );

  return (
    <View style={styles.container}>
      {recipe && (
        <>
          <RecipeCard
            id={recipe.id}
            name={recipe.name}
            image={recipe.image}
            cookTimeMinutes={recipe.cookTimeMinutes}
            caloriesPerServing={recipe.caloriesPerServing}
            disableShadow={true}
          />
          <View style={styles.tabsContainer}>{renderTabs()}</View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  tabsContainer: {
    flex: 1,
    marginTop: 16,
    backgroundColor: "white",
  },
  tabContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  listItem: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 24,
  },
  tabLabel: {
    fontSize: 14,
    textTransform: "none",
    fontWeight: "600",
  },
  tabBar: {
    backgroundColor: "white",
    elevation: 0,
    shadowColor: "transparent",
  },
  tabIndicator: {
    backgroundColor: "#000",
    height: 2,
  },
});

export default RecipeDetail;
