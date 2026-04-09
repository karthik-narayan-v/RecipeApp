import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  right: {
    flex: 1,
    alignItems: 'flex-end',
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  logo: {
    width: 24,
    height: 24,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default styles;
