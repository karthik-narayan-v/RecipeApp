import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";
import AppText from "../../../../components/AppText";
import { theme } from "../../../../theme";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../../../api/api";
import { RootState } from "../../../../store";
import {
  Recipe,
  setRecipes,
  setTrendingRecipes,
} from "../../../../store/recipeSlice";
import { RecipeStackParamList } from "../../../../navigation/recipe/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import FeaturedRecipeCard from "../../components/FeatureRecipeCard";
import AppIcon from "../../../../components/AppIcon";
import RecipeCard from "../../components/RecipeCard";
import { fetchTrendingRecipes } from "../../../../services/recipes/recipeApi";

const PLACEHOLDERS = [
  "What do you want to cook?",
  "Find something delicious...",
  "Search your next meal",
  "Discover recipes",
  "What are you craving?",
];

type RecipeListNavigationProp = StackNavigationProp<
  RecipeStackParamList,
  "RecipeHome"
>;

const RecipeHome: React.FC = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const recipes = useSelector((state: RootState) => state.recipe.recipes);
  const trendingRecipes = useSelector(
    (state: RootState) => state.recipe.trendingRecipes,
  );
  const navigation = useNavigation<RecipeListNavigationProp>();

  // const [index, setIndex] = useState(0);
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);

  // const slideAnim = useRef(new Animated.Value(0)).current;

  // Calculate current and next text based on displayed index
  // const currentText = PLACEHOLDERS[displayedIndexRef.current];
  // const nextText =
  //   PLACEHOLDERS[(displayedIndexRef.current + 1) % PLACEHOLDERS.length];

  // Static text for now
  const staticText = PLACEHOLDERS[0];

  useEffect(() => {
    if (recipes.length > 0) {
      const shuffled = [...recipes].sort(() => Math.random() - 0.5);
      setFeaturedRecipes(shuffled.slice(0, 2));
    }
  }, [recipes]);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const [data, trending] = await Promise.all([
          fetchRecipes(),
          fetchTrendingRecipes(),
        ]);
        dispatch(setRecipes(data));
        dispatch(setTrendingRecipes(trending));
      } catch (error) {
        console.log("Failed to load recipes:", error);
      }
    };
    loadRecipes();
  }, [dispatch]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Start slide animation
  //     slideAnim.setValue(0);
  //     Animated.timing(slideAnim, {
  //       toValue: 1,
  //       duration: 400,
  //       useNativeDriver: true,
  //     }).start(() => {
  //       // Update displayed index after animation completes
  //       displayedIndexRef.current =
  //         (displayedIndexRef.current + 1) % PLACEHOLDERS.length;
  //       // Force re-render to update text
  //       setIndex(displayedIndexRef.current);
  //     });
  //   }, 2500);

  //   return () => {
  //     clearInterval(interval);
  //     slideAnim.stopAnimation();
  //   };
  // }, []);

  const handleRecipeDetailNavigation = (id: number) => {
    navigation.navigate("RecipeDetail", { id });
  };

  const containerStyle = useMemo(
    () => ({
      ...styles.container,
      paddingBottom: insets.bottom + 24,
    }),
    [insets.bottom],
  );

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={containerStyle}
    >
      <TouchableOpacity
        style={styles.searchBoxButton}
        onPress={() => navigation.navigate("RecipeSearch")}
        activeOpacity={0.7}
      >
        <AppIcon name="Search" size={20} color={theme.colors.darkBrown} />
        <View style={styles.searchTextContainer}>
          <AppText variant="body" size="md" color={theme.colors.darkBrown}>
            {staticText}
          </AppText>
        </View>
      </TouchableOpacity>

      <View style={styles.featuredContainer}>
        <View style={styles.featuredTitleContainer}>
          <AppText
            variant="body"
            weight="bold"
            size="xs"
            color={theme.colors.primary}
            letterSpacing={1}
          >
            EDITOR'S PICK
          </AppText>
          <AppText
            variant="headline"
            weight="extraBold"
            size="xl"
            color={theme.colors.black}
            letterSpacing={1}
          >
            Featured
          </AppText>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredItemsContainer}
        >
          {featuredRecipes.map((recipe) => (
            <FeaturedRecipeCard
              key={recipe.id}
              title={recipe.name}
              image={recipe.image}
              category={recipe.cuisine}
              duration={recipe.cookTimeMinutes}
              onPress={() => {
                handleRecipeDetailNavigation(recipe.id);
              }}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.trendingContainer}>
        <AppText
          variant="headline"
          weight="extraBold"
          size="xl"
          color={theme.colors.black}
          letterSpacing={1}
        >
          Trending Now
        </AppText>
        <View style={styles.trendingListContainer}>
          {trendingRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              image={recipe.image}
              rating={recipe.rating}
              reviewCount={recipe.reviewCount}
              title={recipe.name}
              duration={recipe.cookTimeMinutes}
              calories={recipe.caloriesPerServing}
              onPress={() => {
                handleRecipeDetailNavigation(recipe.id);
              }}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipeHome;
