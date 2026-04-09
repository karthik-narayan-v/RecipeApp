import { StyleSheet } from 'react-native';

import { theme } from '../../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    gap: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 8,
    marginHorizontal: 20,
  },
  browseButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 9999,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 24,
  },
  savedContainer: {
    gap: 24,
  },
  recipesGrid: {
    gap: 16,
  },
});

export default styles;
