import React, { useEffect, useRef } from "react";
import { View, ImageBackground, Animated } from "react-native";
import styles from "./styles";
import AnimatedProgress from "../../components/AnimatedProgress";

type SplashScreenProps = {
  onAnimationFinish: () => void;
};

const SplashScreen: React.FC<SplashScreenProps> = ({
  onAnimationFinish,
}) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(
      () => {
      onAnimationFinish();
    }
    );
  }, [progress, onAnimationFinish]);

  return (
    <ImageBackground
      source={require("../../../../assets/images/splash_bg.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.bottomContainer}>
        <AnimatedProgress progress={progress} />
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;
