import { StyleSheet } from 'react-native';

import { theme } from '../../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 4 / 3,
    overflow: 'hidden',
    borderRadius: 40,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.08,
    shadowRadius: 48,
    elevation: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(28, 27, 26, 0.4)',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
    flexWrap: 'wrap',
  },
  titleContainer: {
    alignItems: 'flex-start',
    marginVertical: 16,
    flexDirection: 'row',
  },
  titleWrapper: {
    flex: 1,
    marginRight: 12,
    flexShrink: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: theme.colors.darkBrown,
  },
  actionButtonActive: {
    borderColor: theme.colors.accent,
    backgroundColor: theme.colors.white,
  },
  infoContainer: {
    gap: 24,
    alignItems: 'center',
    flexDirection: 'row',
  },
  ratingContainer: {
    gap: 6,
    alignItems: 'center',
    flexDirection: 'row',
  },
  infoCenterContainer: {
    height: 16,
    width: 1,
    backgroundColor: '#dcc1b1',
  },
  cuisineContainer: {
    gap: 6,
    alignItems: 'center',
    flexDirection: 'row',
  },
  detailContainer: {
    gap: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 32,
  },
  instructionContainer: {
    paddingVertical: 32,
    gap: 32,
  },
  instructionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  instructionStepContainer: {
    gap: 24,
  },
  ingredientContainer: {
    backgroundColor: '#f2edea',
    padding: 40,
    borderRadius: 32,
    gap: 32,
  },
  ingredientListContainer: {
    gap: 16,
  },
});

export default styles;
