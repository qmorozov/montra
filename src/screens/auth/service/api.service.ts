import { ApiService } from '@services/api.service';
import { IRegisterFormData } from '@screens/auth/dto/auth';

export abstract class AuthApi extends ApiService {
  static async createUser(userData: Omit<IRegisterFormData, 'agreeToTerms'>) {
    return this.post('auth/register', userData);
  }
}
