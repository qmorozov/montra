import React from 'react';
import { Provider } from 'react-redux';
import store from '@services/app-store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Auth,
  Login,
  Register,
  ForgotPassword,
  EmailSent,
  ResetPassword,
} from '@screens/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Screens } from '@services/typings/global';
import { useFonts } from 'expo-font';
import { I18nextProvider } from 'react-i18next';
import I18next from './src/services/i18next';

const Stack = createNativeStackNavigator();

const screens = [
  { name: Screens.LOGIN, component: Login },
  { name: Screens.REGISTER, component: Register },
  { name: Screens.FORGOTPASSWORD, component: ForgotPassword },
  { name: Screens.AUTH, component: Auth },
  { name: Screens.EMAILSENT, component: EmailSent },
  { name: Screens.RESETPASSWORD, component: ResetPassword },
];

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Thin': require('./assets/fonts/Inter-Thin.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <I18nextProvider i18n={I18next}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName={Screens.AUTH}
            >
              {screens.map((screen) => (
                <Stack.Screen
                  key={screen.name}
                  name={screen.name}
                  component={screen.component}
                />
              ))}
            </Stack.Navigator>
          </NavigationContainer>
        </I18nextProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
