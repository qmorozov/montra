import { ApiService } from '@services/api.service';
import { IRegisterFormData, ILoginFormData } from '@screens/auth/dto';
import { IUserState } from '@screens/main/stores/user.store';

export abstract class AuthApi extends ApiService {
  static async createUser(userData: Omit<IRegisterFormData, 'agreeToTerms'>) {
    return this.post('auth/register', userData);
  }

  static async loginUser(userData: ILoginFormData) {
    return this.post('auth/login', userData);
  }

  static async emailVerify(emailCodeVerify: { code: string | number }) {
    return this.post('auth/verification/email/verify', emailCodeVerify);
  }

  static async emailResendVerify(userId: IUserState['id']) {
    return this.post('auth/verification/email/send-letter', { userId });
  }

  static async refreshToken(refreshToken: string) {
    return this.postWithToken('auth/refresh', refreshToken);
  }

  static async getUserData(token: string) {
    return this.getWithToken('user/profile', token);
  }
}
