import { StyleSheet, Platform, TextStyle, Dimensions } from 'react-native';

export const defaultButtonSize: TextStyle = {
  borderRadius: 16,
  padding: 17,
};

export const defaultButtonFontSize: TextStyle = {
  fontSize: 18,
  fontWeight: 'bold',
  lineHeight: 22,
  textAlign: 'center',
};

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  droidSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
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
});

export const defaultInput: TextStyle = {
  fontSize: 16,
  lineHeight: 18,
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: '#F1F1FA',
  color: '#91919F',
  height: 56,
  margin: 0,
  padding: 0
};

export const defaultCheckboxWrapper: TextStyle = {
  flexDirection: 'row',
  gap: 12,
}

export const defaultCheckbox: TextStyle = {
  borderColor: '#7F3DFF',
  width: 24,
  height: 24,
  borderRadius: 6,
  marginTop: 5,
};

export const defaultCheckboxText: TextStyle = {
  fontWeight: '500',
  fontSize: 14,
  lineHeight: 18,
  color: '#000',
};

export const clickableText: TextStyle = {
  color: '#7F3DFF'
};

export const errorTextStyle: TextStyle = {
  fontSize: 12,
  lineHeight: 14,
  color: '#FD3C4A',
  opacity: 0.8,
  marginLeft: 16,
  width: Dimensions.get('window').width * 0.7,
}
