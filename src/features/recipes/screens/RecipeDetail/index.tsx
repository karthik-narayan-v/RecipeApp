import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { RecipeStackParamList } from "../../../../navigation/recipe/navigator";
import { fetchRecipeById } from "../../../../api/api";
import Chip from "../../components/Chip";
import AppText from "../../../../components/AppText";
import AppIcon from "../../../../components/AppIcon";
import {
  Recipe,
  saveRecipe,
  unsaveRecipe,
} from "../../../../store/recipeSlice";
import { RootState } from "../../../../store";
import styles from "./styles";
import { theme } from "../../../../theme";
import StatCard from "../../components/StatCard";
import InstructionStep from "../../components/InstructionStep";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type RecipeDetailRouteProp = RouteProp<RecipeStackParamList, "RecipeDetail">;

const RecipeDetail = () => {
  const route = useRoute<RecipeDetailRouteProp>();
  const { id } = route.params;
  const dispatch = useDispatch();
  const savedRecipes = useSelector(
    (state: RootState) => state.recipe.savedRecipes,
  );
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  const isLiked = useMemo(
    () => savedRecipes.some((savedRecipe) => savedRecipe.id === id),
    [savedRecipes, id],
  );

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const data = await fetchRecipeById(id);
        console.log("Fetched recipe data:", data);
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe?.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.gradientOverlay} />
        </View>
        <View style={styles.tagsContainer}>
          {recipe?.tags?.slice(0, 3).map((tag: string, index: number) => {
            const tagColors = [
              { bg: theme.colors.accent, text: theme.colors.white },
              { bg: theme.colors.lightGreen, text: theme.colors.darkGreen },
              { bg: theme.colors.surface, text: theme.colors.darkBrown },
            ];
            return (
              <Chip
                key={index}
                label={tag}
                backgroundColor={tagColors[index].bg}
                textColor={tagColors[index].text}
              />
            );
          })}
        </View>
        <View style={styles.titleContainer}>
          <View style={styles.titleWrapper}>
            <AppText
              variant="headline"
              size="xl"
              weight="extraBold"
              color={theme.colors.black}
              letterSpacing={-0.5}
            >
              {recipe?.name}
            </AppText>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                isLiked && styles.actionButtonActive,
              ]}
              onPress={() => {
                if (!recipe) {
                  return;
                }
                if (isLiked) {
                  dispatch(unsaveRecipe(recipe.id));
                } else {
                  dispatch(saveRecipe(recipe));
                }
              }}
            >
              <AppIcon
                name="Heart"
                size={24}
                color={isLiked ? theme.colors.accent : theme.colors.darkBrown}
                fill={isLiked}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <AppIcon name="Share2" size={24} color={theme.colors.darkBrown} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.ratingContainer}>
            <AppIcon name="Star" size={16} fill color={theme.colors.primary} />
            <AppText
              variant="body"
              weight="bold"
              size="lg"
              color={theme.colors.black}
            >
              {recipe?.rating}
            </AppText>
            <AppText variant="body" size="md" color={theme.colors.black}>
              `({recipe?.reviewCount} reviews)`
            </AppText>
          </View>
          <View style={styles.infoCenterContainer} />
          <View style={styles.cuisineContainer}>
            <AppIcon name="Earth" size={16} color={theme.colors.primary} />
            <AppText
              variant="body"
              weight="regular"
              size="lg"
              color={theme.colors.darkBrown}
            >
              {recipe?.cuisine}
            </AppText>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <StatCard
            iconName="Clock"
            label="PREP TIME"
            value={`${recipe?.prepTimeMinutes} mins`}
          />
          <StatCard
            iconName="CookingPot"
            label="COOK TIME"
            value={`${recipe?.cookTimeMinutes} mins`}
          />
          <StatCard
            iconName="Users"
            label="SERVINGS"
            value={`${recipe?.servings} People`}
          />
          <StatCard
            iconName="Zap"
            label="CALORIES"
            value={`${recipe?.caloriesPerServing} kcal`}
          />
        </View>
        <View style={styles.instructionContainer}>
          <View style={styles.instructionTitleContainer}>
            <AppText
              variant="body"
              size="md"
              weight="bold"
              letterSpacing={2.8}
              color={theme.colors.primary}
            >
              INSTRUCTIONS
            </AppText>
            <Chip
              label={recipe?.difficulty ?? ""}
              backgroundColor={theme.colors.lightGreen}
              textColor={theme.colors.darkGreen}
            />
          </View>
          <View style={styles.instructionStepContainer}>
            {recipe?.instructions.map((instruction, index) => (
              <InstructionStep index={index} instruction={instruction} />
            ))}
          </View>
        </View>
        <View style={styles.ingredientContainer}>
          <AppText
            variant="body"
            weight="regular"
            size="md"
            color={theme.colors.primary}
            letterSpacing={2.8}
          >
            INGREDIENTS
          </AppText>
          <View style={styles.ingredientListContainer}>
            {recipe?.ingredients.map((ingredient, index) => (
              <AppText
                key={index}
                variant="body"
                weight="regular"
                size="lg"
                color={theme.colors.darkBrown}
              >
                {ingredient}
              </AppText>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipeDetail;
