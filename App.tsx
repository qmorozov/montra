import React, { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import store from '@services/store/app-store';
import { useFonts } from 'expo-font';
import { I18nextProvider } from 'react-i18next';
import I18next from './src/services/i18next';
import { StatusBar } from 'react-native';
import Index from './src';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  // const [loaded, setLoaded] = useState(false);
  //
  // const ffff = async () => {
  //   const storedData = await AsyncStorage.getItem('@auth');
  //   if (storedData != null) {
  //     const { signed } = JSON.parse(storedData);
  //
  //     setLoaded(signed);
  //   }
  // };
  //
  // console.log(loaded);

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
