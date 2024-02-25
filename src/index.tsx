import React, { useEffect } from 'react';
import { useAppSelector } from '@hooks/useAppRedux';
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

const Index = () => {
  const { signed, loading } = useAppSelector((state) => state.auth);
  const AuthService = useService(AuthServiceProvider);

  useEffect(() => {
    AuthService.getDataFromStorage();
  }, []);

  return (
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
  );
};

export default Index;
