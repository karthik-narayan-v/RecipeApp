import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, TouchableOpacity, View, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";
import AppText from "../../../../components/AppText";
import { theme } from "../../../../theme";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../../../api/api";
import { RootState } from "../../../../store";
import { setRecipes, setTrendingRecipes } from "../../../../store/recipeSlice";
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

  const indexRef = useRef(0);
  const [currentText, setCurrentText] = useState(PLACEHOLDERS[0]);
  const [nextText, setNextText] = useState(PLACEHOLDERS[1]);

  const currentAnim = useRef(new Animated.Value(0)).current;
  const nextAnim = useRef(new Animated.Value(20)).current;
  const currentOpacity = useRef(new Animated.Value(1)).current;
  const nextOpacity = useRef(new Animated.Value(0)).current;

  const featuredRecipes = useMemo(() => {
    if (recipes.length === 0) return [];
    const shuffled = [...recipes].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
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

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (indexRef.current + 1) % PLACEHOLDERS.length;
      const afterNextIndex = (nextIndex + 1) % PLACEHOLDERS.length;
      const nextPlaceholder = PLACEHOLDERS[nextIndex];
      const afterNextPlaceholder = PLACEHOLDERS[afterNextIndex];

      setNextText(nextPlaceholder);
      currentAnim.setValue(0);
      nextAnim.setValue(20);
      currentOpacity.setValue(1);
      nextOpacity.setValue(0);

      requestAnimationFrame(() => {
        Animated.parallel([
          Animated.timing(currentAnim, {
            toValue: -20,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(currentOpacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(nextAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(nextOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]).start(() => {
          indexRef.current = nextIndex;
          setCurrentText(nextPlaceholder);
          setNextText(afterNextPlaceholder);

          currentAnim.setValue(0);
          currentOpacity.setValue(1);
          nextAnim.setValue(20);
          nextOpacity.setValue(0);
        });
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.searchBoxButton}
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <AppIcon name="Search" size={20} color={theme.colors.darkBrown} />
          <Animated.View style={styles.searchTextContainer}>
            <Animated.View
              style={{
                position: "absolute",
                transform: [{ translateY: currentAnim }],
                opacity: currentOpacity,
              }}
            >
              <AppText variant="body" size="md" color={theme.colors.darkBrown}>
                {currentText}
              </AppText>
            </Animated.View>

            <Animated.View
              style={{
                position: "absolute",
                transform: [{ translateY: nextAnim }],
                opacity: nextOpacity,
              }}
            >
              <AppText variant="body" size="md" color={theme.colors.darkBrown}>
                {nextText}
              </AppText>
            </Animated.View>
          </Animated.View>
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
            {featuredRecipes?.map((recipe) => (
              <FeaturedRecipeCard
                key={recipe.id}
                title={recipe.name}
                image={recipe.image}
                category={recipe.cuisine}
                duration={String(recipe.cookTimeMinutes)}
                onPress={() => {
                  navigation.navigate("RecipeDetail", { id: recipe.id });
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
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredItemsContainer}
          >
            {trendingRecipes?.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                image={recipe.image}
                rating={Number(recipe.rating)}
                reviewCount={String(recipe.reviewCount)}
                title={recipe.name}
                duration={String(recipe.cookTimeMinutes)}
                calories={recipe.caloriesPerServing}
                onPress={() => {
                  navigation.navigate("RecipeDetail", { id: recipe.id });
                }}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipeHome;
