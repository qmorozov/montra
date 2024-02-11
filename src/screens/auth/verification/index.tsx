import React, { useEffect, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  SafeAreaView,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalStyles from '@styles/global';
import { MainHeader } from '@components/index';
import { useTranslation } from 'react-i18next';
import styles from '../styles';

const Verification = () => {
  const [codeValues, setCodeValues] = useState<string[]>(new Array(6).fill(''));
  const [timer, setTimer] = useState<number>(300); // 5 minutes in seconds
  const [resendDisabled, setResendDisabled] = useState(true);
  const { t } = useTranslation();
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const handleChange = (text: string, index: number): void => {
    const newCodeValues: string[] = [...codeValues];
    newCodeValues[index] = text;
    setCodeValues(newCodeValues);

    if (text.length !== 0) {
      inputRefs.current[index + 1]?.focus();
    } else {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleBackspace = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ): void => {
    const { nativeEvent } = event;

    if (nativeEvent.key === 'Backspace') {
      handleChange('', index);
    }
  };

  const handleResend = (): void => {
    console.log('Resending code...');

    setTimer(300);
    setResendDisabled(true);
  };

  const isCodeComplete: boolean = codeValues.every(
    (value: string): boolean => value.length === 1
  );

  const handleVerify = (): void => {
    console.log(codeValues.join(''));
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <MainHeader title={t('verification')} />
      <View style={[GlobalStyles.wrapper, { justifyContent: 'flex-end' }]}>
        <Text style={styles.verification}>
          {t('enterYourVerificationCode')}
        </Text>

        <View style={styles.verificationCode}>
          {[...new Array(6)].map((number, index: number) => (
            <TextInput
              ref={(ref: TextInput): void => {
                if (ref && !inputRefs.current.includes(ref)) {
                  inputRefs.current = [...inputRefs.current, ref];
                }
              }}
              key={index}
              maxLength={1}
              contextMenuHidden
              selectTextOnFocus
              testID={`code_${index}`}
              keyboardType="decimal-pad"
              style={
                codeValues[index]
                  ? styles.verificationCodeItem
                  : styles.nonActiveVerificationCodeItem
              }
              onChangeText={(text: string) => handleChange(text, index)}
              onKeyPress={(
                event: NativeSyntheticEvent<TextInputKeyPressEventData>
              ) => handleBackspace(event, index)}
            />
          ))}
        </View>

        <View style={styles.verificationCodeTimer}>
          <Text style={styles.verificationCodeTimerText}>
            {`${Math.floor(timer / 60)
              .toString()
              .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`}
          </Text>
        </View>

        <Text style={styles.verificationCodeSent}>
          {t('weSendVerificationCodeToYourEmailYouCanCheckYourInbox', {
            email: '1212123',
          })}
        </Text>

        <TouchableOpacity onPress={handleResend} disabled={resendDisabled}>
          <Text
            style={[
              {
                fontWeight: '500',
                textDecorationLine: 'underline',
                marginTop: 14,
                color: resendDisabled ? '#999' : '#7F3DFF',
              },
            ]}
          >
            {t('iDidntReceivedTheCodeSendAgain')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleVerify}
          disabled={!isCodeComplete}
          style={[GlobalStyles.primaryButton, { marginTop: 30 }]}
        >
          <Text style={GlobalStyles.primaryButtonText}>{t('verify')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Verification;
