import React, { useEffect } from "react";
import { Animated } from "react-native";
import ProgressLoader from "../../../../components/ProgressLoader";

type AnimatedProgressProps = {
  progress: Animated.Value;
};

const AnimatedProgress: React.FC<AnimatedProgressProps> = ({ progress }) => {
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const listener = progress.addListener(({ value }) => {
      setValue(value);
    });

    return () => progress.removeListener(listener);
  }, []);

  return <ProgressLoader progress={value} />;
};

export default AnimatedProgress;
