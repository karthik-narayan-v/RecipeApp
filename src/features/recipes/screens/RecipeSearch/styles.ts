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
  searchBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.colors.surface,
    borderRadius: 9999,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 2,
    marginBottom: 32,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.darkBrown,
    fontFamily: 'DMSans-Regular',
    paddingVertical: 0,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    gap: 12,
  },
  loader: {
    marginBottom: 16,
  },
  resultsContainer: {
    gap: 24,
  },
  resultsGrid: {
    gap: 16,
  },
});

export default styles;
