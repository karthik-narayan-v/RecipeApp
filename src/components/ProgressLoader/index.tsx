import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { theme } from "../../theme";

type ProgressLoaderProps = {
  progress: number;
  width?: number;
};

const ProgressLoader: React.FC<ProgressLoaderProps> = ({
  progress = 0.66,
  width = 96,
}) => {
  const progressWidth = width * progress;

  return (
    <View
      style={[
        styles.container,
        {
          width,
          backgroundColor: theme.colors.neutral,
          borderRadius: 9999,
        },
      ]}
    >
      <View
        style={[
          styles.progress,
          {
            width: progressWidth,
            backgroundColor: theme.colors.primary,
            borderRadius: 9999,
          },
        ]}
      />
    </View>
  );
};

export default ProgressLoader;
