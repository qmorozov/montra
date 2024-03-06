import { makeService } from '@services/service';
import { AppState } from '@services/store/app-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthApi } from '@screens/auth/services/api.service';
import { IUserState, UserSlice } from '@screens/main/stores/user.store';
import { GlobalSlice } from '@services/store/global.store';
import { useTypedSelector } from '@hooks/useTypedSelector';

export const MainServiceProvider = makeService(
  undefined,
  (appState: AppState, dispatch) => {
    return {
      async updateUserData(updatedData: Partial<IUserState>): Promise<void> {
        console.log('MainServiceProvider', appState);
        dispatch(UserSlice.actions.updateUserData(updatedData));
      },

      setLoadingState(isLoading: boolean): void {
        dispatch(GlobalSlice.actions.setLoading(isLoading));
      },

      async getAllDataFromStorage() {
        try {
          dispatch(GlobalSlice.actions.setLoading(true));

          const allKeys = await AsyncStorage.getAllKeys();

          if (allKeys.length === 0) {
            return null;
          }

          const allData = await AsyncStorage.multiGet(allKeys);
          const dataObject: { [key: string]: any } = {};

          if (allData) {
            allData.forEach(([key, value]): void => {
              if (value !== null) {
                dataObject[key] = JSON.parse(value);
              }
            });
          }

          return dataObject;
        } catch (error) {
          console.error(
            'Error while retrieving data from AsyncStorage:',
            error
          );
          throw error;
        } finally {
          dispatch(GlobalSlice.actions.setLoading(false));
        }
      },

      async refreshToken(): Promise<void> {
        const mainData = await this.getAllDataFromStorage();
        // console.log('Main Data:', mainData);
        if (mainData) {
          const { refreshToken } = mainData['@tokens'];

          const updatedTokens = await AuthApi.refreshToken(refreshToken);
          // console.log('updatedTokens:', updatedTokens);
        }
      },
    };
  }
);
