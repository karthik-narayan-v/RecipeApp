import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import HeartFilled from "../../assets/svg/heart_filled.svg";
import HeartUnfilled from "../../assets/svg/heart_unfilled.svg";

const { width } = Dimensions.get("window");

interface RecipeCardProps {
  name: string;
  image: string;
  cookTimeMinutes: number;
  caloriesPerServing: number;
  isLiked: boolean;
  onLikeToggle?: () => void;
}

const RecipeCard = ({
  name,
  image,
  cookTimeMinutes,
  caloriesPerServing,
  isLiked,
  onLikeToggle,
}: RecipeCardProps) => {
  const [liked, setLiked] = useState(isLiked);

  const handleToggle = () => {
    setLiked((prev) => !prev); 
    onLikeToggle?.();
  };
  return (
    <View style={styles.card}>
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
                {liked ? (
                  <HeartFilled width={24} height={24} />
                ) : (
                  <HeartUnfilled width={24} height={24} />
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
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 150,
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
    flexDirection: "column",
  },
  infoRow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    zIndex: 1,
  },
  infoText: {
    fontSize: 14,
  },
  infoTextLight: {
    color: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 8,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    zIndex: 1,
  },
});

export default RecipeCard;
