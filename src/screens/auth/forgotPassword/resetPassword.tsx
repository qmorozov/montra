import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalStyles, { defaultInput, errorTextStyle } from '@styles/global';
import styles from '@screens/auth/styles';
import { MainHeader } from '@components/index';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '@typings/global';
import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment } from 'react';

interface IResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

enum ResetPasswordFields {
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
}

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<{ navigate: (screen: Screens) => void }>();

  const loginValidationSchema = yup.object().shape({
    password: yup
      .string()
      .required(t('formsFieldsValidation.passwordRequired'))
      .min(8, t('formsFieldsValidation.passwordMinValue')),
    confirmPassword: yup
      .string()
      .required(t('formsFieldsValidation.confirmPasswordRequired'))
      .min(8, t('formsFieldsValidation.confirmPasswordMinValue'))
      .oneOf(
        [yup.ref('password')],
        t('formsFieldsValidation.passwordsMustMatch')
      ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    } as IResetPasswordFormData,
  });

  const onSubmitResetPasswordData: SubmitHandler<IResetPasswordFormData> = ({
    password,
    confirmPassword,
  }: IResetPasswordFormData): void => {
    console.log({ confirmPassword, password });
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <MainHeader title={t('resetPassword')} />
      <View style={[GlobalStyles.wrapper, styles.authPageWrapper]}>
        <Controller
          control={control}
          name={ResetPasswordFields.Password}
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
          name={ResetPasswordFields.ConfirmPassword}
          render={({ field: { onChange, value } }) => (
            <Fragment>
              <TextInput
                value={value}
                secureTextEntry
                style={defaultInput}
                onChangeText={onChange}
                textContentType="password"
                placeholder={t('formsFields.confirmPassword')}
              />
              <Text style={errorTextStyle}>
                {errors.confirmPassword?.message}
              </Text>
            </Fragment>
          )}
        />

        <TouchableOpacity
          style={[GlobalStyles.primaryButton, styles.formButton]}
          onPress={handleSubmit(onSubmitResetPasswordData)}
        >
          <Text style={GlobalStyles.primaryButtonText}>{t('continue')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;
