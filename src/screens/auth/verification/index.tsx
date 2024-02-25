import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader, MainHeader } from '@components/index';
import GlobalStyles, { errorTextStyle } from '@styles/global';
import { useTranslation } from 'react-i18next';
import styles from '../styles';
import { AuthApi } from '@screens/auth/services/api.service';
import { Screens } from '@typings/global';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@hooks/useAppRedux';
import { useService } from '@hooks/useService';
import { AuthServiceProvider } from '@screens/auth/services/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserServiceProvider } from '@screens/main/services/user.service';

const TIMER_INITIAL_VALUE = 60;
const CODE_LENGTH = 6;

const Verification = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<{ navigate: (screen: Screens) => void }>();
  const [value, setValue] = useState('');

  const AuthService = useService(AuthServiceProvider);

  const { signed } = useAppSelector((state) => state.auth);
  const { id, email } = useAppSelector((state) => state.user);

  const [timer, setTimer] = useState<number>(TIMER_INITIAL_VALUE);
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (timer > 0) {
      interval = setInterval((): void => {
        setTimer((prevTimer: number) => prevTimer - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const handleResend = useCallback(async (): Promise<void> => {
    const verificationResponse = await AuthApi.emailResendVerify(id);

    console.log(verificationResponse);

    setResendDisabled(true);
    setTimer(TIMER_INITIAL_VALUE);
  }, []);

  const handleVerify = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);

      const verificationResponse = (await AuthApi.emailVerify({
        code: value,
      })) as {
        accessToken: string;
        refreshToken: string;
      };

      await AuthService.saveTokens(verificationResponse);

      await AuthService.updateSignInData(true);

      if (signed) {
        navigation.navigate(Screens.HOME);
      }

      setValue('');
      setIsLoading(false);
    } catch (error: any) {
      const errorText = error.response?.data.message;

      if (errorText === 'codeIsIncorrect') setErrorText(errorText);

      setValue('');
      setIsLoading(false);
    }
  }, [value]);

  const returnKeyType: 'done' | 'next' = useMemo(() => {
    return value.length === CODE_LENGTH ? 'done' : 'next';
  }, [value]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <MainHeader title={t('verification')} />
        <View style={[GlobalStyles.wrapper, { justifyContent: 'flex-end' }]}>
          <Loader visible={isLoading} />

          <Text style={styles.verification}>
            {t('enterYourVerificationCode')}
          </Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.codeFieldItemWrapper}>
              <CodeField
                autoFocus
                cellCount={CODE_LENGTH}
                value={value}
                onChangeText={(v: string): void => {
                  setErrorText('');
                  setValue(v);
                }}
                keyboardType="number-pad"
                rootStyle={styles.codeField}
                returnKeyType={returnKeyType}
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <View key={index} style={styles.codeField}>
                    <Text
                      style={[
                        styles.codeFieldItem,
                        value[index] ? styles.codeFieldFullItem : null,
                        isFocused && styles.codeFieldFocusItem,
                      ]}
                    >
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
                onSubmitEditing={(): void => {
                  if (value.length === CODE_LENGTH) {
                    handleVerify();
                  }
                }}
              />
            </View>

            <Text
              style={[
                errorTextStyle,
                { height: 15, marginLeft: 0, marginTop: -3 },
              ]}
            >
              {t(errorText)}
            </Text>

            <Text
              style={[
                styles.verificationCodeTimerText,
                {
                  opacity: timer === 0 ? 0.7 : 1,
                  color: timer === 0 ? '#999' : '#7F3DFF',
                },
              ]}
            >
              {`${Math.floor(timer / 60)
                .toString()
                .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`}
            </Text>

            <Text style={styles.verificationCodeSent}>
              {t('weSendVerificationCodeToYourEmailYouCanCheckYourInbox', {
                email,
              })}
            </Text>

            <TouchableOpacity onPress={handleResend} disabled={resendDisabled}>
              <Text
                style={[
                  {
                    fontWeight: '500',
                    textDecorationLine: 'underline',
                    marginTop: 14,
                    opacity: resendDisabled ? 0.7 : 1,
                    color: resendDisabled ? '#999' : '#7F3DFF',
                  },
                ]}
              >
                {t('iDidntReceivedTheCodeSendAgain')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleVerify}
              disabled={returnKeyType === 'next'}
              style={[
                GlobalStyles.primaryButton,
                returnKeyType === 'next' && GlobalStyles.disabledButton,
                { marginTop: 30 },
              ]}
            >
              <Text style={GlobalStyles.primaryButtonText}>{t('verify')}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Verification;
