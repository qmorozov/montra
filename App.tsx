import React from 'react';
import { Provider } from 'react-redux';
import store from '@services/app-store';
import { useFonts } from 'expo-font';
import { I18nextProvider } from 'react-i18next';
import I18next from './src/services/i18next';
import { StatusBar } from 'react-native';
import Index from './src';

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
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'#fff'}
        barStyle="dark-content"
      />
      <Provider store={store}>
        <I18nextProvider i18n={I18next}>
          <Index />
        </I18nextProvider>
      </Provider>
    </>
  );
}
