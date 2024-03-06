import { memo, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Screens } from '@typings/global';
import {
  Auth,
  EmailSent,
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  Verification,
} from '@screens/auth';
import { Home } from '@screens/main';
import { NavigationContainer } from '@react-navigation/native';
import { useService } from '@hooks/useService';
import { AuthServiceProvider } from '@screens/auth/services/auth.service';
import { Loader } from '@components/index';
import { MainServiceProvider } from '@screens/main/services/main.service';
import { useTypedSelector } from '@hooks/useTypedSelector';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const screens = [
  { name: Screens.LOGIN, component: Login, requiredSigned: false },
  { name: Screens.REGISTER, component: Register, requiredSigned: false },
  {
    name: Screens.FORGOTPASSWORD,
    component: ForgotPassword,
    requiredSigned: false,
  },
  { name: Screens.AUTH, component: Auth, requiredSigned: false },
  { name: Screens.EMAILSENT, component: EmailSent, requiredSigned: false },
  {
    name: Screens.RESETPASSWORD,
    component: ResetPassword,
    requiredSigned: false,
  },
  {
    name: Screens.VERIFICATION,
    component: Verification,
    requiredSigned: false,
  },
  { name: Screens.HOME, component: Home, requiredSigned: true },
];

const Index = memo(() => {
  const AuthService = useService(AuthServiceProvider);
  const MainService = useService(MainServiceProvider);

  const { signed } = useTypedSelector((state) => state.auth);
  const { loading, refreshToken } = useTypedSelector((state) => state.global);

  const getAppData = async (): Promise<void> => {
    await AuthService.getAuthDataFromStorage();
  };

  useEffect((): void => {
    getAppData();
  }, []);

  return (
    <>
      <Loader visible={loading} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={!loading && signed ? Screens.HOME : Screens.AUTH}
        >
          {screens.map((screen) =>
            (screen.requiredSigned && !signed) ||
            (!screen.requiredSigned && signed) ? null : (
              <Stack.Screen
                key={screen.name}
                name={screen.name}
                component={screen.component}
              />
            )
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
});

export default Index;
