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
    marginTop: 56,
  },

  formButton: {
    marginTop: 13,
  },

  formWrapper: {
    gap: 4,
    flexDirection: 'column',
  },

  forgotPasswordBtn: {
    marginTop: 20,
    color: '#7F3DFF',
  },

  dontOrHaveAccount: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    marginTop: 16,
  },

  dontOrHaveAccountText: {
    color: '#91919F',
    fontWeight: '500',
  },

  orWithText: {
    marginTop: 12,
    textAlign: 'center',
    color: '#91919F',
    fontWeight: '700',
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
    minHeight: 56,
  },

  forgotPasswordTitleWrapper: {
    width: 340,
    marginTop: 60,
    marginBottom: 45,
  },

  forgotPasswordTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 29,
    color: '#0D0E0F',
  },

  emailSentIcon: {
    marginTop: 80,
  },

  emailSentTextWrapper: {
    marginTop: 58,
    textAlign: 'center',
    maxWidth: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  emailSentTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 29,
    textAlign: 'center',
    color: '#0D0E0F',
  },

  emailSentText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    marginTop: 24,
    textAlign: 'center',
    color: '#292B2D',
  },

  verification: {
    fontWeight: '500',
    fontSize: 36,
    lineHeight: 44,
    maxWidth: 300,
    marginTop: 4,
  },

  verificationCode: {
    flexDirection: 'row',
    gap: 16,
    height: 40,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },

  verificationCodeItem: {
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 39,
    // userSelect: 'none',
    color: '#161719',
  },

  nonActiveVerificationCodeItem: {
    width: 16,
    height: 16,
    textAlign: 'center',
    backgroundColor: '#E0E2E9',
    borderRadius: 100,
  },

  verificationCodeSent: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: '#292B2D',
    marginTop: 16,
  },

  verificationCodeTimer: {},

  verificationCodeTimerText: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
    color: '#7F3DFF',
  },
});
