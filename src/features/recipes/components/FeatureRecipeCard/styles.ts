import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    width: 288,
    height: 400,
    borderRadius: 32,
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },

  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    gap: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default styles;
