export enum Screens {
  AUTH = 'auth',
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOTPASSWORD = 'forgotPassword',
  EMAILSENT = 'emailSent',
  RESETPASSWORD = 'resetPassword',
  VERIFICATION = 'verification',
}

export type LanguageResources = {
  [key: string]: { translation: Record<string, string> };
};
