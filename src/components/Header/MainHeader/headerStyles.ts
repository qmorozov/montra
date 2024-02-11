import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },

  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
  },

  rightSide: {
    minWidth: 22,
    minHeight: 22,
  },
});
