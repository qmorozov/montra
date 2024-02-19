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
