import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  top: {
    flex: 0.85,
  },

  bottom: {
    flex: 0.18,
  },

  slide: {
    marginTop: 32,
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.95,
  },

  slideTextWrapper: {
    maxWidth: 276,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  slideImage: {
    marginLeft: 'auto',
    marginRight: 'auto',
    objectFit: 'contain',
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
  },

  slideTitle: {
    marginTop: 40,
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    lineHeight: 39,
    textAlign: 'center',
    color: '#212325',
  },

  slideDescription: {
    marginTop: 16,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#91919F',
  },

  paginationStyle: {
    gap: 8,
  },

  activeDotStyle: {
    width: 16,
    height: 16,
    backgroundColor: '#7F3DFF',
    borderRadius: 100,
  },

  slideDot: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: '#EEE5FF',
  },

  authPageWrapper: {
    marginTop: 56
  },

  formButton: {
    marginTop: 13
  },

  formWrapper: {
    gap: 4,
    flexDirection: 'column'
  },

  forgotPasswordBtn: {
    marginTop: 20,
    color: '#7F3DFF'
  },

  dontOrHaveAccount: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    marginTop: 16
  },

  dontOrHaveAccountText: {
    color: '#91919F',
    fontWeight: '500'
  },

  orWithText: {
    marginTop: 12,
    textAlign: 'center',
    color: '#91919F',
    fontWeight: '700'
  },

  signUpBySocial: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    justifyContent: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#F1F1FA',
    borderRadius: 16,
    minHeight: 56
  }
});
