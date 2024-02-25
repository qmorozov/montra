import { makeService } from '@services/service';
import { AppState } from '@services/app-store';
import { IUserState, updateUserData } from '@screens/main/stores/user.store';

export const UserServiceProvider = makeService(
  undefined,
  (appState: AppState, dispatch) => {
    return {
      async updateUserData(updatedData: Partial<IUserState>): Promise<void> {
        dispatch(updateUserData(updatedData));
      },
    };
  }
);
