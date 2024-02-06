import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  FlatList,
} from 'react-native';
import styles from '@styles/global';
import { Provider } from 'react-redux';
import store from '@services/app-store';
import { useTranslation } from 'react-i18next';
import i18next, { languageResources } from '@services/i18next';
import { useState } from 'react';
import languagesList from '@locales/languagesList.json';

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ height: '50%' }}>
        <Text
          style={{
            height: 200,
            backgroundColor: 'red',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ height: 20, backgroundColor: 'green' }}>Test</Text>
        </Text>
      </View>
    </Provider>
  );
}
