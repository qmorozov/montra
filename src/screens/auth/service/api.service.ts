import { ApiService } from '@services/api.service';
import { IRegisterFormData, ILoginFormData } from '@screens/auth/dto';

export abstract class AuthApi extends ApiService {
  static async createUser(userData: Omit<IRegisterFormData, 'agreeToTerms'>) {
    return this.post('auth/register', userData);
  }

  static async loginUser(userData: ILoginFormData) {
    return this.post('auth/login', userData);
  }
}
