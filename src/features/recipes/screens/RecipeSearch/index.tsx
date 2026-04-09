import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "../../../../components/AppText";
import { theme } from "../../../../theme";
import AppIcon from "../../../../components/AppIcon";
import RecipeCard from "../../components/RecipeCard";
import { searchRecipes } from "../../../../services/recipes/recipeApi";
import { Recipe } from "../../../../store/recipeSlice";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RecipeStackParamList } from "../../../../navigation/recipe/navigator";
import styles from "./styles";

type RecipeSearchNavigationProp = StackNavigationProp<
  RecipeStackParamList,
  "RecipeSearch"
>;

const RecipeSearch: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RecipeSearchNavigationProp>();
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = async (query: string) => {
    if (query.trim().length === 0) {
      setResults([]);
      setHasSearched(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await searchRecipes(query);
      setResults(data);
    } catch (err) {
      setError("Failed to search recipes. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (searchText.trim().length === 0) {
      setResults([]);
      setHasSearched(false);
      setError(null);
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      handleSearch(searchText);
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchText]);

  const handleClearSearch = () => {
    setSearchText("");
    setResults([]);
    setHasSearched(false);
    setError(null);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Search Box */}
        <View style={styles.searchBoxContainer}>
          <AppIcon name="Search" size={20} color={theme.colors.darkBrown} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search recipes..."
            placeholderTextColor={theme.colors.darkBrown}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={handleClearSearch}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <AppIcon name="X" size={20} color={theme.colors.darkBrown} />
            </TouchableOpacity>
          )}
        </View>

        {/* Loading State */}
        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator
              size="large"
              color={theme.colors.primary}
              style={styles.loader}
            />
            <AppText variant="body" color={theme.colors.darkBrown} size="md">
              Searching recipes...
            </AppText>
          </View>
        )}

        {/* Error State */}
        {error && !loading && (
          <View style={styles.centerContainer}>
            <AppText
              variant="body"
              color={theme.colors.primary}
              size="md"
              weight="bold"
            >
              {error}
            </AppText>
          </View>
        )}

        {/* Empty State */}
        {!loading && hasSearched && results.length === 0 && !error && (
          <View style={styles.centerContainer}>
            <AppIcon
              name="Search"
              size={48}
              color={theme.colors.primary}
              fill
            />
            <AppText
              variant="body"
              color={theme.colors.darkBrown}
              size="md"
              weight="bold"
            >
              No recipes found
            </AppText>
            <AppText variant="body" color={theme.colors.darkBrown} size="sm">
              Try searching for different ingredients or dishes
            </AppText>
          </View>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <View style={styles.resultsContainer}>
            <AppText
              variant="headline"
              weight="extraBold"
              size="lg"
              color={theme.colors.black}
              letterSpacing={1}
            >
              Search Results ({results.length})
            </AppText>
            <View style={styles.resultsGrid}>
              {results.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  image={recipe.image}
                  rating={recipe.rating}
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

        {/* Initial State */}
        {!hasSearched && searchText.length === 0 && (
          <View style={styles.centerContainer}>
            <AppIcon
              name="Search"
              size={48}
              color={theme.colors.primary}
              fill
            />
            <AppText
              variant="headline"
              weight="bold"
              size="lg"
              color={theme.colors.black}
            >
              Find Your Recipe
            </AppText>
            <AppText variant="body" color={theme.colors.darkBrown} size="sm">
              Search by ingredient, cuisine, or dish name
            </AppText>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default RecipeSearch;
