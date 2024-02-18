import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import GlobalStyles, {
  defaultInput,
  errorTextStyle,
  defaultButtonFontSize,
  defaultButtonSize,
  clickableText,
} from '@styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainHeader } from '@components/index';
import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '@services/typings/global';
import styles from '../styles';

interface ILoginFormData {
  email: string;
  password: string;
}

enum LoginFields {
  Email = 'email',
  Password = 'password',
}

const Login = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<{ navigate: (screen: Screens) => void }>();

  const loginValidationSchema = yup.object().shape({
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
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    } as ILoginFormData,
  });

  const onSubmitLoginData: SubmitHandler<ILoginFormData> = ({
    email,
    password,
  }: ILoginFormData): void => {
    console.log({ email, password });
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <MainHeader title={t('login')} />
      <View style={[GlobalStyles.wrapper, styles.authPageWrapper]}>
        <View style={styles.formWrapper}>
          <Controller
            control={control}
            name={LoginFields.Email}
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
            name={LoginFields.Password}
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
        </View>

        <TouchableOpacity
          style={[
            styles.formButton,
            GlobalStyles.primaryButton,
            (!isDirty || !isValid) && GlobalStyles.disabledButton,
          ]}
          onPress={handleSubmit(onSubmitLoginData)}
        >
          <Text style={GlobalStyles.primaryButtonText}>{t('login')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={defaultButtonSize}
          onPress={() => navigation.navigate(Screens.FORGOTPASSWORD)}
        >
          <Text style={[defaultButtonFontSize, styles.forgotPasswordBtn]}>
            {t('forgotPassword')}?
          </Text>
        </TouchableOpacity>

        <View style={styles.dontOrHaveAccount}>
          <Text style={styles.dontOrHaveAccountText}>
            {t('dontHaveAnAccountYet')}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(Screens.REGISTER)}
          >
            <Text
              style={[
                styles.dontOrHaveAccountText,
                clickableText,
                { textDecorationLine: 'underline' },
              ]}
            >
              {t('signUp')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
