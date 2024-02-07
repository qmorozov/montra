import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import { Platform, NativeModules } from 'react-native';

import en from '@locales/en.json';
import uk from '@locales/uk.json';
import ru from '@locales/ru.json';

export const languageResources = {
  en: { translation: en },
  uk: { translation: uk },
  ru: { translation: ru },
};

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] || 'en'
    : NativeModules.I18nManager.localeIdentifier || 'en';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: deviceLanguage,
  fallbackLng: deviceLanguage,
  resources: languageResources,
});

export default i18next;