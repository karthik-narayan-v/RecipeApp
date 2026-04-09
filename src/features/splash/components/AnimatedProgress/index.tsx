import React, { useEffect } from 'react';
import { Animated } from 'react-native';

import ProgressLoader from '../../../../components/ProgressLoader';

type AnimatedProgressProps = {
  progress: Animated.Value;
};

const AnimatedProgress: React.FC<AnimatedProgressProps> = ({ progress }) => {
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const listener = progress.addListener(({ value: progressValue }) => {
      setValue(progressValue);
    });

    return () => progress.removeListener(listener);
  }, [progress]);

  return <ProgressLoader progress={value} />;
};

export default AnimatedProgress;
