import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RecipeStackParamList } from "../../../../navigation/recipe/navigator";
import AppText from "../../../../components/AppText";
import { theme } from "../../../../theme";
import RecipeCard from "../../components/RecipeCard";
import AppIcon from "../../../../components/AppIcon";
import styles from "./styles";

type RecipeSavedNavigationProp = StackNavigationProp<
  RecipeStackParamList,
  "RecipeSaved"
>;

const RecipeSaved: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RecipeSavedNavigationProp>();
  const savedRecipes = useSelector(
    (state: RootState) => state.recipe.savedRecipes,
  );

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      style={styles.container}
    >
      <View style={styles.content}>
        {savedRecipes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <AppIcon name="Heart" size={64} fill color={theme.colors.primary} />
            <AppText
              variant="headline"
              weight="extraBold"
              size="lg"
              color={theme.colors.black}
              letterSpacing={1}
            >
              No Favorites Yet
            </AppText>
            <AppText
              variant="body"
              color={theme.colors.darkBrown}
              size="md"
              letterSpacing={0.3}
              // style={styles.emptyText}
            >
              Start exploring recipes and add your favorites!
            </AppText>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => navigation.navigate("RecipeHome")}
              activeOpacity={0.8}
            >
              <AppText
                variant="body"
                weight="bold"
                size="md"
                color={theme.colors.white}
              >
                Browse Recipes
              </AppText>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.savedContainer}>
            <AppText
              variant="headline"
              weight="extraBold"
              size="xl"
              color={theme.colors.black}
              letterSpacing={1}
            >
              My Favorites ({savedRecipes.length})
            </AppText>
            <View style={styles.recipesGrid}>
              {savedRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  image={recipe.image}
                  rating={Number(recipe.rating)}
                  reviewCount={recipe.reviewCount}
                  title={recipe.name}
                  duration={recipe.cookTimeMinutes}
                  calories={recipe.caloriesPerServing}
                  onPress={() => {
                    navigation.navigate("RecipeDetail", { id: recipe.id });
                  }}
                />
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default RecipeSaved;
