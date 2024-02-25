import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CheckBox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Fragment, useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';

import { Google } from '@assets/icons';
import { MainHeader, Loader } from '@components/index';
import { Screens } from '@services/typings/global';
import { useService } from '@hooks/useService';
import { AuthApi } from '@screens/auth/services/api.service';
import { IRegisterFormData } from '@screens/auth/dto';
import { UserServiceProvider } from '@screens/main/services/user.service';

import GlobalStyles, {
  defaultInput,
  clickableText,
  defaultCheckbox,
  defaultCheckboxWrapper,
  errorTextStyle,
  defaultButtonFontSize,
  defaultCheckboxText,
} from '@styles/global';
import styles from '../styles';

export enum RegisterFields {
  Name = 'name',
  Email = 'email',
  Password = 'password',
  AgreeToTerms = 'agreeToTerms',
}

const Register = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<{ navigate: (screen: Screens) => void }>();

  const UserService = useService(UserServiceProvider);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submittedEmailRef = useRef<string | null>(null);

  const registerValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required(t('formsFieldsValidation.nameRequired'))
      .matches(
        /^[^\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/,
        t('formsFieldsValidation.nameLettersOnly')
      )
      .min(2, t('formsFieldsValidation.nameMinValue')),
    email: yup
      .string()
      .required(t('formsFieldsValidation.emailRequired'))
      .email(t('formsFieldsValidation.emailInvalid'))
      .test(
        'is-email',
        t('formsFieldsValidation.emailInvalid'),
        function (value: string) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
        }
      ),
    password: yup
      .string()
      .required(t('formsFieldsValidation.passwordRequired'))
      .min(8, t('formsFieldsValidation.passwordMinValue'))
      .max(100, t('formsFieldsValidation.passwordMaxLength')),
    agreeToTerms: yup
      .boolean()
      .required()
      .oneOf([true], t('formsFieldsValidation.agreeToTerms')),
  });

  const {
    reset,
    watch,
    control,
    setError,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(registerValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      agreeToTerms: false,
    } as IRegisterFormData,
  });

  const emailWatch: string = watch(RegisterFields.Email);

  useEffect((): void => {
    if (!isEmpty(emailWatch) && emailWatch === submittedEmailRef.current) {
      setError(RegisterFields.Email, {
        type: 'manual',
        message: t(
          'formsFieldsValidation.emailAlreadyInUsePleaseEnterADifferentEmail'
        ),
      });
    }
  }, [emailWatch]);

  const onSubmitRegisterData: SubmitHandler<IRegisterFormData> = async ({
    name,
    email,
    password,
  }: IRegisterFormData): Promise<void> => {
    try {
      setIsLoading(true);

      const registerData = (await AuthApi.createUser({
        name,
        email,
        password,
      })) as {
        data: {
          id: string;
        };
      };

      await UserService.updateUserData({
        id: registerData.data?.id,
        name,
        email,
        password,
      });

      navigation.navigate(Screens.VERIFICATION);

      submittedEmailRef.current = email;

      reset();
    } catch (error: any) {
      if (error) {
        setError(RegisterFields.Email, {
          type: 'manual',
          message: t(`formsFieldsValidation.${error.response?.data?.message}`),
        });
      }
    }

    setIsLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <MainHeader title={t('signUp')} />
        <View style={[GlobalStyles.wrapper, styles.authPageWrapper]}>
          <Loader visible={isLoading} />

          <View style={styles.formWrapper}>
            <Controller
              name={RegisterFields.Name}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Fragment>
                  <TextInput
                    value={value}
                    style={defaultInput}
                    onChangeText={onChange}
                    placeholder={t('formsFields.name')}
                  />
                  <Text style={errorTextStyle}>{errors.name?.message}</Text>
                </Fragment>
              )}
            />

            <Controller
              control={control}
              name={RegisterFields.Email}
              render={({ field: { onChange, value } }) => (
                <Fragment>
                  <TextInput
                    value={value}
                    style={defaultInput}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    placeholder={t('formsFields.email')}
                  />
                  <Text style={errorTextStyle}>{errors.email?.message}</Text>
                </Fragment>
              )}
            />

            <Controller
              control={control}
              name={RegisterFields.Password}
              render={({ field: { onChange, value } }) => (
                <Fragment>
                  <TextInput
                    value={value}
                    secureTextEntry
                    style={defaultInput}
                    onChangeText={onChange}
                    textContentType="password"
                    placeholder={t('formsFields.password')}
                  />
                  <Text style={errorTextStyle}>{errors.password?.message}</Text>
                </Fragment>
              )}
            />

            <Controller
              control={control}
              name={RegisterFields.AgreeToTerms}
              render={({ field: { onChange, value } }) => (
                <View style={defaultCheckboxWrapper}>
                  <CheckBox
                    value={value}
                    style={defaultCheckbox}
                    onValueChange={() => onChange(!value)}
                    color={'#7F3DFF'}
                  />
                  <View>
                    <Text style={defaultCheckboxText}>
                      {t('formsFields.Terms&PrivacyPolicy')}
                      <TouchableOpacity>
                        <Text style={[defaultCheckboxText, clickableText]}>
                          {t('formsFields.Terms&PrivacyPolicyWithLink')}
                        </Text>
                      </TouchableOpacity>
                    </Text>
                    <Text style={[errorTextStyle, { marginLeft: 0 }]}>
                      {errors.agreeToTerms?.message}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.formButton,
              GlobalStyles.primaryButton,
              (!isDirty || !isValid) && GlobalStyles.disabledButton,
            ]}
            disabled={!isDirty || !isValid}
            onPress={handleSubmit(onSubmitRegisterData)}
          >
            <Text style={GlobalStyles.primaryButtonText}>{t('signUp')}</Text>
          </TouchableOpacity>

          <Text style={styles.orWithText}>{t('orWith')}</Text>

          <TouchableOpacity style={styles.signUpBySocial}>
            <Google />
            <Text style={defaultButtonFontSize}>{t('signUpWithGoogle')}</Text>
          </TouchableOpacity>

          <View style={styles.dontOrHaveAccount}>
            <Text style={styles.dontOrHaveAccountText}>
              {t('alreadyHaveAnAccount')}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(Screens.LOGIN)}
            >
              <Text
                style={[
                  styles.dontOrHaveAccountText,
                  clickableText,
                  { textDecorationLine: 'underline' },
                ]}
              >
                {t('login')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Register;
