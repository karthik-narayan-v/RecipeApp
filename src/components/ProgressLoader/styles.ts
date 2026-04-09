import { StyleSheet } from 'react-native';

import { theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    height: 6,
    overflow: 'hidden',
    marginTop: 48,
    backgroundColor: theme.colors.neutral,
    borderRadius: 9999,
  },
  progress: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 9999,
  },
});

export default styles;
