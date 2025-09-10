import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import HeartFilled from "../../assets/svg/heart_filled.svg";
import HeartUnfilled from "../../assets/svg/heart_unfilled.svg";
import { RootState } from "../store";
import { toggleLike } from "../store/recipeSlice";

const { width } = Dimensions.get("window");

interface RecipeCardProps {
  id: number;
  name: string;
  image: string;
  cookTimeMinutes: number;
  caloriesPerServing: number;
  disableShadow?: boolean;
}

const RecipeCard = ({
  id,
  name,
  image,
  cookTimeMinutes,
  caloriesPerServing,
  disableShadow = false,
}: RecipeCardProps) => {
  const dispatch = useDispatch();
  const isLiked = useSelector(
    (state: RootState) =>
      state.recipe.recipes.find((recipe) => recipe.id === id)?.isLiked ?? false,
  );
  const handleToggle = () => {
    dispatch(toggleLike(id));
  };
  return (
    <View style={[styles.card, disableShadow && styles.cardNoShadow]}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.gradient}
          >
            <View style={styles.infoRow}>
              <Text style={[styles.infoText, styles.infoTextLight]}>
                {cookTimeMinutes} min
              </Text>
              <Text style={[styles.infoText, styles.infoTextLight]}>
                {caloriesPerServing}cal
              </Text>

              <TouchableOpacity onPress={handleToggle}>
                {isLiked ? (
                  <HeartFilled width={16} height={16} />
                ) : (
                  <HeartUnfilled width={16} height={16} />
                )}
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>

      <Text style={styles.title}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width - 32,
    alignSelf: "center",
    marginBottom: 16,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardNoShadow: {
    elevation: 0,
    shadowColor: "transparent",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 225,
    overflow: "hidden",
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradientContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    justifyContent: "flex-end",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingBottom: 6,
    alignItems: "center",
  },
  infoText: {
    fontWeight: "700",
    fontSize: 14,
  },
  infoTextLight: {
    color: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 8,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default RecipeCard;
