import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeService } from '@services/service';
import { AppState } from '@services/store/app-store';
import { GlobalSlice } from '@services/store/global.store';
import { AuthSlice } from '@screens/auth/store/auth';

export const AuthServiceProvider = makeService(
  undefined,
  (appState: AppState, dispatch: any) => {
    return {
      async updateSignInData(isUserSignedIn: boolean): Promise<void> {
        console.log('AuthServiceProvider', appState);
        dispatch(AuthSlice.actions.signIn(isUserSignedIn));
        try {
          await AsyncStorage.setItem(
            '@auth',
            JSON.stringify({ signed: isUserSignedIn })
          );
        } catch (error) {
          console.error('Error saving data to AsyncStorage:', error);
        }
      },

      async getAuthDataFromStorage(): Promise<void> {
        try {
          dispatch(GlobalSlice.actions.setLoading(true));

          const storedData = await AsyncStorage.getItem('@auth');

          if (storedData) {
            const { signed } = JSON.parse(storedData);
            dispatch(AuthSlice.actions.signIn(signed));

            console.log(storedData);
          }
        } catch (error) {
          console.error(
            'Error while retrieving data from AsyncStorage:',
            error
          );
        } finally {
          dispatch(GlobalSlice.actions.setLoading(false));
        }
      },

      async saveTokens(tokens: {
        accessToken: string;
        refreshToken: string;
      }): Promise<void> {
        try {
          await AsyncStorage.setItem('@tokens', JSON.stringify(tokens));
        } catch (error) {
          console.error('Error saving tokens to AsyncStorage:', error);
        }
      },
    };
  }
);
