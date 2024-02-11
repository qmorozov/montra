import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import GlobalStyles, { defaultInput, errorTextStyle } from '@styles/global';
import { MainHeader } from '@components/index';
import styles from '@screens/auth/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment } from 'react';
import { Screens } from '@typings/global';
import { useNavigation } from '@react-navigation/native';

interface IForgotPasswordFormData {
  email: string;
}

enum ForgotPasswordFields {
  Email = 'email',
}

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<{ navigate: (screen: Screens) => void }>();

  const forgotPasswordValidationSchema = yup.object().shape({
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
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordValidationSchema),
    defaultValues: {
      email: '',
    } as IForgotPasswordFormData,
  });

  const onSubmitForgotPasswordData: SubmitHandler<IForgotPasswordFormData> = ({
    email,
  }: IForgotPasswordFormData): void => {
    console.log(email);
    navigation.navigate(Screens.EMAILSENT);
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <MainHeader title={t('forgotPassword')} />
      <View style={GlobalStyles.wrapper}>
        <View style={styles.forgotPasswordTitleWrapper}>
          <Text style={styles.forgotPasswordTitle}>{t('dontWorry')}</Text>
          <Text style={styles.forgotPasswordTitle}>
            {t('enterYourEmailAndWellSendYouALinkToResetYourPassword')}
          </Text>
        </View>

        <Controller
          control={control}
          name={ForgotPasswordFields.Email}
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

        <TouchableOpacity
          style={[GlobalStyles.primaryButton, styles.formButton]}
          onPress={handleSubmit(onSubmitForgotPasswordData)}
        >
          <Text style={GlobalStyles.primaryButtonText}>{t('continue')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
