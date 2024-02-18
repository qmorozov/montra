import { StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: responsiveWidth(4), // 16
  },

  backButton: {
    paddingVertical: responsiveHeight(1), // 8
    paddingHorizontal: responsiveWidth(1), // 4
  },

  title: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.12), // 18
    lineHeight: responsiveHeight(2.7), // 22
  },

  rightSide: {
    minWidth: responsiveWidth(5.6), // 22
    minHeight: responsiveHeight(3), // 22
  },
});
