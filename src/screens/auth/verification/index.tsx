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
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { Screens } from '@typings/global';
import { useAppSelector } from '@hooks/useAppRedux';
import { useService } from '@hooks/useService';
import { AuthServiceProvider } from '@screens/auth/services/auth.service';
import { AuthApi } from '@screens/auth/services/api.service';
import VerificationTimer from '@screens/auth/verification/VerificationTimer';
import { Loader, MainHeader } from '@components/index';

import GlobalStyles, { errorTextStyle } from '@styles/global';
import styles from '../styles';

const TIMER_INITIAL_VALUE = 60;
const CODE_LENGTH = 6;

const Verification = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<{ navigate: (screen: Screens) => void }>();
  const AuthService = useService(AuthServiceProvider);

  const { signed } = useAppSelector((state) => state.auth);
  const { id, email } = useAppSelector((state) => state.user);

  const [value, setValue] = useState('');
  const [errorText, setErrorText] = useState<string>('');
  const [timer, setTimer] = useState<number>(TIMER_INITIAL_VALUE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }

    return (): void => {
      clearInterval(interval);
    };
  }, [timer]);

  const handleResend = useCallback(async (): Promise<void> => {
    await AuthApi.emailResendVerify(id);

    setValue('');
    setResendDisabled(true);
    setTimer(TIMER_INITIAL_VALUE);
  }, [id]);

  const handleVerify = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);

      const verificationResponse = (await AuthApi.emailVerify({
        code: value,
      })) as { accessToken: string; refreshToken: string };

      await AuthService.saveTokens(verificationResponse);
      await AuthService.updateSignInData(true);

      if (signed) {
        navigation.navigate(Screens.HOME);
      }
    } catch (error: any) {
      handleVerificationError(error);
    } finally {
      setValue('');
      setIsLoading(false);
    }
  }, [value, signed, navigation]);

  const handleVerificationError = useCallback((error: any): void => {
    const errorText = error?.response?.data.message;

    if (errorText === 'codeIsIncorrect') setErrorText(errorText);
  }, []);

  const returnKeyType: 'done' | 'next' = useMemo(() => {
    return value.length === CODE_LENGTH ? 'done' : 'next';
  }, [value]);

  const renderCell = ({
    index,
    symbol,
    isFocused,
  }: {
    index: number;
    symbol: string | null;
    isFocused: boolean;
  }) => (
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
  );

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
                renderCell={renderCell}
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

            <VerificationTimer timer={timer} />

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
