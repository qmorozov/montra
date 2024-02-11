import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
import { MainHeader } from '@components/index';
import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useState } from 'react';
import CheckBox from 'expo-checkbox';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Login } from '@screens/auth';
import { Screens } from '@services/typings/global';
import { Google } from '@assets/icons';

interface IRegisterFormData {
  name: string;
  email: string;
  password: string;
  agreeToTerms: boolean;
}

enum RegisterFields {
  Name = 'name',
  Email = 'email',
  Password = 'password',
  AgreeToTerms = 'agreeToTerms',
}

const Register = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<{ navigate: (screen: Screens) => void }>();

  const registerValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required(t('formsFieldsValidation.nameRequired'))
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
      .min(8, t('formsFieldsValidation.passwordMinValue')),
    agreeToTerms: yup
      .boolean()
      .required()
      .oneOf([true], t('formsFieldsValidation.agreeToTerms')),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      agreeToTerms: false,
    } as IRegisterFormData,
  });

  const onSubmitRegisterData: SubmitHandler<IRegisterFormData> = ({
    name,
    email,
    password,
    agreeToTerms,
  }: IRegisterFormData): void => {
    console.log({ name, email, password, agreeToTerms });
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <MainHeader title={t('signUp')} />
      <View style={[GlobalStyles.wrapper, styles.authPageWrapper]}>
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
          style={[GlobalStyles.primaryButton, styles.formButton]}
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
          <TouchableOpacity onPress={() => navigation.navigate(Screens.LOGIN)}>
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
  );
};

export default Register;
