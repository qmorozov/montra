export interface IAuthSlide {
  id: number | string;
  title: string;
  description: string;
  image: T;
}

export interface IRegisterFormData {
  name: string;
  email: string;
  password: string;
  agreeToTerms: boolean;
}

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface IVerificationTimer {
  timer: number;
}
