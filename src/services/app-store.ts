import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';

import userSlice from '@screens/main/stores/user.store';
import authSlice from '@screens/auth/store/auth';

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export type AppThunkDispatch = ThunkDispatch<AppState, unknown, Action<any>>;

export type RootState = ReturnType<typeof store.getState>;
