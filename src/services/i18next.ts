import i18next, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Platform, NativeModules } from 'react-native';
import { LanguageResources } from '@typings/global';

export const languageResources: LanguageResources = {
  en: { translation: require('@locales/en.json') },
  uk: { translation: require('@locales/uk.json') },
  ru: { translation: require('@locales/ru.json') }
};

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0] || 'en'
    : NativeModules.I18nManager.localeIdentifier || 'en';

const i18nOptions: InitOptions = {
  compatibilityJSON: 'v3',
  lng: deviceLanguage,
  fallbackLng: deviceLanguage,
  resources: languageResources,
};

i18next.use(initReactI18next).init(i18nOptions);


export default i18next;