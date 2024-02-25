import { makeService } from '@services/service';
import { AppState } from '@services/app-store';
import { setLoading, signIn } from '@screens/auth/store/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthServiceProvider = makeService(
  undefined,
  (appState: AppState, dispatch) => {
    return {
      async updateSignInData(isUserSignedIn: boolean): Promise<void> {
        dispatch(signIn(isUserSignedIn));

        try {
          await AsyncStorage.setItem(
            '@auth',
            JSON.stringify({ signed: isUserSignedIn })
          );
        } catch (error) {
          console.error('Error saving data to AsyncStorage:', error);
        }
      },

      async getDataFromStorage(): Promise<void> {
        try {
          dispatch(setLoading(true));

          const storedData = await AsyncStorage.getItem('@auth');

          if (storedData) {
            const { signed } = JSON.parse(storedData);
            dispatch(signIn(signed));
          }
        } catch (error) {
          console.error(
            'Error while retrieving data from AsyncStorage:',
            error
          );
        } finally {
          dispatch(setLoading(false));
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
