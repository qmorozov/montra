export enum Screens {
    AUTH = 'auth',
    LOGIN = 'login',
    REGISTER = 'register'
}

export type LanguageResources = {
    [key: string]: { translation: Record<string, string> };
  };