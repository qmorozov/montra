import { combineReducers } from 'redux';
import {
  Action,
  configureStore,
  PayloadAction,
  ThunkAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import UserReducer from '@screens/main/stores/user.store';
import AuthReducer from '@screens/auth/store/auth';
import GlobalReducer from '@services/store/global.store';

const reducer = {
  user: UserReducer,
  auth: AuthReducer,
  global: GlobalReducer,
};

const combinedReducer = combineReducers(reducer);

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

const rootReducer = (state: any, action: PayloadAction) => {
  return combinedReducer(state, action);
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export type AppThunkDispatch = ThunkDispatch<AppState, unknown, Action<any>>;

export const useAppDispatch = (): ThunkDispatch<
  AppState,
  unknown,
  Action<any>
> => useDispatch<AppThunkDispatch>();

const store = makeStore();
export default store;

// import {
//   Action,
//   combineReducers,
//   configureStore,
//   ThunkAction,
//   ThunkDispatch,
// } from '@reduxjs/toolkit';
//
// import userSlice from '@screens/main/stores/user.store';
// import authSlice from '@screens/auth/store/auth';
// import globalSlice from '@services/store/global.store';
//
// const makeStore = () =>
//   configureStore({
//     reducer: rootReducer,
//     devTools: true,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: false,
//       }),
//   });
//
// const rootReducer = combineReducers({
//   auth: authSlice.reducer,
//   user: userSlice.reducer,
//   global: globalSlice.reducer,
// });
//
// const store = configureStore({
//   reducer: rootReducer,
// });
//
// export default store;
//
// export type AppStore = ReturnType<typeof makeStore>;
// export type AppState = ReturnType<AppStore['getState']>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppState,
//   unknown,
//   Action
// >;
// export type AppThunkDispatch = ThunkDispatch<AppState, unknown, Action<any>>;
//
// export type RootState = ReturnType<typeof store.getState>;
