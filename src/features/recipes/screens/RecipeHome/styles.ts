import { StyleSheet } from 'react-native';

import { theme } from '../../../../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.neutral,
  },
  searchBoxButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.colors.surface,
    borderRadius: 9999,
    marginTop: 24,
    marginHorizontal: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 2,
    overflow: 'hidden',
  },
  searchTextContainer: {
    flex: 1,
    height: 22,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  featuredContainer: {
    marginTop: 40,
    paddingHorizontal: 24,
  },
  featuredTitleContainer: {
    marginBottom: 24,
  },
  featuredItemsContainer: {
    gap: 24,
  },
  trendingListContainer: {
    flexDirection: 'column',
    gap: 24,
  },
  trendingContainer: {
    marginTop: 40,
    paddingHorizontal: 24,
    gap: 24,
  },
});

export default styles;
