import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
export interface IAuthState {
  signed: boolean;
}

const initialState: IAuthState = {
  signed: false,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state: IAuthState, action: PayloadAction<boolean>) => {
      state.signed = action.payload;
    },
  },
});

export const AuthReducer: Reducer<IAuthState> = AuthSlice.reducer;

export default AuthReducer;
