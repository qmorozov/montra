import { StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: responsiveWidth(4), // 16
  },

  top: {
    flex: 0.85,
  },

  bottom: {
    flex: 0.18,
  },

  slide: {
    marginTop: responsiveHeight(4),
    width: responsiveScreenWidth(90),
    // width: Dimensions.get('window').width * 0.95,
  },

  slideTextWrapper: {
    marginTop: responsiveHeight(4.8), // 40
    maxWidth: responsiveScreenWidth(80), // 276
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  slideImage: {
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'contain',
    // width: Dimensions.get('window').width * 0.8,
    width: responsiveWidth(80),
    // height: Dimensions.get('window').width * 0.8,
    height: responsiveHeight(40),
  },

  slideTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(3.5), // 32
    lineHeight: responsiveHeight(4.4), // 39px
    textAlign: 'center',
    color: '#212325',
  },

  slideDescription: {
    marginTop: responsiveHeight(2), // 16
    fontFamily: 'Inter-Medium',
    fontSize: responsiveFontSize(1.9), // 16px
    lineHeight: responsiveHeight(2.4), // 19px
    textAlign: 'center',
    color: '#91919F',
  },

  paginationStyle: {
    gap: 6,
  },

  activeDotStyle: {
    width: 16, // 16
    height: 16, // 16
    backgroundColor: '#7F3DFF',
    borderRadius: responsiveWidth(4), // 100
  },

  slideDot: {
    width: responsiveWidth(2.4), // 8px,
    height: responsiveHeight(1.2), // 8px
    borderRadius: responsiveWidth(4), // 100
    backgroundColor: '#EEE5FF',
  },

  authPageWrapper: {
    marginTop: responsiveHeight(6.8), // 56px
  },

  formButton: {
    marginTop: responsiveHeight(1.6), // 13px
  },

  formWrapper: {
    gap: 4,
    flexDirection: 'column',
  },

  forgotPasswordBtn: {
    marginTop: responsiveHeight(2.5), // 20px
    color: '#7F3DFF',
  },

  dontOrHaveAccount: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    marginTop: responsiveWidth(4), // 16
  },

  dontOrHaveAccountText: {
    color: '#91919F',
    fontWeight: '500',
  },

  orWithText: {
    marginTop: responsiveHeight(1.5), // 12px
    textAlign: 'center',
    color: '#91919F',
    fontWeight: '700',
  },

  signUpBySocial: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: responsiveWidth(3.7), // 16px
    paddingLeft: responsiveWidth(3.7), // 16px
    paddingBottom: responsiveHeight(1.4), // 12px
    paddingTop: responsiveHeight(1.4), // 12px
    gap: 10,
    justifyContent: 'center',
    marginTop: responsiveHeight(1.4), // 12px
    borderWidth: responsiveWidth(0.3),
    borderColor: '#F1F1FA',
    borderRadius: responsiveWidth(3.7), // 16px
    // minHeight: 56,
  },

  forgotPasswordTitleWrapper: {
    width: responsiveScreenWidth(76), // 360
    marginTop: responsiveHeight(7), // 60
    marginBottom: responsiveHeight(5.5), // 45
  },

  forgotPasswordTitle: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.85), // 24
    lineHeight: responsiveHeight(3.55), // 29
    color: '#0D0E0F',
  },

  emailSentIcon: {
    marginTop: responsiveHeight(9.8), // 80
  },

  emailSentTextWrapper: {
    marginTop: responsiveHeight(7), // 58
    textAlign: 'center',
    maxWidth: responsiveWidth(80), // 300
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  emailSentTitle: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.85), // 24
    lineHeight: responsiveHeight(3.55), // 29
    textAlign: 'center',
    color: '#0D0E0F',
  },

  emailSentText: {
    fontWeight: '500',
    fontSize: responsiveFontSize(1.9), // 16px
    lineHeight: responsiveHeight(2.45), // 20px
    marginTop: responsiveHeight(3), // 24
    textAlign: 'center',
    color: '#292B2D',
  },

  verification: {
    fontWeight: '500',
    fontSize: responsiveFontSize(4.23), // 36
    lineHeight: responsiveHeight(5.4), // 44
    maxWidth: responsiveWidth(80), // 300
  },

  verificationCodeSent: {
    fontWeight: '500',
    fontSize: responsiveFontSize(1.9), // 16px
    lineHeight: responsiveHeight(2.4), // 19px
    color: '#292B2D',
    marginTop: responsiveHeight(2), // 16
  },

  verificationCodeTimerText: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.1), // 18
    lineHeight: responsiveHeight(2.6), // 22
    color: '#7F3DFF',
  },

  codeField: {
    gap: responsiveWidth(3.9), // 16
    justifyContent: 'flex-start',
    marginTop: responsiveHeight(1.3), // 20px
    // marginBottom: responsiveHeight(1.2), // 15
  },

  codeFieldItemWrapper: {
    height: responsiveHeight(6), // 60
  },

  codeFieldItem: {
    width: 16,
    height: 16,
    borderRadius: 16,
    fontSize: 0,
    backgroundColor: '#E0E2E9',
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  codeFieldFullItem: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3.5), // 32
    lineHeight: responsiveHeight(4.4), // 39px
    color: '#161719',
    width: responsiveWidth(5), // 21
    height: responsiveHeight(4), // 33
    backgroundColor: 'transparent',
  },

  codeFieldFocusItem: {
    backgroundColor: 'rgba(140, 106, 206, 0.6)',
  },
});
