import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainHeader } from '@components/index';
import GlobalStyles from '@styles/global';
import { useTranslation } from 'react-i18next';
import styles from '../styles';

const Verification = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [timer, setTimer] = useState<number>(300);
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);

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

  const handleResend = (): void => {
    console.log('Resending code...');

    setTimer(300);
    setResendDisabled(true);
    setValue('');
  };

  const handleVerify = (): void => {
    console.log('handleVerify', value);
  };

  const returnKeyType: 'done' | 'next' = useMemo(() => {
    return value.length === 6 ? 'done' : 'next';
  }, [value]);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <MainHeader title={t('verification')} />
      <View style={[GlobalStyles.wrapper, { justifyContent: 'flex-end' }]}>
        <Text style={styles.verification}>
          {t('enterYourVerificationCode')}
        </Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.codeFieldItemWrapper}>
            <CodeField
              autoFocus
              cellCount={6}
              value={value}
              onChangeText={setValue}
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
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
              onSubmitEditing={(): void => {
                if (value.length === 6) {
                  handleVerify();
                }
              }}
            />
          </View>

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
  );
};

export default Verification;

// import React, { useEffect, useRef, useState } from 'react';
// import {
//   KeyboardAvoidingView,
//   Text,
//   TextInput,
//   Platform,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import GlobalStyles from '@styles/global';
// import { MainHeader } from '@components/index';
// import { useTranslation } from 'react-i18next';
// import styles from '../styles';
// import { SafeAreaView } from 'react-native-safe-area-context';
//
// const Verification = () => {
//   const [codeValues, setCodeValues] = useState<string[]>(new Array(6).fill(''));
//   const [inputFilled, setInputFilled] = useState<boolean[]>(
//     new Array(6).fill(false)
//   );
//   const [timer, setTimer] = useState<number>(300);
//   const [resendDisabled, setResendDisabled] = useState(true);
//
//   const { t } = useTranslation();
//
//   const inputRefs = useRef<TextInput[]>([]);
//
//   useEffect(() => {
//     let interval: string | number | NodeJS.Timeout | undefined;
//
//     if (timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prevTimer) => prevTimer - 1);
//       }, 1000);
//     } else {
//       setResendDisabled(false);
//     }
//
//     return () => {
//       clearInterval(interval);
//     };
//   }, [timer]);
//
//   const handleChange = (text: string, index: number): void => {
//     const newCodeValues: string[] = [...codeValues];
//     newCodeValues[index] = text;
//     setCodeValues(newCodeValues);
//
//     const newInputFilled: boolean[] = [...inputFilled];
//     newInputFilled[index] = text.length !== 0;
//     setInputFilled(newInputFilled);
//
//     if (text.length !== 0) {
//       inputRefs.current[index + 1]?.focus();
//     } else if (index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };
//
//   const handleResend = (): void => {
//     console.log('Resending code...');
//
//     setTimer(300);
//     setResendDisabled(true);
//   };
//
//   const isCodeComplete: boolean = codeValues.every(
//     (value: string): boolean => value.length === 1
//   );
//
//   const handleVerify = (): void => {
//     console.log(codeValues.join(''));
//
//     setCodeValues(new Array(6).fill(''));
//     setInputFilled(new Array(6).fill(false));
//
//     inputRefs.current[0]?.focus();
//   };
//
//   console.log([...new Array(6)].map((item, index) => index));
//
//   return (
//     <SafeAreaView style={GlobalStyles.droidSafeArea}>
//       <MainHeader title={t('verification')} />
//       <View style={[GlobalStyles.wrapper, { justifyContent: 'flex-end' }]}>
//         <Text style={styles.verification}>
//           {t('enterYourVerificationCode')}
//         </Text>
//
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         >
//           <View style={styles.verificationCode}>
//             {[...new Array(6)].map((number, index: number) => (
//               <TextInput
//                 ref={(ref: TextInput): void => {
//                   if (ref && !inputRefs.current.includes(ref)) {
//                     inputRefs.current = [...inputRefs.current, ref];
//                   }
//                 }}
//                 key={index}
//                 maxLength={1}
//                 contextMenuHidden
//                 selectTextOnFocus
//                 testID={`code_${index}`}
//                 keyboardType="decimal-pad"
//                 placeholder="0"
//                 placeholderTextColor="rgba(0, 0, 0, 0.05)"
//                 style={[
//                   styles.nonActiveVerificationCodeItem,
//                   inputFilled[index] && { borderBottomColor: '#7F3DFF' },
//                 ]}
//                 onChangeText={(text: string) => handleChange(text, index)}
//                 value={codeValues[index]}
//                 returnKeyType={index === 5 ? 'done' : 'next'}
//                 onSubmitEditing={() => {
//                   if (index === 6) {
//                     handleVerify();
//                   } else {
//                     const nextIndex = index + 1;
//                     if (nextIndex < inputRefs.current.length) {
//                       inputRefs.current[nextIndex]?.focus();
//                     }
//                   }
//                 }}
//               />
//             ))}
//           </View>
//
//           <View style={styles.verificationCodeTimer}>
//             <Text style={styles.verificationCodeTimerText}>
//               {`${Math.floor(timer / 60)
//                 .toString()
//                 .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`}
//             </Text>
//           </View>
//
//           <Text style={styles.verificationCodeSent}>
//             {t('weSendVerificationCodeToYourEmailYouCanCheckYourInbox', {
//               email: '1212123',
//             })}
//           </Text>
//
//           <TouchableOpacity onPress={handleResend} disabled={resendDisabled}>
//             <Text
//               style={[
//                 {
//                   fontWeight: '500',
//                   textDecorationLine: 'underline',
//                   marginTop: 14,
//                   color: resendDisabled ? '#999' : '#7F3DFF',
//                 },
//               ]}
//             >
//               {t('iDidntReceivedTheCodeSendAgain')}
//             </Text>
//           </TouchableOpacity>
//
//           <TouchableOpacity
//             onPress={handleVerify}
//             disabled={!isCodeComplete}
//             style={[GlobalStyles.primaryButton, { marginTop: 30 }]}
//           >
//             <Text style={GlobalStyles.primaryButtonText}>{t('verify')}</Text>
//           </TouchableOpacity>
//         </KeyboardAvoidingView>
//       </View>
//     </SafeAreaView>
//   );
// };
//
// export default Verification;
