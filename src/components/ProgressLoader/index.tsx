import React from 'react';
import { View } from 'react-native';

import styles from './styles';

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
        },
      ]}
    >
      <View
        style={[
          styles.progress,
          {
            width: progressWidth,
          },
        ]}
      />
    </View>
  );
};

export default ProgressLoader;
