import { StyleSheet, TextStyle, Dimensions } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const defaultButtonSize: TextStyle = {
  borderRadius: responsiveWidth(4), // 16
  padding: responsiveWidth(4.2), // 17
};

export const defaultButtonFontSize: TextStyle = {
  fontSize: responsiveFontSize(2.13), // 18
  fontWeight: 'bold',
  lineHeight: responsiveHeight(2.7), // 22
  textAlign: 'center',
};

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: responsiveWidth(3.9), // 16
    backgroundColor: '#fff',
  },

  droidSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  primaryButton: {
    ...defaultButtonSize,
    backgroundColor: '#7F3DFF',
  },

  primaryButtonText: {
    ...defaultButtonFontSize,
    color: '#fff',
  },

  secondaryButton: {
    ...defaultButtonSize,
    backgroundColor: '#EEE5FF',
  },

  secondaryButtonText: {
    ...defaultButtonFontSize,
    color: '#7F3DFF',
  },

  disabledButton: {
    opacity: 0.5,
  },
});

export const defaultInput: TextStyle = {
  fontSize: responsiveFontSize(1.9), // 16
  lineHeight: responsiveHeight(4.1), // 18
  paddingHorizontal: responsiveWidth(4), // 16
  paddingVertical: responsiveHeight(1.4), // 12
  borderRadius: responsiveWidth(4), // 16
  borderWidth: 1,
  borderColor: '#F1F1FA',
  color: '#91919F',
  height: responsiveHeight(6.8), // 56
  margin: 0,
  padding: 0,
};

export const defaultCheckboxWrapper: TextStyle = {
  flexDirection: 'row',
  gap: responsiveWidth(3), // 12
};

export const defaultCheckbox: TextStyle = {
  borderColor: '#7F3DFF',
  width: 24,
  height: 24,
  borderRadius: 6,
  marginTop: responsiveHeight(0.6), // 5
};

export const defaultCheckboxText: TextStyle = {
  fontWeight: '500',
  fontSize: responsiveFontSize(1.65), // 14
  lineHeight: responsiveHeight(2.14), // 18
  color: '#000',
};

export const clickableText: TextStyle = {
  color: '#7F3DFF',
};

export const errorTextStyle: TextStyle = {
  fontSize: responsiveFontSize(1.4), // 12
  lineHeight: responsiveHeight(1.7), // 14
  color: '#FD3C4A',
  opacity: 0.8,
  marginLeft: responsiveHeight(2), // 16
  width: Dimensions.get('window').width * 0.7,
};
